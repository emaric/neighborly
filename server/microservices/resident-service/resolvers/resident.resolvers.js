const residentResolvers = {
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

export default residentResolvers;
