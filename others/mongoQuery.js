module.exports.getRecipe = [{
  $lookup: {
    from: "categories",
    localField: "category",
    foreignField: "category",
    as: "fromCategory"
  }
},
{
  $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$fromCategory", 0] }, "$$ROOT"] } }
},
{
  $project: { fromCategory: 0 }
},
{
  $lookup: {
    from: "category_options",
    localField: "options",
    foreignField: "title",
    as: "options"
  }
},
{
  $project: {
    "options._id": 0
  }
}]