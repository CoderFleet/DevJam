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

// TODO: Routes will go here ✔
import userRouter from "./routes/user.routes.js";
import assignmentRouter from "./routes/assignment.routes.js";
import taskRouter from "./routes/task.routes.js";
import messageRouter from "./routes/message.routes.js";

// Routes Declaration
app.use("/users", userRouter);
app.use("/assignments", assignmentRouter);
app.use("/tasks", taskRouter);
app.use("/messages", messageRouter);

export { app };
