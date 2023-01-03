import React, { Fragment, useEffect, useRef, useState } from "react";
import { validatorSP } from "../../utility/formValidator";
import { useDispatch, useSelector } from "react-redux";
import {
  insertLegalPeopleAction,
  updateLegalPeopleAction,
} from "../../stateManager/actions/LegalPeopleAction";
import {
  insertArchiveAction,
  updateArchiveAction,
} from "../../stateManager/actions/ArchiveAction";
import { Form, Input } from "antd";
import { maxForm, minForm, requiredForm } from "../../config/formValidator";
import CustomButton from "../../styled/components/CustomButton";
import { lightGreenColor } from "../../app/appColor";
import CustomInput from "../../styled/components/CustomInput";
const InsertArchiveDialog = ({ singleArchive, setIsUpsertDialogShow }) => {
  console.table(singleArchive);
  const dispatch = useDispatch();
  const [id, setId] = useState();

  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    if (singleArchive._id) {
      setId(singleArchive._id);
    } else {
      setId("");
    }
    form.setFieldsValue(singleArchive);
  }, [singleArchive]);

  const sendData = async (formData) => {
    const data = formData;
    if (id) await dispatch(updateArchiveAction(id, data));
    else await dispatch(insertArchiveAction(data));
    setIsUpsertDialogShow(false);
    form.resetFields();
  };

  return (
    <Fragment>
      <h4>مدیریت بایگانی ها</h4>
      <p>در این قسمت می توانید بایگانی ها را مدیریت یا ویرایش کنید</p>
      <Form layout="vertical" form={form} onFinish={sendData}>
        <Form.Item
          label="عنوان"
          name={"title"}
          rules={[requiredForm, minForm(2), maxForm(80)]}
        >
          <Input placeholder="عنوان بایگانی را وارد کنید..." />
        </Form.Item>
        <Form.Item label="توضیحات" name={"description"} rules={[maxForm(550)]}>
          <Input placeholder="توضیحات را وارد کنید..." />
        </Form.Item>
        <CustomButton htmlType={"submit"} color={lightGreenColor}>
          ثبت
        </CustomButton>
      </Form>
    </Fragment>
  );
};
export default InsertArchiveDialog;
