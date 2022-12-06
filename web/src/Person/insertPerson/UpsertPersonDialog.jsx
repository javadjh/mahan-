import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  insertPersonAction,
  updatePersonAction,
} from "../../stateManager/actions/PeopleAction";
import { SpaceStyled } from "../../styled/global";
import {
  just_persian,
  melliCodeValidator,
} from "../../utility/inputValidators";
import PersianDatePickerComponent from "../../utility/PersianDatePickerComponent";
import { errorToast } from "../../utility/ShowToast";
import { defaultDate } from "../../utility/dateUtil";
import { validatorSP } from "../../utility/formValidator";
import { Col, Form, Input, Row, Select } from "antd";
import {
  maxForm,
  melliCodeRule,
  minForm,
  persianRule,
  requiredForm,
} from "../../config/formValidator";
import CustomButton from "../../styled/components/CustomButton";
import { lightGreenColor } from "../../app/appColor";
const UpsertPersonDialog = ({ singlePerson, setIsUpsertDialogShow }) => {
  const dispatch = useDispatch();
  const [birthday, setBirthday] = useState(defaultDate(true));

  const [form] = Form.useForm();
  useEffect(() => {
    if (singlePerson?._id) {
      form.setFieldsValue({ ...singlePerson, ...{ id: singlePerson?._id } });
      setBirthday(singlePerson.birthdays);
    } else {
      form.resetFields();
      form.setFieldsValue({ firstName: "" });
    }
  }, [singlePerson]);

  const sendData = async (formData) => {
    const data = { ...formData, ...{ birthday, id: undefined } };
    if (formData.id) await dispatch(updatePersonAction(formData.id, data));
    else await dispatch(insertPersonAction(data));
    setIsUpsertDialogShow(false);
  };

  return (
    <div>
      <h4>مدیریت شخص حقیقی</h4>
      <p>در این فرم می توانید اطلاعات اشخاص حقیقی را ثبت و ویرایش نمایید</p>
      <Form form={form} onFinish={sendData}>
        <Form.Item name={"id"}></Form.Item>
        <div>
          <Row>
            <Col span={12}>
              <SpaceStyled horizontal={10}>
                <Form.Item
                  name={"firstName"}
                  rules={[persianRule, requiredForm, minForm(2), maxForm(50)]}
                >
                  <Input placeholder="نام را وارد کنید..." />
                </Form.Item>
              </SpaceStyled>
            </Col>
            <Col span={12}>
              <SpaceStyled horizontal={10}>
                <Form.Item
                  name={"lastName"}
                  rules={[persianRule, requiredForm, minForm(2), maxForm(50)]}
                >
                  <Input placeholder="نام خانوادگی را وارد کنید..." />
                </Form.Item>
              </SpaceStyled>
            </Col>
            <Col span={12}>
              <SpaceStyled horizontal={10}>
                <Form.Item
                  name={"fathersName"}
                  rules={[persianRule, minForm(2), maxForm(50)]}
                >
                  <Input placeholder="نام پدر را وارد کنید..." />
                </Form.Item>
              </SpaceStyled>
            </Col>
            <Col span={12}>
              <SpaceStyled horizontal={10}>
                <Form.Item name={"idCode"}>
                  <Input placeholder="شماره شناسنامه را وارد کنید..." />
                </Form.Item>
              </SpaceStyled>
            </Col>
            <Col span={12}>
              <SpaceStyled horizontal={10}>
                <Form.Item name={"melliCode"} rules={[melliCodeRule]}>
                  <Input placeholder="شماره ملی را وارد کنید..." />
                </Form.Item>
              </SpaceStyled>
            </Col>
            <Col span={12}>
              <SpaceStyled horizontal={10}>
                {/* <label htmlFor="validationCustom04">
                  تاریخ تولد {birthday}
                </label> */}
                <Form.Item name={"birthday"}>
                  <PersianDatePickerComponent
                    value={birthday}
                    onSelect={(moment) => {
                      const miladiDate = moment.format("MM/DD/YYYY");
                      const persianDate = moment.format("jYYYY/jMM/jDD");

                      setBirthday(persianDate);
                    }}
                  />
                </Form.Item>
              </SpaceStyled>
            </Col>
            <Col span={12}>
              <SpaceStyled horizontal={10}>
                <Form.Item name={"gender"} rules={[requiredForm]}>
                  <Select defaultValue="none">
                    <Select.Option value="none">انتخاب کنید</Select.Option>
                    <Select.Option value="man">آقا</Select.Option>
                    <Select.Option value="woman">خانم</Select.Option>
                  </Select>
                </Form.Item>
              </SpaceStyled>
            </Col>
            <Col span={12}>
              <SpaceStyled horizontal={10}>
                <CustomButton color={lightGreenColor} block htmlType={"submit"}>
                  ثبت
                </CustomButton>
              </SpaceStyled>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};
export default UpsertPersonDialog;
