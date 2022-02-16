"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb://localhost:27017/mernql").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});
exports.db = mongoose_1.default;
//# sourceMappingURL=db.config.js.map