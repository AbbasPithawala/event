import { Document } from "mongoose";

export interface Ievent extends Document {
    eventName: string, // Name of the event
    eventDate: string, // Date of the event
    organizer: string, // Organizer's name
    email: string, // Email of the organizer
    phone: string, // Phone number of the organizer
    location: {
        street: string, // Venue street address
        city: string, // Venue city
        state: string, // Venue state
        zip: string // Venue zip code
    },
    createdAt: number, // Timestamp when the event was created
    updatedAt: number // Timestamp when the event was last updated
}
