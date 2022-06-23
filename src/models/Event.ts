/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'
import Vote, {VoteDocument} from "./Vote";

export type EventDocument = Document & {
  eventId: number,
  name: string
  dates: string[],
  // votes: VoteObject[]
  // votes?: {
  //   date: string,
  //   people: string[]
  // }
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
  // votes: {
  //   type: [VoteObject]
  // }

  // votes: [{
  //   date: {type:String},
  //   people: {type: [String]}
  // }]
  votes: [{type: mongoose.Schema.Types.ObjectId, ref: "Vote"}]
  // votes: [
  //   {
  //     date: {type: String},
  //     people: {type: [String]}
  //vote
  //   }
  // ]
  // votes: []
});

export default mongoose.model<EventDocument>('Event', eventSchema)
