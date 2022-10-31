import React, { useContext, useEffect } from "react";
import { UpsertUserContext } from "./UpsertUserContext";
import { Checkbox, Col, Divider, Form, Row, Select } from "antd";
import CustomCard from "../../styled/components/CustomCard";
import CustomButton from "../../styled/components/CustomButton";
import { CenterVerticalStyled, SpaceStyled } from "../../styled/global";
import {
  darkBlueColor,
  grayColor,
  lightBlueColor,
  lightGreenColor,
} from "../../app/appColor";
const SecondInformationUpsertUserComponent = ({
  upsertUserData,
  sendData,
  getData,
}) => {
  const {
    setRole,
    role,
    setArchive,
    archive,
    dataRole,
    addUserRoleHandler,
    deleteUserRoleHandle,
    fileAccess,
    fileAccessManager,
  } = useContext(UpsertUserContext);
  const [form] = Form.useForm();
  return (
    <Col span={12} offset={1}>
      <Form form={form}>
        <SpaceStyled horizontal={5}>
          <h4 className="card-title mx-3">انتخاب بایگانی و نقش</h4>
          <p className="card-title-desc mx-3">
            در این قسمت برای هر کاربر، نقش آن در هر بایگانی تعیین می گردد
          </p>
          <Row>
            <Col span={11}>
              <Form.Item name={"archive"}>
                <Select
                  onChange={(e) => {
                    setArchive(e);
                  }}
                  style={{ width: "100%" }}
                >
                  <Select.Option selected={archive === undefined}>
                    انتخاب کنید
                  </Select.Option>
                  {upsertUserData.archives.map((a) => (
                    <Select.Option
                      value={`${a._id}!@${a.title}`}
                      selected={archive === a}
                    >
                      {a.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} offset={1}>
              <Form.Item name={"role"}>
                <Select
                  style={{ width: "100%" }}
                  // onClick={() => {
                  //   getData();
                  // }}
                  onChange={(e) => {
                    setRole(e);
                  }}
                >
                  <Select.Option selected={role === undefined}>
                    انتخاب کنید
                  </Select.Option>
                  {upsertUserData.roles.map((r) => (
                    <Select.Option
                      value={`${r._id}!@${r.title}`}
                      selected={role === r}
                    >
                      {r.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <CenterVerticalStyled>
                <Checkbox
                  checked={fileAccess.includes("محرمانه")}
                  onChange={(e) => {
                    fileAccessManager("محرمانه", e.target.checked);
                  }}
                >
                  محرمانه
                </Checkbox>
                <Checkbox
                  checked={fileAccess.includes("عادی")}
                  onChange={(e) => {
                    fileAccessManager("عادی", e.target.checked);
                  }}
                >
                  عادی
                </Checkbox>
                <Checkbox
                  checked={fileAccess.includes("به کل محرمانه")}
                  onChange={(e) => {
                    fileAccessManager("به کل محرمانه", e.target.checked);
                  }}
                >
                  به کل محرمانه
                </Checkbox>
              </CenterVerticalStyled>
            </Col>
            <Col span={12}>
              <CustomButton
                block
                onClick={() => {
                  addUserRoleHandler();
                  form.resetFields();
                }}
              >
                افزودن نقش
              </CustomButton>
            </Col>
          </Row>
          <span>
            {dataRole.map((d) => (
              <Row
                style={{
                  backgroundColor: lightBlueColor,
                  borderRadius: 10,
                  padding: 10,
                  marginTop: 10,
                }}
                justify="space-between"
                align="middle"
              >
                <Col>
                  {d.archiveTitle} - {d.roleTitle}
                </Col>
                <Col>
                  {d.fileAccess.map((access, index) => (
                    <>
                      {access} {index === d.fileAccess.length - 1 ? "" : "-"}{" "}
                    </>
                  ))}
                </Col>

                <Col>
                  <i
                    onClick={() => deleteUserRoleHandle(d)}
                    style={{ color: "red" }}
                  >
                    حذف
                  </i>
                </Col>
              </Row>
            ))}
          </span>

          <Divider></Divider>
          <Row align="end">
            <Col span={12}>
              <SpaceStyled top={20}>
                <CustomButton block color={lightGreenColor} onClick={sendData}>
                  ثبت
                </CustomButton>
              </SpaceStyled>
            </Col>
          </Row>
        </SpaceStyled>
      </Form>
    </Col>
  );
};
export default SecondInformationUpsertUserComponent;
