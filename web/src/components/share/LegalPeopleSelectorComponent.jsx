import { Select } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getLegalPeopleAutoService } from "../../service/LegalPeopleService";
import CustomSelect from "../../styled/components/CustomSelect";

const LegalPeopleSelectorComponent = ({ onLegalPersonSelect }) => {
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    getData();
  }, [searchValue]);
  const getData = async () => {
    const { status, data } = await getLegalPeopleAutoService({ searchValue });
    if (status === 200) {
      setOptions(data.legalPeople);
    }
  };
  return (
    <Select
      label="شخص حقوقی"
      placeholder={"انتخاب شخص حقوقی"}
      showSearch
      onSelect={(e) => {
        onLegalPersonSelect(e);
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
export default LegalPeopleSelectorComponent;
