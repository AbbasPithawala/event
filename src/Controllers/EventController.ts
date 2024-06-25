import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import Event from "../Models/Event";
import { Ievent } from "../Types/Ievent";
import {
  EventValidation,
  EventIdValidation,
} from "../Validations/EventValidation";

/**
 * Update event
 * @param eventId
 * @param eventModelValidation
 */
const processUpdateEvent = async (
  eventId: String,
  eventModelValidation: Ievent
) => {
  try {
    const updateEvent = await Event.updateOne(
      {
        _id: eventId,
      },
      {
        $set: {
          eventName: eventModelValidation.eventName,
          organizer: eventModelValidation.organizer,
          phone: eventModelValidation.phone,
          email: eventModelValidation.email,
          eventDate: eventModelValidation.eventDate,
        },
      }
    );
    return updateEvent;
  } catch (error) {
    console.log(error);
  }
};
/**
 * add new event
 * @param eventModelValidation
 */
const addEvent = async (eventModelValidation: Ievent) => {
  try {
    const event = new Event({
      eventName: eventModelValidation.eventName,
      eventDate: eventModelValidation.eventDate,
      organizer: eventModelValidation.organizer,
      email: eventModelValidation.email,
      phone: eventModelValidation.phone,
    });
    const savedEvent = await event.save();

    return savedEvent;
  } catch (error) {
    throw new createError.BadRequest("Bad request.");
  }
};

/**
 * Create new event
 * @param req
 * @param res
 * @param next
 */
export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventModelValidation: Ievent = await EventValidation.validateAsync(
      req.body
    );

    if (!eventModelValidation) {
      return next(
        new createError.BadRequest(
          "Operation failed, invalid details provided."
        )
      );
    } else {
      const isEventNameAvailable = await Event.findOne({
        eventName: eventModelValidation.eventName,
      });
      if (isEventNameAvailable) {
        res.status(404).json({
          message: `Event Name ${eventModelValidation.eventName} not available`,
        });
      } else {
        const newEvent = await addEvent(eventModelValidation);
        if (newEvent) {
          res.status(201).json({
            newEvent,
          });
        } else {
          return next(
            res.status(400).json({
              message: "Invalid details here provided.",
            })
          );
        }
      }
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

/**
 * Upadet event
 * @param req
 * @param res
 * @param next
 */
export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventModelValidation: Ievent = await EventValidation.validateAsync(
      req.body
    );

    if (!eventModelValidation) {
      return next(
        new createError.BadRequest(
          "Operation failed, invalid details provided."
        )
      );
    } else {
      const iseventNameValid = await Event.findOne({
        eventName: eventModelValidation.eventName,
      });
      if (!iseventNameValid) {
        res.status(404).json({
          message: `Event name ${eventModelValidation.eventName} not valid`,
        });
      } else {
        const updatedEvent = await processUpdateEvent(
            iseventNameValid._id,
          eventModelValidation
        );
        if (updatedEvent) {
          res.status(201).json({
            updatedEvent,
          });
        } else {
          return next(
            res.status(400).json({
              message: "Invalid details provided.",
            })
          );
        }
      }
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

export const getEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventIdValidation = await EventIdValidation.validateAsync(
      req.params.eventId
    );

    if (!eventIdValidation) {
      return next(
        new createError.BadRequest(
          "Operation failed, invalid details provided."
        )
      );
    } else {
      const eventDetails = await Event.findById(eventIdValidation);
      if (!eventDetails) {
        res.status(404).json({
          message: `Event id not available`,
        });
      } else {
        res.status(200).json({
            eventDetails,
        });
      }
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

export const getEventAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        let eventDetails = []
        if(Object.keys(req.body).length > 0){
            eventDetails = await Event.find(req.body);
        }else{
            eventDetails = await Event.find();
        }
        
        
        if (!eventDetails) {
          res.status(404).json({
            message: `Events not available`,
          });
        } else {
          res.status(200).json({
              eventDetails,
          });
        }
      
    } catch (error: any) {
      if (error.isJoi === true) {
        return next(
          res.status(400).json({
            message: "Invalid details provided.",
          })
        );
      }
      next(error);
    }
};

export const getFilteredEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const eventModelValidation: Ievent = await EventValidation.validateAsync(
            req.body
          );
          if (!eventModelValidation) {
            return next(
              new createError.BadRequest(
                "Operation failed, invalid details provided."
              )
            );
          }
        const eventDetails = await Event.find({eventModelValidation});
        if (!eventDetails) {
          res.status(404).json({
            message: `Events not available`,
          });
        } else {
          res.status(200).json({
              eventDetails,
          });
        }
      
    } catch (error: any) {
      if (error.isJoi === true) {
        return next(
          res.status(400).json({
            message: "Invalid details provided.",
          })
        );
      }
      next(error);
    }
};

export const deleteEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const eventIdValidation = await EventIdValidation.validateAsync(
        req.params.eventId
      );
  
      if (!eventIdValidation) {
        return next(
          new createError.BadRequest(
            "Operation failed, invalid details provided."
          )
        );
      } else {
        const eventDetails = await Event.findByIdAndDelete(eventIdValidation);
        if (!eventDetails) {
          res.status(404).json({
            message: `Event id could not be deleted`,
          });
        } else {
          res.status(200).json({
              eventDetails,
          });
        }
      }
    } catch (error: any) {
      if (error.isJoi === true) {
        return next(
          res.status(400).json({
            message: "Invalid details provided.",
          })
        );
      }
      next(error);
    }
};
  