"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.getFilteredEvent = exports.getEventAll = exports.getEvent = exports.updateEvent = exports.createEvent = void 0;
var http_errors_1 = __importDefault(require("http-errors"));
var Event_1 = __importDefault(require("../Models/Event"));
var EventValidation_1 = require("../Validations/EventValidation");
/**
 * Update user
 * @param eventId
 * @param eventModelValidation
 */
var processUpdateEvent = function (eventId, eventModelValidation) { return __awaiter(void 0, void 0, void 0, function () {
    var updateEvent_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Event_1.default.updateOne({
                        _id: eventId,
                    }, {
                        $set: {
                            eventName: eventModelValidation.eventName,
                            organizer: eventModelValidation.organizer,
                            phone: eventModelValidation.phone,
                            email: eventModelValidation.email,
                            eventDate: eventModelValidation.eventDate,
                        },
                    })];
            case 1:
                updateEvent_1 = _a.sent();
                return [2 /*return*/, updateEvent_1];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * add new user
 * @param eventModelValidation
 */
var addEvent = function (eventModelValidation) { return __awaiter(void 0, void 0, void 0, function () {
    var event_1, savedEvent, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                event_1 = new Event_1.default({
                    eventName: eventModelValidation.eventName,
                    eventDate: eventModelValidation.eventDate,
                    organizer: eventModelValidation.organizer,
                    email: eventModelValidation.email,
                    phone: eventModelValidation.phone,
                });
                return [4 /*yield*/, event_1.save()];
            case 1:
                savedEvent = _a.sent();
                return [2 /*return*/, savedEvent];
            case 2:
                error_2 = _a.sent();
                throw new http_errors_1.default.BadRequest("Bad request.");
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * Create new user
 * @param req
 * @param res
 * @param next
 */
var createEvent = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var eventModelValidation, isEventNameAvailable, newEvent, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                console.log("right funtion");
                return [4 /*yield*/, EventValidation_1.EventValidation.validateAsync(req.body)];
            case 1:
                eventModelValidation = _a.sent();
                if (!!eventModelValidation) return [3 /*break*/, 2];
                return [2 /*return*/, next(new http_errors_1.default.BadRequest("Operation failed, invalid details provided."))];
            case 2: return [4 /*yield*/, Event_1.default.findOne({
                    eventName: eventModelValidation.eventName,
                })];
            case 3:
                isEventNameAvailable = _a.sent();
                if (!isEventNameAvailable) return [3 /*break*/, 4];
                res.status(404).json({
                    message: "Event Name ".concat(eventModelValidation.eventName, " not available"),
                });
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, addEvent(eventModelValidation)];
            case 5:
                newEvent = _a.sent();
                if (newEvent) {
                    res.status(201).json({
                        newEvent: newEvent,
                    });
                }
                else {
                    return [2 /*return*/, next(res.status(400).json({
                            message: "Invalid details here provided.",
                        }))];
                }
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_3 = _a.sent();
                console.log(error_3);
                if (error_3.isJoi === true) {
                    return [2 /*return*/, next(res.status(400).json({
                            message: "Invalid details provided.",
                        }))];
                }
                next(error_3);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.createEvent = createEvent;
/**
 * Upadet user
 * @param req
 * @param res
 * @param next
 */
var updateEvent = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newBody, eventModelValidation, iseventNameValid, updatedEvent, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                newBody = req.body;
                newBody.updatedAt = Date.now();
                return [4 /*yield*/, EventValidation_1.EventValidation.validateAsync(newBody)];
            case 1:
                eventModelValidation = _a.sent();
                console.log(req.body);
                if (!!eventModelValidation) return [3 /*break*/, 2];
                return [2 /*return*/, next(new http_errors_1.default.BadRequest("Operation failed, invalid details provided."))];
            case 2: return [4 /*yield*/, Event_1.default.findOne({
                    eventName: eventModelValidation.eventName,
                })];
            case 3:
                iseventNameValid = _a.sent();
                console.log(iseventNameValid);
                if (!!iseventNameValid) return [3 /*break*/, 4];
                res.status(404).json({
                    message: "Event name ".concat(eventModelValidation.eventName, " not valid"),
                });
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, processUpdateEvent(iseventNameValid._id, eventModelValidation)];
            case 5:
                updatedEvent = _a.sent();
                if (updatedEvent) {
                    res.status(201).json({
                        updatedEvent: updatedEvent,
                    });
                }
                else {
                    return [2 /*return*/, next(res.status(400).json({
                            message: "Invalid details provided.",
                        }))];
                }
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_4 = _a.sent();
                if (error_4.isJoi === true) {
                    return [2 /*return*/, next(res.status(400).json({
                            message: "Invalid details provided.",
                        }))];
                }
                next(error_4);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updateEvent = updateEvent;
var getEvent = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var eventIdValidation, eventDetails, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, EventValidation_1.EventIdValidation.validateAsync(req.params.eventId)];
            case 1:
                eventIdValidation = _a.sent();
                if (!!eventIdValidation) return [3 /*break*/, 2];
                return [2 /*return*/, next(new http_errors_1.default.BadRequest("Operation failed, invalid details provided."))];
            case 2: return [4 /*yield*/, Event_1.default.findById(eventIdValidation)];
            case 3:
                eventDetails = _a.sent();
                if (!eventDetails) {
                    res.status(404).json({
                        message: "Event id not available",
                    });
                }
                else {
                    res.status(200).json({
                        eventDetails: eventDetails,
                    });
                }
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_5 = _a.sent();
                if (error_5.isJoi === true) {
                    return [2 /*return*/, next(res.status(400).json({
                            message: "Invalid details provided.",
                        }))];
                }
                next(error_5);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getEvent = getEvent;
var getEventAll = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var eventDetails, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                eventDetails = [];
                if (!(Object.keys(req.body).length > 0)) return [3 /*break*/, 2];
                console.log("if");
                return [4 /*yield*/, Event_1.default.find(req.body)];
            case 1:
                eventDetails = _a.sent();
                return [3 /*break*/, 4];
            case 2:
                console.log("else");
                return [4 /*yield*/, Event_1.default.find()];
            case 3:
                eventDetails = _a.sent();
                _a.label = 4;
            case 4:
                if (!eventDetails) {
                    res.status(404).json({
                        message: "Events not available",
                    });
                }
                else {
                    res.status(200).json({
                        eventDetails: eventDetails,
                    });
                }
                return [3 /*break*/, 6];
            case 5:
                error_6 = _a.sent();
                if (error_6.isJoi === true) {
                    return [2 /*return*/, next(res.status(400).json({
                            message: "Invalid details provided.",
                        }))];
                }
                next(error_6);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getEventAll = getEventAll;
var getFilteredEvent = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var eventModelValidation, eventDetails, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, EventValidation_1.EventValidation.validateAsync(req.body)];
            case 1:
                eventModelValidation = _a.sent();
                if (!eventModelValidation) {
                    return [2 /*return*/, next(new http_errors_1.default.BadRequest("Operation failed, invalid details provided."))];
                }
                console.log(eventModelValidation);
                return [4 /*yield*/, Event_1.default.find({ eventModelValidation: eventModelValidation })];
            case 2:
                eventDetails = _a.sent();
                if (!eventDetails) {
                    res.status(404).json({
                        message: "Events not available",
                    });
                }
                else {
                    res.status(200).json({
                        eventDetails: eventDetails,
                    });
                }
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                if (error_7.isJoi === true) {
                    return [2 /*return*/, next(res.status(400).json({
                            message: "Invalid details provided.",
                        }))];
                }
                next(error_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getFilteredEvent = getFilteredEvent;
var deleteEvent = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var eventIdValidation, eventDetails, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, EventValidation_1.EventIdValidation.validateAsync(req.params.eventId)];
            case 1:
                eventIdValidation = _a.sent();
                if (!!eventIdValidation) return [3 /*break*/, 2];
                return [2 /*return*/, next(new http_errors_1.default.BadRequest("Operation failed, invalid details provided."))];
            case 2: return [4 /*yield*/, Event_1.default.findByIdAndDelete(eventIdValidation)];
            case 3:
                eventDetails = _a.sent();
                if (!eventDetails) {
                    res.status(404).json({
                        message: "Event id could not be deleted",
                    });
                }
                else {
                    res.status(200).json({
                        eventDetails: eventDetails,
                    });
                }
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_8 = _a.sent();
                if (error_8.isJoi === true) {
                    return [2 /*return*/, next(res.status(400).json({
                            message: "Invalid details provided.",
                        }))];
                }
                next(error_8);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteEvent = deleteEvent;
