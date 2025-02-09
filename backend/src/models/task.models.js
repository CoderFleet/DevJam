import mongoose, { Schema } from "mongoose";
import { Schedule } from "./schedules.models.js";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    due_date: {
      type: Date,
      required: true,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.pre("save", function (next) {
  if (typeof this.due_date === "string") {
    this.due_date = new Date(this.due_date);
  }
  next();
});

taskSchema.post("save", async function (doc, next) {
  try {
    await Schedule.create({
      user: doc.user,
      reminderDate: doc.due_date,
      taskId: doc._id,
      message: `Task: "${doc.title}"`,
    });
    console.log("Schedule created for Task:", doc.title);
  } catch (error) {
    console.error("Error creating schedule for task:", error);
  }
  next();
});

taskSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Schedule.deleteMany({ taskId: doc._id });
    console.log("Deleted schedule for task:", doc.title);
  }
});

export const Task = mongoose.model("Task", taskSchema);
