import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../../stateManager/actions/UsersAction";
import PersianDatePickerComponent from "../../utility/PersianDatePickerComponent";
import { insertLendAction } from "../../stateManager/actions/LendsAction";
import { Col, Row } from "antd";
import CustomMediumButton from "../../styled/components/CustomMediumButton";
import { colourStyles, SpaceStyled } from "../../styled/global";

const ShareFile = ({ fileId }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [expire, setExpire] = useState(new Date().toISOString());
  const [usersReceiver, setUsersReceiver] = useState([]);
  const [usersSelected, setUsersSelected] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const usersCopy = [];
    users.map((u) => {
      usersCopy.push({
        value: u._id,
        label: u.firstName + " " + u.lastName + " - " + u.position,
      });
    });
    setUsersReceiver(usersCopy);
  }, [users]);

  const getData = async () => {
    await dispatch(
      getAllUsersAction({
        searchValue: "",
      })
    );
  };

  const insertShareFile = async () => {
    await dispatch(
      insertLendAction({
        usersReceiver: usersSelected,
        expireDate: expire,
        isCompleteFile: true,
        fileId,
      })
    );
  };
  return (
    <div>
      <Row>
        <Col span={11}>
          <Select
            styles={colourStyles}
            onChange={(e) => {
              let users = [];
              e.map((u) => {
                users.push(u.value);
              });
              setUsersSelected(users);
            }}
            noOptionsMessage={() => "یافت نشد"}
            placeholder={"جست و جو در مخاطبین..."}
            closeMenuOnSelect={false}
            className="basic-multi-select mb-2"
            classNamePrefix="select"
            isMulti
            options={usersReceiver}
          />
        </Col>
        <Col span={12} offset={1}>
          <SpaceStyled top={10}>
            <PersianDatePickerComponent
              style
              value={expire}
              onSelect={(moment) => {
                const miladiDate = moment.format("MM/DD/YYYY");
                const persianDate = moment.format("jYYYY/jMM/jDD");

                setExpire(moment);
              }}
            />
          </SpaceStyled>
        </Col>
      </Row>

      <SpaceStyled top={20}>
        <Row justify="space-between">
          <Col></Col>
          <Col>
            <CustomMediumButton onClick={insertShareFile}>
              ثبت
            </CustomMediumButton>
          </Col>
        </Row>
      </SpaceStyled>
    </div>
  );
};
export default ShareFile;
