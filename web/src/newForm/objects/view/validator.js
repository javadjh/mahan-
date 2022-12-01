import {
  emailForm,
  justNumberForm,
  maxForm,
  melliCodeRule,
  minForm,
  requiredForm,
} from "../../../config/formValidator";

export const validator = (item) => {
  let rules = [];
  if (item.isRequired) {
    rules.push(requiredForm);
  }
  if (item?.min) {
    rules.push(minForm(item?.min));
  }
  if (item?.max) {
    rules.push(maxForm(item?.max));
  }
  if (item?.pattern) {
    switch (item?.pattern) {
      case "melliCode":
        rules.push(melliCodeRule);
        break;
      case "email":
        rules.push(emailForm);
        break;
      case "phoneNumber":
        rules.push(minForm(11));
        rules.push(maxForm(11));
        break;
      case "number":
        rules.push(justNumberForm);
        break;
    }
  }

  return rules;
};
