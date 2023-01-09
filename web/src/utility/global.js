export const fileNameToEX = (name) => {
  if (!name) return;
  name = name?.toString();
  return name?.substr(name?.lastIndexOf(".") + 1, name?.length - 1);
};
