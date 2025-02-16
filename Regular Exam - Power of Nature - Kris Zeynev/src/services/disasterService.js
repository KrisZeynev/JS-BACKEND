import Disaster from "../models/Disaster.js";

export const getAll = (filter = {}) => {
  let query = Disaster.find({});

  if (filter.owner) {
    query = query.find({ owner: filter.owner });
  }

  if (filter.interencedBy) {
    query = query.find({ interestedList: filter.interencedBy });
  }

  return query;
};

export const getOne = (disasterId) => Disaster.findById(disasterId);

export const create = (disasterData, userId) =>
  Disaster.create({ ...disasterData, owner: userId });

export const interence = async (disasterId, userId) => {
  const disaster = await Disaster.findById(disasterId);

  if (disaster.owner.equals(userId)) {
    throw new Error("Can not interence own offer!");
  }

  if (disaster.interestedList.includes(userId)) {
    throw new Error("You are already interenced this offer!");
  }

  disaster.interestedList.push(userId);
  return disaster.save();
};

export const remove = async (disasterId, userId) => {
  const disaster = await getOne(disasterId);

  if (!disaster.owner.equals(userId)) {
    throw new Error("Only owner can delete this offer");
  }

  return Disaster.findByIdAndDelete(disasterId);
};

export const update = async (disasterId, userId, disasterData) => {
  const disaster = await getOne(disasterId);

  if (!disaster.owner.equals(userId)) {
    throw new Error("Only owner can edit this offer");
  }
  return Disaster.findByIdAndUpdate(disasterId, disasterData, {
    runValidators: true,
  });
};

const disasterService = {
  getAll,
  getOne,
  create,
  interence,
  remove,
  update,
};

export default disasterService;
