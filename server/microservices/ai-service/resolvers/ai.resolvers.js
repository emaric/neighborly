import PostSummary from "../models/postsummary.model.js";
import { runPrompt } from "../gemini.js";
import { getPostDetails } from "../postdetails-service.js";

async function generateSummary(postId) {
  const postDetails = await getPostDetails(postId);
  const summary = await runPrompt(
    `Summarize this post so that it's readable by using bullets and other ways to highlight (markdown) important points of the whole thread: ${JSON.stringify(postDetails)}; When refering to a user, use USER(userId) so that it can be easily identified.`
  );
  return summary;
}

const aiResolvers = {
  Query: {
    test: async () => {
      const answer = await runPrompt("What is the meaning of life?");
      return answer;
    },
    getPostSummary: async (_, { postId }, { user }) => {
      if (!user) {
        throw new Error("Unathorized request");
      }
      const postSummary = await PostSummary.findOne({ postId });
      return postSummary;
    },
  },
  Mutation: {
    test: async (_, { text }, { user }) => {
      return "TODO";
    },
    summarizePost: async (_, { postId, force }, { user }) => {
      if (!user) {
        throw new Error("Unathorized request");
      }
      const existingPostSummary = await PostSummary.findOne({ postId });
      const existingSummary = existingPostSummary?.summary;
      if (force || !existingSummary) {
        const summary = await generateSummary(postId);
        const postSummary = await PostSummary.findOneAndUpdate(
          { postId },
          { summary, userId: user.id },
          { new: true, upsert: true }
        );
        return postSummary;
      }

      return existingSummary;
    },
  },
};

export default aiResolvers;
