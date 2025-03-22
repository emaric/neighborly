import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String },
    userId: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

PostSchema.methods.toJSON = function () {
  const postObject = this.toObject();
  return {
    ...postObject,
    id: postObject._id,
    createdAt: postObject.createdAt.toISOString(),
    updatedAt: postObject.updatedAt.toISOString(),
  };
};

const Post = mongoose.model("Post", PostSchema);

export default Post;
