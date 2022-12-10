const Tesseract = require("tesseract.js");
module.exports.OCR = async (file) => {
  console.log(file);
  console.log("http://192.168.2.24:5000/" + file);
  const data = await Tesseract.recognize(
    "http://192.168.2.24:5000/" + file,
    "fas",
    { logger: (m) => console.log(m) }
  );

  return data?.data?.text;
};
