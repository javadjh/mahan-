import moment from "moment-jalaali";
import moment1 from "jalali-moment";
export const defaultDate = (isShamsi) => {
  console.log(
    "isShamsi?moment().locale('fa').format('jYYYY/jMM/jDD'):moment().locale('fa').format('DD/MM/YYYY')"
  );
  console.log(
    isShamsi
      ? moment().locale("fa").format("jYYYY/jMM/jDD")
      : moment().locale("fa").format("DD/MM/YYYY")
  );
  return isShamsi
    ? moment().locale("fa").format("jYYYY/jMM/jDD")
    : moment().locale("fa").format("DD/MM/YYYY");
};
export const convertToJalali = (date) => {
  return moment1(date, "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD");
};
