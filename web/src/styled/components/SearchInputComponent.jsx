import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import styled from "styled-components";
import { SpaceStyled } from "../global";

const SearchInputComponent = () => {
  return (
    <SpaceStyled vertical={20} horizontal={20}>
      <Form>
        <Form.Item>
          <Input className="ant-search-custom" placeholder="موتور جستجو..." />
        </Form.Item>
      </Form>
    </SpaceStyled>
  );
};
export default SearchInputComponent;
