import express from "express";
import cors from "cors";
import "dotenv/config";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import authRoute from "./src/routes/auth-route.js";
import aiRoute from "./src/routes/ai-routes.js";
import fs from "fs";
import "./src/strategies/passport-local.js";
import { v4 } from "uuid";
import morgan from "morgan";
import path from "path";
const app = express();
const port = process.env.PORT || 8000;
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs/access.log"),
  { flags: "a" }
);
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET", "PUT","DELETE"],
  })
);
app.use(morgan("combined", { stream: accessLogStream }));
app.use(cookieParser());
app.use(
  session({
    genid: function (req) {
      return v4();
    },
    name: "lks-access-token",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use("/image", express.static("image"));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.use("/auth", authRoute);
app.use("/ai", aiRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
