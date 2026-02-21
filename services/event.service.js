const Event = require('../models/event.model');
const User = require('../models/user.model');
const ApiError = require('../utils/apiError');
const mongoose = require('mongoose');
class EventService {

    createEvent = async (req) => {
        const { title, description, date, location, attendees } = req.body;
        const organizer = req?.user?.id;
        console.log('Organizer ID:', organizer);
        const user = await User.findById(organizer);
        console.log('User:', user);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        if (user.role !== 'organizer') {
            throw new ApiError(403, 'Only organizers can create events');
        }
        const event = new Event({ title, description, date, location, organizer, attendees: attendees || [] });
        await event.save();
        return event;
    }
    listEvents = async (req) => {
        const events = await Event.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "organizer",
                    foreignField: "_id",
                    as: "organizerDetails"
                }
            },
            {
                $unwind: "$organizerDetails"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "attendees",
                    foreignField: "_id",
                    as: "attendeeDetails"
                }
            },
            {
                $project: {
                    title: 1,
                    description: 1,
                    date: 1,
                    organizer: "$organizerDetails.username",
                    attendees: {
                        $map: {
                            input: "$attendeeDetails",
                            as: "attendee",
                            in: "$$attendee.username"
                        }
                    }
                }
            }
        ]);

        return events;
    };
    listEventsById = async (req) => {
        const eventId = new mongoose.Types.ObjectId(req.params.id);

        const event = await Event.aggregate([
            {
                $match: { _id: eventId }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "organizer",
                    foreignField: "_id",
                    as: "organizerDetails"
                }
            },
            {
                $unwind: "$organizerDetails"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "attendees",
                    foreignField: "_id",
                    as: "attendeeDetails"
                }
            },
            {
                $project: {
                    title: 1,
                    description: 1,
                    date: 1,
                    organizer: "$organizerDetails.username",
                    attendees: {
                        $map: {
                            input: "$attendeeDetails",
                            as: "attendee",
                            in: "$$attendee.username"
                        }
                    }
                }
            }
        ]);

        if (!event.length) {
            throw new ApiError(404, "Event not found");
        }

        return event[0];
    };
    updateEvent = async (req) => {
        const event = await Event.findById(req.params.id);
        if (!event) {
            throw new ApiError(404, 'Event not found');
        }
        if (event.organizer.toString() !== req.user.id) {
            throw new ApiError(403, 'You are not authorized to update this event');
        }
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('organizer', 'description username email');
        return updatedEvent;
    }
    deleteEvent = async (req) => {
        const event = await Event.findById(req.params.id);
        if (!event) {
            throw new ApiError(404, 'Event not found');
        }
        if (event.organizer.toString() !== req.user.id) {
            throw new ApiError(403, 'You are not authorized to delete this event');
        }
        await Event.findByIdAndDelete(req.params.id);
    }
    registerAttendee = async (req) => {
        const event = await Event.findById(req.params.id);
        if (!event) {
            throw new ApiError(404, 'Event not found');
        }
        const user = await User.findById(req.user.id);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        if (event.attendees.includes(req.user.id)) {
            throw new ApiError(400, 'You are already registered for this event');
        }
        event.attendees.push(req.user.id);
        await event.save();
        return event;
    }
}

module.exports = new EventService();