import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    datetime: { type: Date, required: true },
    location: { type: String, required: true, trim: true },
    userId: { type: String, required: true, trim: true },
    volunteers: { type: [String], default: [] },
  },
  { timestamps: true }
);

EventSchema.methods.toJSON = function () {
  const eventObject = this.toObject();
  return {
    ...eventObject,
    id: eventObject._id,
    createdAtISO: eventObject.createdAt.toISOString(),
    updatedAtISO: eventObject.updatedAt.toISOString(),
  };
};

const Event = mongoose.model("Event", EventSchema);

export default Event;
