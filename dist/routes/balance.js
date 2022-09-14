"use strict";
exports.__esModule = true;
var express_1 = require("express");
var balance_1 = require("../controllers/balance");
var auth_1 = require("../middleware/auth");
var router = (0, express_1.Router)();
router.get("/", auth_1.validateAuth, balance_1.getBalance);
exports["default"] = router;
//# sourceMappingURL=balance.js.map