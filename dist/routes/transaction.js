"use strict";
exports.__esModule = true;
var express_1 = require("express");
var transaction_1 = require("../controllers/transaction");
var router = (0, express_1.Router)();
router.post('/', transaction_1.addTransaction);
exports["default"] = router;
//# sourceMappingURL=transaction.js.map