import { AutoComplete, Select } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getPeopleAutoService } from "../../service/FileService";

const PeopleSelectorComponent = ({ onPersonSelect }) => {
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    getData();
  }, [searchValue]);
  const getData = async () => {
    const { status, data } = await getPeopleAutoService({ searchValue });
    if (status === 200) {
      setOptions(data.people);
    }
  };
  return (
    <Select
      placeholder={"انتخاب شخص حقیقی"}
      showSearch
      onSelect={(e) => {
        onPersonSelect(e);
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
export default PeopleSelectorComponent;
