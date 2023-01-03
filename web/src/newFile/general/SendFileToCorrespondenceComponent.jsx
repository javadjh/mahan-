import { Form, Input } from "antd";
import React, { Fragment, useContext } from "react";
import { requiredForm } from "../../config/formValidator";
import { FileContext } from "../../context/file/FileContext";
import CustomButton from "../../styled/components/CustomButton";
import CustomTextArea from "../../styled/components/CustomTextArea";

const SendFileToCorrespondenceComponent = () => {
  const { fileStatistic, sendFileHandle } = useContext(FileContext);
  return (
    <Fragment>
      {!fileStatistic?.file?.isWaiting &&
      !fileStatistic?.file?.isConfirm &&
      fileStatistic?.file?.creator === localStorage.getItem("userId") ? (
        <Form
          layout="vertical"
          onFinish={(formData) => {
            sendFileHandle(formData);
          }}
        >
          <Form.Item label="توضیحات" name={"message"} rules={[requiredForm]}>
            <Input.TextArea
              rows={5}
              placeholder={"توضیحات را جهت ارسال وارد کنید..."}
            />
          </Form.Item>

          <CustomButton
            htmlType={"submit"}
            isLeft={true}
            onClick={sendFileHandle}
          >
            ارسال
          </CustomButton>
        </Form>
      ) : null}
    </Fragment>
  );
};
export default SendFileToCorrespondenceComponent;
