"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var EventSchema = new mongoose_1.Schema({
    eventName: {
        type: String
    },
    eventDate: {
        type: String
    },
    organizer: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    location: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
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
});
var Event = mongoose_1.default.model("Event", EventSchema);
exports.default = Event;
