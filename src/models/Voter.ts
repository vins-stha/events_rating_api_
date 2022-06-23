/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from "mongoose";

export type VoterDocument = Document & {
  name: string;
};

const voterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model<VoterDocument>("Voter", voterSchema);
