"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const schema = new Schema({
    start_date: {
        type: String,
    },
    end_date: {
        type: String,
    },
    id_car: {
        type: String,
    },
    id_user: {
        type: String,
    },
    final_value: {
        type: Number,
    },
});
const Reserve = mongoose_1.default.model('Reserve', schema);
exports.default = Reserve;
