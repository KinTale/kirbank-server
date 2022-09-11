"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.dbClient = void 0;
var client_1 = __importDefault(require("@prisma/client"));
exports.dbClient = new client_1["default"].PrismaClient();
//# sourceMappingURL=dbClient.js.map