import Joi from "joi";

export const EventValidation = Joi.object({
  eventName: Joi.string().required(),
  eventDate: Joi.string().required(),
  organizer: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
});

export const EventIdValidation = Joi.string().alphanum().required();
