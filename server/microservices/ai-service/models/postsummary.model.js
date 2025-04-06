import mongoose from "mongoose";

const PostSummarySchema = new mongoose.Schema(
  {
    postId: { type: String, required: true, trim: true, unique: true },
    summary: { type: String, required: true },
    userId: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

PostSummarySchema.methods.toJSON = function () {
  const postSummaryObject = this.toObject();
  return {
    ...postSummaryObject,
    id: postSummaryObject._id,
    createdAt: postSummaryObject.createdAt.toISOString(),
    updatedAt: postSummaryObject.updatedAt.toISOString(),
  };
};

const PostSummary = mongoose.model("PostSummary", PostSummarySchema);

export default PostSummary;
