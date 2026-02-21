const asyncHandler = require('../utils/asyncHandler');
const eventService = require('../services/event.service');
class EventController {

    createEvent = asyncHandler(async (req, res) => {
        const event = await eventService.createEvent(req);
        res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: event
        });
    });

    listEvents = asyncHandler(async (req, res) => {
        const events = await eventService.listEvents(req);
        res.status(200).json({
            success: true,
            message: "Events listed successfully",
            data: events
        });
    });
    listEventsById = asyncHandler(async (req, res) => {
        const event = await eventService.listEventsById(req);
        res.status(200).json({
            success: true,
            message: "Event listed successfully",
            data: event
        });
    });

    updateEvent = asyncHandler(async (req, res) => {
        const event = await eventService.updateEvent(req);
        res.status(200).json({
            success: true,
            message: "Event updated successfully",
            data: event
        });
    })
    deleteEvent = asyncHandler(async (req, res) => {
        await eventService.deleteEvent(req);
        res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        });
    })
    registerAttendee = asyncHandler(async (req, res) => {
        const event = await eventService.registerAttendee(req);
        res.status(200).json({
            success: true,
            message: "Attendee registered successfully",
            data: event
        });
    })
}

module.exports = new EventController();