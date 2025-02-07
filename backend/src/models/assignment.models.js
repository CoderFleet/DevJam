import mongoose, { Schema } from "mongoose";
import { Schedule } from "./schedules.models.js";

const assignmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    docs: [
      {
        type: String,
        required: true,
      },
    ],
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

assignmentSchema.post("save", async function (doc, next) {
  try {
    await Schedule.create({
      user: doc.user,
      reminderDate: doc.due_date,
      assignmentId: doc._id,
      message: `Reminder: Complete the assignment "${doc.title}"`,
    });
    console.log("Schedule created for Assignment:", doc.title);
  } catch (error) {
    console.error("Error creating schedule for assignment:", error);
  }
  next();
});

assignmentSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Schedule.deleteMany({ assignmentId: doc._id });
    console.log("Deleted schedule for assignment:", doc.title);
  }
});

export const Assignment = mongoose.model("Assignment", assignmentSchema);
