import mongoose from "mongoose";

const EmergencyAlertSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    location: { type: String },
    urgencyLevel: { type: String, default: "medium" },
  },
  { timestamps: true }
);

EmergencyAlertSchema.methods.toJSON = function () {
  const obj = this.toObject();
  return {
    ...obj,
    id: obj._id,
    createdAt: obj.createdAt.toISOString(),
    updatedAt: obj.updatedAt.toISOString(),
  };
};

const EmergencyAlert = mongoose.model("EmergencyAlert", EmergencyAlertSchema);

export default EmergencyAlert;