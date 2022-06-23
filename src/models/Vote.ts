/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type VoteDocument = Document & {
  // name: string
  date?: string,
  people?: string[]
  eventId?: number | any // to be removed later
}

const voteSchema = new mongoose.Schema({

  date: {
    type: String,
    required: true,
  },
  people: [{
    type: String
  }],
  // eventId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Event"
  // }
  eventId: { // to be removed later
    type:Number
  }


});

export default mongoose.model<VoteDocument>('Vote', voteSchema)
