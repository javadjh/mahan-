import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  insertPersonAction,
  updatePersonAction,
} from "../../stateManager/actions/PeopleAction";
import {
  insertLegalPeopleAction,
  updateLegalPeopleAction,
} from "../../stateManager/actions/LegalPeopleAction";
import { validatorSP } from "../../utility/formValidator";
import PersianDatePickerComponent from "../../utility/PersianDatePickerComponent";
import { just_persian } from "../../utility/inputValidators";
import { defaultDate } from "../../utility/dateUtil";
import { Col, Form, Input, Row } from "antd";
import { SpaceStyled } from "../../styled/global";
import {
  maxForm,
  minForm,
  persianRule,
  requiredForm,
} from "../../config/formValidator";
import CustomButton from "../../styled/components/CustomButton";
import { lightGreenColor } from "../../app/appColor";
const jalaliMoment = require("jalali-moment");

const UpsertLegalPersonDialog = ({
  singleLegalPerson,
  setIsUpsertDialogShow,
}) => {
  const dispatch = useDispatch();
  const [registerDate, setRegisterDate] = useState(defaultDate(true));

  const [form] = Form.useForm();
  useEffect(() => {
    if (singleLegalPerson?._id) {
      form.setFieldsValue({
        ...singleLegalPerson,
        ...{ id: singleLegalPerson?._id },
      });
      setRegisterDate(singleLegalPerson.registerDate);
    } else {
      form.resetFields();
      form.setFieldsValue({ companyName: "" });
    }
  }, [singleLegalPerson]);

  const sendData = async (formData) => {
    const data = { ...formData, ...{ registerDate, id: undefined } };
    if (formData.id) await dispatch(updateLegalPeopleAction(formData.id, data));
    else await dispatch(insertLegalPeopleAction(data));
    setIsUpsertDialogShow(false);
  };

  return (
    <Fragment>
      <div>
        <h4>مدیریت شخص حقوقی</h4>
        <p>در این فرم می توانید اطلاعات اشخاص حقوقی را ثبت و ویرایش کنید</p>

        <Form form={form} onFinish={sendData}>
          <Form.Item name={"id"}></Form.Item>
          <Row>
            <Col span={12}>
              <SpaceStyled horizontal={10}>
                <Form.Item
                  name={"companyName"}
                  rules={[persianRule, requiredForm, minForm(2), maxForm(100)]}
                >
                  <Input placeholder="نام شرکت را وارد کنید..." />
                </Form.Item>
              </SpaceStyled>
            </Col>
            <Col span={12}>
              <SpaceStyled horizontal={10}>
                <Form.Item
                  name={"ceo"}
                  rules={[persianRule, requiredForm, minForm(2), maxForm(80)]}
                >
                  <Input placeholder="مدیر عامل را وارد کنید..." />
                </Form.Item>
              </SpaceStyled>
            </Col>
            <Col span={12}>
              <SpaceStyled horizontal={10}>
                <Form.Item name={"registerDate"}>
                  <PersianDatePickerComponent
                    value={registerDate}
                    onSelect={(moment) => {
                      const miladiDate = moment.format("MM/DD/YYYY");
                      const persianDate = moment.format("jYYYY/jMM/jDD");

                      setRegisterDate(persianDate);
                    }}
                  />{" "}
                </Form.Item>
              </SpaceStyled>
            </Col>
            <Col span={12}>
              <SpaceStyled horizontal={10}>
                <Form.Item name={"registerCode"} rules={[maxForm(50)]}>
                  <Input
                    type="number"
                    placeholder="شماره ثبت را وارد کنید..."
                  />
                </Form.Item>
              </SpaceStyled>
            </Col>
            <Col span={24}>
              <SpaceStyled horizontal={10}>
                <Form.Item name={"tel"} rules={[maxForm(11)]}>
                  <Input
                    type="number"
                    placeholder="شماره تماس را وارد کنید..."
                  />
                </Form.Item>
              </SpaceStyled>
            </Col>
            <Col span={24}>
              <SpaceStyled horizontal={10}>
                <Form.Item name={"address"} rules={[maxForm(550)]}>
                  <Input.TextArea placeholder="آدرس را وارد کنید..." />
                </Form.Item>
              </SpaceStyled>
            </Col>
          </Row>
          <CustomButton color={lightGreenColor} htmlType={"submit"}>
            ثبت
          </CustomButton>
        </Form>
      </div>
    </Fragment>
  );
};
export default UpsertLegalPersonDialog;
