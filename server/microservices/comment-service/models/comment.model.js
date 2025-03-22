import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    parentId: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    userId: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

CommentSchema.methods.toJSON = function () {
  const commentObject = this.toObject();
  return {
    ...commentObject,
    id: commentObject._id,
    createdAt: commentObject.createdAt.toISOString(),
    updatedAt: commentObject.updatedAt.toISOString(),
  };
};

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
