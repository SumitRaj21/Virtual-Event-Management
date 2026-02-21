const express = require('express');
const router = express.Router();
const validator = require('../middlewares/validate.middleware');
const eventController = require('../controllers/event.controller');
const auth = require('../middlewares/auth.middleware');
const { createEventSchema, getEventSchema, updateEventSchema, deleteEventSchema, registerAttendeeSchema } = require('../validations/event.validation');

router.post('/', auth, validator(createEventSchema), eventController.createEvent);
router.get('/', auth, eventController.listEvents);
router.get('/:id', auth, validator(getEventSchema), eventController.listEventsById);
router.put('/:id', auth, validator(updateEventSchema), eventController.updateEvent);
router.delete('/:id', auth, validator(deleteEventSchema), eventController.deleteEvent);
router.post('/:id/register', auth, validator(registerAttendeeSchema), eventController.registerAttendee);

module.exports = router;