import Voter, { VoterDocument } from '../models/Voter'
import { NotFoundError } from '../helpers/apiError'

const findAll = async (): Promise<VoterDocument[]> => {

    return await Voter.find().sort({ name: 1 })

};

const create = async (newVoter: VoterDocument): Promise<VoterDocument |any> => {
    const user: Promise<VoterDocument> = newVoter.save()
    return user
};

const findVoterByName = async (
    name: string
): Promise<VoterDocument | null> => {
    const foundVoter = await Voter.findOne({ name: name })

    return foundVoter
};

const deleteVoterByName = async (
    name: string
): Promise<VoterDocument | null> => {
    const foundVoter = await Voter.findOne({ name: name })
    if (!foundVoter) {
        throw new NotFoundError(`Event ${name} not found`)
    }
    foundVoter.remove()

    return foundVoter
};


export default {
    create,
    findAll,
    deleteVoterByName,
    findVoterByName
}
