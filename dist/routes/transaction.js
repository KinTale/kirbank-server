"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_1 = require("../controllers/transaction");
const router = (0, express_1.Router)();
router.post('/', transaction_1.addTransaction);
exports.default = router;
