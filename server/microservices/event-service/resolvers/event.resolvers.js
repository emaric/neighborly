import Event from "../models/event.model.js";

const eventResolvers = {
  Query: {
    test: async () => {
      return "TODO";
    },
    getEvents: async () => {
      const events = await Event.find().sort({ updatedAt: -1 });
      const _events = events.map((event) => ({ ...event.toJSON() }));
      return _events;
    },
    getEvent: async (_, { id }) => {
      const event = await Event.findById(id);
      if (!event) {
        throw new Error("Event not found");
      }
      return event;
    },
    getSuggestedDateTimes: async () => {
      return ["TODO"];
    },
    getPossibleVolunteers: async () => {
      return ["TODO"];
    },
  },
  Mutation: {
    test: async (_, { text }, { user }) => {
      return "TODO";
    },
    createEvent: async (
      _,
      { title, description, datetime, location },
      { user }
    ) => {
      if (!user) {
        throw new Error("Unauthorized request");
      }

      if (user.role !== "CommunityOrganizer") {
        throw new Error("Only CommunityOrganizers can create events");
      }

      const event = new Event({
        title,
        description,
        datetime,
        location,
        userId: user.id,
      });
      await event.save();

      return event;
    },
  },
};

export default eventResolvers;
