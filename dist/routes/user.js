"use strict";
exports.__esModule = true;
var express_1 = require("express");
var user_1 = require("../controllers/user");
var router = (0, express_1.Router)();
router.get('/', user_1.getUser);
router.post('/', user_1.createUser);
exports["default"] = router;
//# sourceMappingURL=user.js.map