import { Col, Row } from "antd";
import React, { Fragment } from "react";
import CustomLabel from "../styled/components/CustomLabel";
import Select from "react-select";

const LibraryRoot = () => {
  return (
    <Fragment>
      <div>
        <Row>
          <Col span={10}>
            <CustomLabel
              title={
                "جهت حذف اسناد انتخاب شده کلید Del و جهت انتقال به پوشه کلید M را فشار دهید"
              }
            />
          </Col>
          <Col>
            <Select
              onChange={(e) => {
                setArchive(e.value);
              }}
              noOptionsMessage={() => "یافت نشد"}
              placeholder={"جست و جو در بایگانی..."}
              components={animatedComponents}
              options={usersArchivesState}
            />
          </Col>
          <Col>
            <CustomLabel
              title={
                "جهت حذف اسناد انتخاب شده کلید Del و جهت انتقال به پوشه کلید M را فشار دهید"
              }
            />
          </Col>
          <Col>
            <CustomLabel
              title={
                "جهت حذف اسناد انتخاب شده کلید Del و جهت انتقال به پوشه کلید M را فشار دهید"
              }
            />
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};
export default LibraryRoot;
