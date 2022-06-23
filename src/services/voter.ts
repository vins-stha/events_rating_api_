import Voter, { VoterDocument } from "../models/Voter";
import { NotFoundError } from "../helpers/apiError";

const findAll = async (): Promise<VoterDocument[]> => {
  return await Voter.find({}).sort({ name: 1 });
};

const create = async (newVoter: VoterDocument): Promise<VoterDocument> => {
  let result: Promise<VoterDocument> = newVoter.save();

  return result;
};

const deleteVoterByName = async (
  name: string
): Promise<VoterDocument | null> => {
  const foundVoter = await Voter.findOne({ name: name });
  if (!foundVoter) {
    throw new NotFoundError(`Event ${name} not found`);
  }
  foundVoter.remove();

  return foundVoter;
};

export default {
  create,

  findAll,

  deleteVoterByName,
};
