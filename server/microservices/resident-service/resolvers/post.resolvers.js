import Post from "../models/post.model.js";

const postResolvers = {
  Query: {
    getPosts: async () => {
      const posts = await Post.find();
      return posts;
    },
  },
  Mutation: {
    createPost: async (_, { title, content }, { user }) => {
      const post = new Post({ title, content, userId: user.id });
      await post.save();
      return post;
    },
  },
};

export default postResolvers;
