"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var auth_1 = __importDefault(require("./routes/auth"));
var user_1 = __importDefault(require("./routes/user"));
var transaction_1 = __importDefault(require("./routes/transaction"));
dotenv_1["default"].config();
var app = (0, express_1["default"])();
var port = process.env.PORT || 4000;
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use('/', auth_1["default"]);
app.use('/user', user_1["default"]);
app.use('/transaction', transaction_1["default"]);
app.get('/', function (req, res) {
    res.send('Kirbank server is running');
});
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(port));
});
//# sourceMappingURL=index.js.map