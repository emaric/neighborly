import AI from "../models/ai.model.js";
import { runPrompt } from "../gemini.js";
import { getPostDetails } from "../postdetails-service.js";

async function getSummary(postId) {
  const postDetails = await getPostDetails(postId);
  const summary = await runPrompt(
    `Summarize this post: ${JSON.stringify(postDetails)}`
  );
  return summary;
}

const aiResolvers = {
  Query: {
    test: async () => {
      const answer = await runPrompt("What is the meaning of life?");
      return answer;
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
      const savedAI = await AI.findOne({ postId });
      const existingSummary = savedAI?.summary;
      if (force || !existingSummary) {
        const summary = await getSummary(postId);
        const ai = await AI.findOneAndUpdate(
          { postId },
          { summary, userId: user.id },
          { new: true, upsert: true }
        );
        return ai.summary;
      }

      return existingSummary;
    },
  },
};

export default aiResolvers;
