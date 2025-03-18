import mongoose from "mongoose";

const ResidentSchema = new mongoose.Schema(
  {
    // TODO:
    userId: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

ResidentSchema.methods.toJSON = function () {
  const residentObject = this.toObject();
  return {
    ...residentObject,
    id: residentObject._id,
    createdAt: residentObject.createdAt.toISOString(),
    updatedAt: residentObject.updatedAt.toISOString(),
  };
};

const Resident = mongoose.model("Resident", ResidentSchema);

export default Resident;
