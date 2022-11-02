const LegalPersonModel = require("../../../model/LegalPerson");

module.exports.getLegalPeopleAuto = async (req, res) => {
  let { searchValue } = req.query;
  const legalPeople = await LegalPersonModel.find({
    isActive: true,
    $or: [
      { companyName: { $regex: searchValue, $options: "i" } },
      { ceo: { $regex: searchValue, $options: "i" } },
      { address: { $regex: searchValue, $options: "i" } },
      { registerDate: { $regex: searchValue, $options: "i" } },
      { registerCode: { $regex: searchValue, $options: "i" } },
      { tel: { $regex: searchValue, $options: "i" } },
    ],
  }).limit(1000);

  legalPeopleList = [];
  legalPeople.map((legalPerson) => {
    legalPeopleList.push({
      value: legalPerson._id,
      label: `${legalPerson.companyName} - ${legalPerson.ceo}`,
    });
  });

  return res.send({
    searchValue,
    legalPeople: legalPeopleList,
  });
};
