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
        while (_) try {
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
exports.__esModule = true;
exports.login = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dbClient_1 = require("../utils/dbClient");
var secret = process.env.JWT_SECRET;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, foundUser, areCredentialsValid, token, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email) {
                    return [2 /*return*/, res.status(400).json({
                            status: 'fail'
                        })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, dbClient_1.dbClient.user.findUnique({
                        where: {
                            email: email
                        }
                    })];
            case 2:
                foundUser = _b.sent();
                if (!foundUser) {
                    return [2 /*return*/, res.status(401).json({
                            status: 'fail',
                            message: "User not found"
                        })];
                }
                return [4 /*yield*/, validateCredentials(password, foundUser)];
            case 3:
                areCredentialsValid = _b.sent();
                if (!areCredentialsValid) {
                    return [2 /*return*/, res.status(401).json({
                            status: 'fail',
                            message: "Incorrect details"
                        })];
                }
                token = generateJwt(foundUser.id);
                return [2 /*return*/, res.status(200).json({ token: token, status: 'success' })];
            case 4:
                e_1 = _b.sent();
                // console.error('error processing login', e.message)
                return [2 /*return*/, res.status(500).json({
                        status: 'fail',
                        message: "500 bad request"
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
function generateJwt(userId) {
    return jsonwebtoken_1["default"].sign({ userId: userId }, secret, { expiresIn: process.env.JWT_EXPIRY });
}
function validateCredentials(password, user) {
    return __awaiter(this, void 0, void 0, function () {
        var isPasswordValid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!user) {
                        return [2 /*return*/, false];
                    }
                    if (!password) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, bcrypt_1["default"].compare(password, user.password)];
                case 1:
                    isPasswordValid = _a.sent();
                    if (!isPasswordValid) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
//# sourceMappingURL=auth.js.map