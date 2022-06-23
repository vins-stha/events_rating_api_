/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'
import Vote, {VoteDocument} from "./Vote";

export type EventDocument = Document & {
  eventId: number,
  name: string
  dates: string[],
  votes?: string []| any []
}

const eventSchema = new mongoose.Schema({
  eventId:{
    type: Number,
    index: true,
    min: 0
  },
  name: {
    type: String,
    index: true,
  },
  dates: {
    type: [String],
    required: true,
  },

  votes: [{type: mongoose.Schema.Types.ObjectId, ref: "Vote"}]

});

export default mongoose.model<EventDocument>('Event', eventSchema)