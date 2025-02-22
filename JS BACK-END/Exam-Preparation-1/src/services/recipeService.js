import Recipe from "../models/Recipe.js";

export const getAll = (filter = {}) => {
  let query = Recipe.find({});

  if (filter.owner) {
    query = query.find({ owner: filter.owner });
  }

  if (filter.preferredBy) {
    query = query.find({ recommendList: filter.preferredBy });
  }

  return query;
};

export const getLatest = () =>
  Recipe.find({}).sort({ createdAt: "desc", _id: "desc" }).limit(3);

export const getOne = (recipeId) => Recipe.findById(recipeId);

export const create = (recipeData, userId) =>
  Recipe.create({ ...recipeData, owner: userId });

export const prefer = async (recipeId, userId) => {
  const recipe = await Recipe.findById(recipeId);

  // check if onwer
  if (recipe.owner.equals(userId)) {
    throw new Error("Can not prefer own offer!");
  }
  // check if already preferred
  if (recipe.recommendList.includes(userId)) {
    throw new Error("You are already preferred this offer!");
  }
  // prefer
  recipe.recommendList.push(userId);
  return recipe.save();
};

export const remove = async (recipeId, userId) => {
  // check if owner
  const recipe = await getOne(recipeId);

  if (!recipe.owner.equals(userId)) {
    throw new Error("Only owner can delete this offer");
  }

  return Recipe.findByIdAndDelete(recipeId);
};

export const update = async (recipeId, userId, recipeData) => {
  const recipe = await getOne(recipeId);

  if (!recipe.owner.equals(userId)) {
    throw new Error("Only owner can edit this offer");
  }
  return Recipe.findByIdAndUpdate(recipeId, recipeData, {
    runValidators: true,
  });
};

const recipeService = {
  getAll,
  getLatest,
  getOne,
  create,
  prefer,
  remove,
  update,
};

export default recipeService;
