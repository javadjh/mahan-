import { Select } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getApplicantsAutoService } from "../../service/ApplicantService";
const ApplicantsSelectorComponent = ({ onApplicantSelect }) => {
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    getData();
  }, [searchValue]);
  const getData = async () => {
    const { status, data } = await getApplicantsAutoService();
    if (status === 200) {
      setOptions(data.applicants);
    }
  };
  return (
    <Select
      placeholder={"انتخاب سمت سازمانی"}
      showSearch
      onSelect={(e) => {
        onApplicantSelect(e);
      }}
      style={{ width: "100%" }}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
    >
      {options.map((option) => (
        <Select.Option
          label={option.label}
          key={option.value}
          value={option.value}
        >
          {option.label}
        </Select.Option>
      ))}
    </Select>
  );
};
export default ApplicantsSelectorComponent;
