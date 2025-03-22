import Comment from "../models/comment.model.js";

const getNestedCommentCount = async (parentId) => {
  // Count direct replies
  const directReplies = await Comment.find({ parentId });

  // Base case: No replies found
  if (!directReplies.length) return 0;

  // Recursively count replies for each direct reply
  let totalReplies = directReplies.length;
  for (const reply of directReplies) {
    totalReplies += await getNestedCommentCount(reply._id);
  }

  return totalReplies;
};

const commentResolvers = {
  Query: {
    getCommentsByParentId: async (_, { parentId }) => {
      const comments = await Comment.find({ parentId: parentId });
      return comments;
    },
    getCommentCountByParentId: async (_, { parentId }) => {
      return await getNestedCommentCount(parentId);
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
