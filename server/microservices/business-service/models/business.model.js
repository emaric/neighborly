import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    // TODO:
    userId: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

BusinessSchema.methods.toJSON = function () {
  const businessObject = this.toObject();
  return {
    ...businessObject,
    id: businessObject._id,
    createdAt: businessObject.createdAt.toISOString(),
    updatedAt: businessObject.updatedAt.toISOString(),
  };
};

const Business = mongoose.model("Business", BusinessSchema);

export default Business;
