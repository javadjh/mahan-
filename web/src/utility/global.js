export const fileNameToEX = (name) => {
  name = name?.toString();
  return name?.substr(name?.lastIndexOf(".") + 1, name?.length - 1);
};
