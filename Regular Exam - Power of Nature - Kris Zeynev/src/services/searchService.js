import Disaster from "../models/Disaster.js";

const getDisastersOnSearch = async (name, type) => {
  let query = {};

  if (name) {
    query.name = name;
  }

  if (type) {
    query.type = type;
  }

  const searchForDisaster = await Disaster.find(query);

  if (searchForDisaster.length === 0 || !searchForDisaster) {
    throw new Error("No disaster found!");
  }

  return searchForDisaster;
};

const searchService = {
  getDisastersOnSearch,
};

export default searchService;
