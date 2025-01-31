// dotenv for env variable access throughout the project
import "dotenv/config";

// this file will handle core routing logic and route controllers
import { app } from "./app.js";

// mongodb connection
import connectDB from "./db/db.js";

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🤖 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection is f**ked !!", err);
  });
