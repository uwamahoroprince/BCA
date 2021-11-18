const BisinessIdea = require("../model/bissnessIdeas");
const BisinessDefinition = require("../model/bisinessDefinition");
const asyncHandler = require("../util/asyncHandler");
const ErrorResponse = require("../util/errorResponse");

const IdeaStrength = (totalCriteria, failedCritetial) => {
  const successCriterias = totalCriteria - failedCritetial;
  const ideaSrengthPersentage = (successCriterias * 100) / totalCriteria;
  return ideaSrengthPersentage;
};
exports.createBisinessIdea = asyncHandler(async (req, res, next) => {
  const bisiness = await BisinessDefinition.findById(
    req.body.bisinessDefinition
  );
  if (!bisiness) {
    return next(new ErrorResponse("could not find Bisiness Definition", 404));
  }
  const conditions = bisiness.conditions;
  console.log(conditions);
  const bisinessDefinition = conditions._id;
  const userBisinessCriterion = req.body.conditions;
  console.log(userBisinessCriterion);
  let failedCriteria = 0;
  const totalCriteria = conditions.length;
  let status = "pending";
  for (const key in conditions) {
    let criterion = userBisinessCriterion[key].criterion;
    let preDefinedCondition = conditions[key].criterion;

    if (JSON.stringify(criterion) != JSON.stringify(preDefinedCondition)) {
      failedCriteria = failedCriteria + 1;
    }
  }
  if (failedCriteria === 0) {
    status = "approved";
  } else {
    status = "rejected";
  }
  const bisinessIdea = {
    name: req.body.name,
    owner: req.body.owner,
    bisinessDefinition: bisinessDefinition,
    description: req.body.description,
    conditions: userBisinessCriterion,
    status: status,
    ideaSrengthPersentage: IdeaStrength(totalCriteria, failedCriteria),
  };
  const bn = await BisinessIdea.create(bisinessIdea);
  if (!bn) {
    return next("could not sasve", 500);
  }
  res.status(201).json({
    message: "done",
    data: bn,
  });
});
