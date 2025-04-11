import EmergencyAlert from "../models/emergAlert.model.js";

const emergencyAlertResolvers = {
  Query: {
    getEmergencyAlerts: async () => {
      return await EmergencyAlert.find().sort({ createdAt: -1 });
    },
    getEmergencyAlert: async (_, { id }) => {
      return await EmergencyAlert.findById(id);
    },
  },
  Mutation: {
    createEmergencyAlert: async (_, { message, location, urgencyLevel }, { user }) => {
      const alert = new EmergencyAlert({
        message,
        location,
        urgencyLevel,
        userId: user.id,
      });
      await alert.save();
      return alert;
    },
  },
};

export default emergencyAlertResolvers;
