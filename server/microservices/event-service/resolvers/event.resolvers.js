const eventResolvers = {
  Query: {
    test: async () => {
      return "TODO";
    },
  },
  Mutation: {
    test: async (_, { text }, { user }) => {
      return "TODO";
    },
  },
};

export default eventResolvers;
