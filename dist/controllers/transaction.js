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
exports.__esModule = true;
exports.addTransaction = exports.getTransactions = void 0;
var dbClient_1 = require("../utils/dbClient");
var getTransactions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, transactionList, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, dbClient_1.dbClient.transaction.findMany({
                        where: {
                            userId: userId
                        },
                        orderBy: {
                            date: 'desc'
                        }
                    })];
            case 2:
                transactionList = _a.sent();
                console.log(transactionList);
                return [2 /*return*/, res.json({ list: transactionList })];
            case 3:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getTransactions = getTransactions;
var addTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, description, amount, date, type, userId, updateAllFollowingTransations, transactionList, previousTransaction, i, newBalanceAtTime, createdTransaction, currentBalance, newBalance, updateBalance, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, description = _a.description, amount = _a.amount, date = _a.date, type = _a.type;
                userId = req.userId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                updateAllFollowingTransations = function () {
                    console.log("Updated Transactions");
                    return;
                };
                return [4 /*yield*/, dbClient_1.dbClient.transaction.findMany({
                        where: {
                            userId: userId
                        },
                        orderBy: {
                            date: 'desc'
                        }
                    })];
            case 2:
                transactionList = _b.sent();
                previousTransaction = void 0;
                console.log(date);
                console.log(Date.parse(date));
                for (i = 0; i < transactionList.length; i++) {
                    console.log(transactionList[i].date);
                    if (transactionList[i].date <= date) {
                        console.log("checked date", transactionList[i].date);
                        previousTransaction = transactionList[i].balanceAtTime;
                        if (i !== 0)
                            updateAllFollowingTransations();
                        break;
                    }
                }
                newBalanceAtTime = 0;
                return [4 /*yield*/, dbClient_1.dbClient.transaction.create({
                        data: {
                            description: description,
                            amount: amount,
                            date: date,
                            type: type,
                            balanceAtTime: newBalanceAtTime,
                            user: {
                                connect: {
                                    id: userId
                                }
                            }
                        }
                    })];
            case 3:
                createdTransaction = _b.sent();
                return [4 /*yield*/, dbClient_1.dbClient.balance.findUnique({
                        where: {
                            userId: userId
                        }
                    })];
            case 4:
                currentBalance = _b.sent();
                newBalance = void 0;
                if (currentBalance) {
                    if (type === "deposit")
                        newBalance = currentBalance.balance + amount;
                    if (type === "withdrawl")
                        newBalance = currentBalance.balance - amount;
                }
                return [4 /*yield*/, dbClient_1.dbClient.balance.update({
                        where: {
                            userId: userId
                        },
                        data: {
                            balance: newBalance
                        }
                    })];
            case 5:
                updateBalance = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        status: "success",
                        data: createdTransaction
                    })];
            case 6:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({
                        status: "fail, server error"
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.addTransaction = addTransaction;
//# sourceMappingURL=transaction.js.map