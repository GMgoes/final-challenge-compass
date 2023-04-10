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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const routeCar_1 = __importDefault(require("./routes/routeCar"));
const routeUser_1 = __importDefault(require("./routes/routeUser"));
const routeReservations_1 = __importDefault(require("./routes/routeReservations"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
dotenv.config();
const app = (0, express_1.default)();
const swaggerdocs_json_1 = __importDefault(require("./documentation/swaggerdocs.json"));
app.use(express_1.default.json());
app.use('/api/v1', routeCar_1.default);
app.use('/api/v1', routeUser_1.default);
app.use('/api/v1', routeReservations_1.default);
app.use('/api/v1/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerdocs_json_1.default));
const port = process.env.PORT || 3000;
mongoose_1.default
    .connect(`mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@final-challenge.c2do336.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
    app.listen(port);
});
