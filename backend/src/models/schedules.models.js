import mongoose, { Schema } from "mongoose";

const scheduleSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reminderDate: {
      type: Date,
      required: true,
    },
    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
    },
    message: {
      type: String,
      default: "Complete Your Assignment",
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", scheduleSchema);
