"use strict";
exports.__esModule = true;
var express_1 = require("express");
var auth_1 = require("../controllers/auth");
var router = (0, express_1.Router)();
router.post('/login', auth_1.login);
exports["default"] = router;
//# sourceMappingURL=auth.js.map