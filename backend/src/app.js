import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Configuring express to mark public as static storage folder
app.use(express.static("public"));

// Cookie Parser configuration for tokens
app.use(cookieParser());

// TODO: Routes will go here

export { app };
