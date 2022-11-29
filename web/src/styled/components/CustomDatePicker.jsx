import React from "react";
import PersianDatePickerComponent from "../../utility/PersianDatePickerComponent";

const CustomDatePicker = ({ value, onChange }) => {
  return (
    <PersianDatePickerComponent
      value={value}
      onSelect={(moment) => {
        const miladiDate = moment.format("MM/DD/YYYY");
        const persianDate = moment.format("jYYYY/jMM/jDD");
        console.log(persianDate);
        console.log(miladiDate);
        // form.setFieldsValue({
        //   ...form.getFieldsValue,
        //   ...{
        //     faDate: moment,
        //   },
        // });
        onChange(moment);
        // setFaDate(moment);
      }}
    />
  );
};
export default CustomDatePicker;
