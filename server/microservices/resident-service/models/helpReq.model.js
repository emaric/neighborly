import mongoose from "mongoose";

const HelpRequestSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, trim: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    status: { type: String, default: "open" },
  },
  { timestamps: true }
);

HelpRequestSchema.methods.toJSON = function () {
  const helpReqObj = this.toObject();
  return {
    ...helpReqObj,
    id: helpReqObj._id,
    createdAt: helpReqObj.createdAt.toISOString(),
    updatedAt: helpReqObj.updatedAt.toISOString(),
  };
};

const HelpRequest = mongoose.model("HelpRequest", HelpRequestSchema);

export default HelpRequest;