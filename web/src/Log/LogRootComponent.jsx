import React, { useEffect, useState } from "react";
import MainLayout from "../RootComponent/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { getLogsAction } from "../stateManager/actions/LogsAction";
import { getLogsFileService } from "../service/LogService";
import { saveAs } from "file-saver";
import RSelect from "react-select";
import {
  getAllUsersAction,
  usersAutocompleteAction,
} from "../stateManager/actions/UsersAction";
import makeAnimated from "react-select/animated";
import { Col, Input, Row, Select } from "antd";
import { colourStyles, SpaceStyled } from "../styled/global";
import CustomMediumButton from "../styled/components/CustomMediumButton";
import { orangeColor } from "../app/appColor";
import CustomButton from "../styled/components/CustomButton";
import LogsTableComponent from "../components/log/LogsTableComponent";
const animatedComponents = makeAnimated();

const LogRootComponent = () => {
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.logs);
  const usersAutocomplete = useSelector((state) => state.usersAutocomplete);
  const [pageId, setPageId] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [method, setMethod] = useState();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getData();
  }, [pageId, searchValue, method, users]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    await dispatch(usersAutocompleteAction());
  };

  const getData = async () => {
    let usersList = [];
    users.map((u) => {
      usersList.push(u.value);
    });
    await dispatch(
      getLogsAction({
        pageId,
        eachPerPage: 50,
        searchValue,
        method,
        users: usersList,
      })
    );
  };

  const handlePaging = (page) => {
    setPageId(page);
  };
  const getLogsFileHandler = async () => {
    let usersList = [];
    users.map((u) => {
      usersList.push(u.value);
    });
    const { data, status } = await getLogsFileService({
      pageId,
      eachPerPage: 50,
      searchValue,
      method,
      users: usersList,
    });
    if (status === 200) {
      saveAs(data, Date.now() + ".xlsx");
    }
  };
  return (
    <div>
      <Row>
        <Col span={17}>
          <h4>تاریخچه تغییرات سامانه</h4>
        </Col>
      </Row>
      <Row align="middle">
        <Col span={7}>
          <Input
            placeholder={"جستجو..."}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </Col>
        <Col span={7} offset={1}>
          <Select
            style={{ width: "100%" }}
            onChange={(e) => {
              setMethod(e);
            }}
            placeholder="انتخاب نوع درخواست"
          >
            <Select.Option value={"GET"} key={"GET"}>
              دریافت
            </Select.Option>
            <Select.Option value={"POST"} key={"POST"}>
              ثبت
            </Select.Option>
            <Select.Option value={"PUT"} key={"PUT"}>
              ویرایش
            </Select.Option>
            <Select.Option value={"DELETE"} key={"DELETE"}>
              حذف
            </Select.Option>
          </Select>
        </Col>
        <Col span={8} offset={1}>
          <RSelect
            styles={colourStyles}
            onChange={(e) => {
              setUsers(e);
            }}
            noOptionsMessage={() => "یافت نشد"}
            placeholder={"جست و جو در مخاطبین..."}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={usersAutocomplete}
          />
        </Col>
      </Row>
      <SpaceStyled top={10}>
        <CustomButton
          isLeft={true}
          onClick={getLogsFileHandler}
          color={orangeColor}
        >
          دریافت خروجی excel
        </CustomButton>
      </SpaceStyled>
      <LogsTableComponent logs={logs} setPageId={setPageId} />
    </div>
  );
};
export default LogRootComponent;
