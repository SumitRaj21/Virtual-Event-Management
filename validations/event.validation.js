const joi = require('joi');

const createEventSchema = {
    body: joi.object().keys({
        title: joi.string().required(),
        description: joi.string().required(),
        date: joi.string()
            .pattern(/^\d{4}-\d{2}-\d{2}$/)
            .required(),
        attendees: joi.array().items(joi.string().hex().length(24)).optional(),
    })
}

const updateEventSchema = {
    params: joi.object().keys({
        id: joi.string().hex().length(24).required(),
    }),
    body: joi.object().keys({
        title: joi.string().optional(),
        description: joi.string().optional(),
        date: joi.string()
            .pattern(/^\d{4}-\d{2}-\d{2}$/)
            .optional()
    })
}

const getEventSchema = {
    params: joi.object().keys({
        id: joi.string().hex().length(24).required(),
    })
}

const deleteEventSchema = {
    params: joi.object().keys({
        id: joi.string().hex().length(24).required(),
    })
}

const registerAttendeeSchema = {
    params: joi.object().keys({
        id: joi.string().hex().length(24).required(),
    })
}

module.exports = {
    createEventSchema,
    updateEventSchema,
    getEventSchema,
    deleteEventSchema,
    registerAttendeeSchema
}