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
    contentPreview: postObject.content
      ? postObject.content.length > 100
        ? postObject.content.substring(0, 100) + "..."
        : postObject.content
      : null,
  };
};

const Post = mongoose.model("Post", PostSchema);

export default Post;
