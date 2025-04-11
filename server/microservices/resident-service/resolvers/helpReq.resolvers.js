import HelpRequest from "../models/helpReq.model.js";

const helpRequestResolvers = {
  Query: {
    getHelpRequests: async () => {
      return await HelpRequest.find().sort({ createdAt: -1 });
    },
    getHelpRequest: async (_, { id }) => {
      return await HelpRequest.findById(id);
    },
  },
  Mutation: {
    createHelpRequest: async (_, { title, description, location }, { user }) => {
      const request = new HelpRequest({
        title,
        description,
        location,
        userId: user.id,
      });
      await request.save();
      return request;
    },
  },
};

export default helpRequestResolvers;