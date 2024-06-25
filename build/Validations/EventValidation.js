"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventIdValidation = exports.EventValidation = void 0;
var joi_1 = __importDefault(require("joi"));
exports.EventValidation = joi_1.default.object({
    eventName: joi_1.default.string().required(),
    eventDate: joi_1.default.string().required(),
    organizer: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    updatedAt: joi_1.default.number()
});
exports.EventIdValidation = joi_1.default.string().alphanum().required();
