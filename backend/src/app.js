import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import axios from "axios";
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

// Routes Declaration
app.use("/users", userRouter);
app.use("/assignments", assignmentRouter);
app.use("/tasks", taskRouter);

app.get('/quote', async (req, res) => {
  try {
    // Ensure you are hitting the correct API URL
    const response = await axios.get("https://zenquotes.io/api/random");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching quote from ZenQuotes API:", error);
    res.status(500).json({ error: "Failed to fetch quote from ZenQuotes" });
  }
});

export { app };
