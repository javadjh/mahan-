const PersonModel = require("../../../model/PersonModel");

module.exports.getPeopleAuto = async (req, res) => {
  let { searchValue } = req.query;
  const people = await PersonModel.find({
    isActive: true,
    $or: [
      { firstName: { $regex: searchValue, $options: "i" } },
      { lastName: { $regex: searchValue, $options: "i" } },
      { fathersName: { $regex: searchValue, $options: "i" } },
      { idCode: { $regex: searchValue, $options: "i" } },
      { birthday: { $regex: searchValue, $options: "i" } },
      { melliCode: { $regex: searchValue, $options: "i" } },
      { gender: { $regex: searchValue, $options: "i" } },
    ],
  }).limit(1000);

  peopleList = [];
  people.map((person) => {
    peopleList.push({
      value: person._id,
      label: `${person.firstName} ${person.lastName} - ${person.melliCode}`,
    });
  });

  return res.send({
    searchValue,
    people: peopleList,
  });
};
