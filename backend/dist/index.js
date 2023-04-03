"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dbConn_1 = __importDefault(require("./config/dbConn"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const userRoutes_1 = __importDefault(require("./routes/api/userRoutes"));
const accountRoutes_1 = __importDefault(require("./routes/accountRoutes"));
const credentials_1 = __importDefault(require("./middlewares/credentials"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
(0, dbConn_1.default)(`${process.env.DATABASE_URI}`);
const PORT = process.env.PORT || 2003;
const app = (0, express_1.default)();
// set middlewares
app.use((0, cookie_parser_1.default)());
app.use(credentials_1.default);
app.use(express_1.default.json());
app.use((0, morgan_1.default)('tiny'));
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(express_1.default.urlencoded({ extended: false }));
// set routes
app.use('/account', accountRoutes_1.default);
app.use('/auth', authRoutes_1.default);
app.use('/', userRoutes_1.default);
app.get("/", (req, res) => {
    return res.status(200).send("User Registration.");
});
mongoose_1.default.connection.once('open', () => {
    console.log('Connected to MongoDB!');
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
    });
});
//# sourceMappingURL=index.js.map