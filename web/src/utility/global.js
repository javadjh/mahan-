export const fileNameToEX = (name) => {
  console.log(name);
  if (name == null) return;
  name = name?.toString();
  return name?.substr(name?.lastIndexOf(".") + 1, name?.length - 1);
};
