import express from "express";
// dotenv for env variable access throughout the project
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

// this file will handle core routing logic and route controllers
import { app, server } from "./utils/socket.js";

// mongodb connection
import connectDB from "./db/db.js";

const PORT = process.env.PORT || 8000;

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Configuring express to mark public as static storage folder
app.use(express.static("public"));

// Cookie Parser configuration for tokens
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

import userRouter from "./routes/user.routes.js";
import assignmentRouter from "./routes/assignment.routes.js";
import taskRouter from "./routes/task.routes.js";
import messageRouter from "./routes/message.routes.js";
import scheduleRouter from "./routes/schedule.routes.js";

// Routes Declaration
app.use("/users", userRouter);
app.use("/assignments", assignmentRouter);
app.use("/tasks", taskRouter);
app.use("/messages", messageRouter);
app.use("/schedules", scheduleRouter);

app.get("/quote", async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/random");
    if (!response.ok) throw new Error("Failed to fetch quote");

    const data = await response.json();
    res.json(data);
    console.log("Quote fetched from ZenQuotes API");
  } catch (error) {
    console.error("Error fetching quote from ZenQuotes API:", error);
    res.status(500).json({ error: "Failed to fetch quote from ZenQuotes" });
  }
});

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🤖 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection is f**ked !!", err);
  });
