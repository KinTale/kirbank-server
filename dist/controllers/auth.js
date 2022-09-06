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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = __importDefault(require("@prisma/client"));
const secret = process.env.JWT_SECRET;
const dbClient = new client_1.default.PrismaClient();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({
            status: 'fail',
        });
    }
    try {
        const foundUser = yield dbClient.user.findUnique({
            where: {
                email: email
            },
        });
        if (!foundUser) {
            return res.status(401).json({
                status: 'fail',
                message: "User not found"
            });
        }
        const areCredentialsValid = yield validateCredentials(password, foundUser);
        if (!areCredentialsValid) {
            return res.status(401).json({
                status: 'fail',
                message: "Incorrect details"
            });
        }
        const token = generateJwt(foundUser.id);
        return res.status(200).json({ token,
            status: 'success'
        });
    }
    catch (e) {
        // console.error('error processing login', e.message)
        return res.status(500).json({
            status: 'fail',
            message: "500 bad request"
        });
    }
});
exports.login = login;
function generateJwt(userId) {
    return jsonwebtoken_1.default.sign({ userId }, secret, { expiresIn: process.env.JWT_EXPIRY });
}
function validateCredentials(password, user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!user) {
            return false;
        }
        if (!password) {
            return false;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return false;
        }
        return true;
    });
}
