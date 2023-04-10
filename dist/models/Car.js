"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const schema = new Schema({
    model: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    value_per_day: {
        type: Number,
        required: true,
    },
    accessories: [{}],
    number_of_passengers: {
        type: Number,
        required: true,
    },
});
const Car = mongoose_1.default.model('Car', schema);
exports.default = Car;
