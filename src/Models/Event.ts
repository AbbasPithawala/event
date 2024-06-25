import mongoose, { Schema } from "mongoose";
import { Ievent } from "../Types/Ievent";

const EventSchema: Schema = new Schema(
    {
        eventName:{
            type: String
        },
        eventDate: {
            type: String
        },
        organizer: {
            type: String
        },
        email:{
            type: String
        },
        phone: {
            type: String
        },
        location: {
            street:{
                type: String
            },
            city: {
                type: String
            },
            state:{
                type: String
            },
            zip: {
                type: String
            }
        },
        createdAt: {
            type: Number,
            default: Date.now()
        },
        updatedAt: {
            type: Number,
            default: Date.now()
        }
        // "eventName": "string", // Name of the event
        // "eventDate": "Date", // Date of the event
        // "organizer": "string", // Organizer's name
        // "email": "string", // Email of the organizer
        // "phone": "string", // Phone number of the organizer
        // "location": {
        //     "street": "string", // Venue street address
        //     "city": "string", // Venue city
        //     "state": "string", // Venue state
        //     "zip": "string" // Venue zip code
        // },
        // "createdAt": "Date", // Timestamp when the event was created
        // "updatedAt": "Date" // Timestamp when the event was last updated
    }
);
const Event = mongoose.model<Ievent>("Event", EventSchema);
export default Event;
