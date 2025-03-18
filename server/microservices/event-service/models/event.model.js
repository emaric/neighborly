import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    // TODO:
    userId: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

EventSchema.methods.toJSON = function () {
  const eventObject = this.toObject();
  return {
    ...eventObject,
    id: eventObject._id,
    createdAt: eventObject.createdAt.toISOString(),
    updatedAt: eventObject.updatedAt.toISOString(),
  };
};

const Event = mongoose.model("Event", EventSchema);

export default Event;
