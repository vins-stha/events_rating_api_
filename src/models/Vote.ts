/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, {Document} from 'mongoose'

export type VoteDocument = Document & {
    date?: string,
    people?: string[]
    eventId?: number | any
}

const voteSchema = new mongoose.Schema({

    date: {
        type: String,
        required: true,
    },
    people: [{
        type: String
    }],
    eventId: {
        type: Number
    }

});

export default mongoose.model<VoteDocument>('Vote', voteSchema)
