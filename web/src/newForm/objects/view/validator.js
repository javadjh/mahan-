import { maxForm, minForm, requiredForm } from "../../../config/formValidator";

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

  return rules;
};
