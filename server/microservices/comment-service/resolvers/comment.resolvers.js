import Comment from "../models/comment.model.js";

const commentResolvers = {
  Query: {
    getCommentsByParentId: async (_, { parentId }) => {
      const comments = await Comment.find({ parentId: parentId });
      return comments;
    },
  },
  Mutation: {
    createComment: async (_, { parentId, content }, { user }) => {
      const comment = new Comment({ parentId, content, userId: user.id });
      await comment.save();
      return comment;
    },
    updateComment: async (_, { id, content }, { user }) => {
      const comment = await Comment.findById(id);
      if (!comment) {
        throw new Error("Comment not found");
      }
      if (comment.userId !== user.id) {
        throw new Error("Not authorized");
      }
      comment.content = content;
      await comment.save();
      return comment;
    },
    deleteComment: async (_, { id }, { user }) => {
      const comment = await Comment.findById(id);
      if (!comment) {
        throw new Error("Comment not found");
      }
      if (comment.userId !== user.id) {
        throw new Error("Not authorized");
      }
      await comment.remove();
      return comment;
    },
  },
};

export default commentResolvers;
