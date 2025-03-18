import mongoose from "mongoose";

const AISchema = new mongoose.Schema(
  {
    // TODO:
    userId: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

AISchema.methods.toJSON = function () {
  const aiObject = this.toObject();
  return {
    ...aiObject,
    id: aiObject._id,
    createdAt: aiObject.createdAt.toISOString(),
    updatedAt: aiObject.updatedAt.toISOString(),
  };
};

const AI = mongoose.model("AI", AISchema);

export default AI;
