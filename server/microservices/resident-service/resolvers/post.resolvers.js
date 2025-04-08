import Post from "../models/post.model.js";

const postResolvers = {
  Query: {
    getPosts: async () => {
      const posts = await Post.find().sort({ updatedAt: -1 });
      const _posts = posts.map((post) => ({ ...post.toJSON() }));
      return _posts;
    },
    getPost: async (_, { id }) => {
      const post = await Post.findById(id);
      return post;
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
