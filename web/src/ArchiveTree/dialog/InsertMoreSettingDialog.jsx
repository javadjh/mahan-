import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertMoreSettingArchiveAction } from "../../stateManager/actions/ArchiveAction";
import GuardSystemRoot from "../../guardSystem/GuardSystemRoot";
import { Col, Divider, Input, Radio, Row, Space } from "antd";
import { CenterVerticalStyled, SpaceStyled } from "../../styled/global";
import CustomButton from "../../styled/components/CustomButton";
import { lightGreenColor } from "../../app/appColor";
import CustomInput from "../../styled/components/CustomInput";
const InsertMoreSettingDialog = () => {
  const dispatch = useDispatch();
  const singleArchive = useSelector((state) => state.singleArchive.archive);

  const [inputLabel, setInputLabel] = useState("");

  const [firstStringOfPattern, setFirstStringOfPattern] = useState(
    singleArchive.firstStringOfPattern
  );
  const [availablePattern, setAvailablePattern] = useState(
    singleArchive.availablePattern
  );
  const [watermarkText, setWatermarkText] = useState(
    singleArchive.watermarkText
  );
  const [maxFileSize, setMaxFileSize] = useState(singleArchive.maxFileSize);

  const [
    isDigitalCodeGeneratedWithSystem,
    setIsDigitalCodeGeneratedWithSystem,
  ] = useState(
    singleArchive.isDigitalCodeGeneratedWithSystem === undefined
      ? false
      : singleArchive.isDigitalCodeGeneratedWithSystem
  );
  const [illegalFormats, setIllegalFormats] = useState([]);

  useEffect(() => {
    if (singleArchive._id) {
      setWatermarkText(singleArchive.watermarkText);
      setMaxFileSize(singleArchive.maxFileSize);
      setIsDigitalCodeGeneratedWithSystem(
        singleArchive.isDigitalCodeGeneratedWithSystem === undefined
          ? false
          : singleArchive.isDigitalCodeGeneratedWithSystem
      );
      setFirstStringOfPattern(singleArchive.firstStringOfPattern);
      setAvailablePattern(singleArchive.availablePattern);
      switch (singleArchive.availablePattern) {
        case "one":
          setInputLabel(`-حروفی که کاربر وارد میکند`);
          break;
        case "two":
          setInputLabel(`-تاریخ-عددی که کاربر وارد میکند`);
          break;
        case "three":
          setInputLabel(`-تاریخ-عددی که سامانه تولید میکند`);
          break;
        case "four":
          setInputLabel(``);
          break;
        case "five":
          setInputLabel(``);
          break;
      }
      setIllegalFormats(singleArchive.illegalFormats);
    } else {
      setWatermarkText("");
      setMaxFileSize("");
      setIsDigitalCodeGeneratedWithSystem(false);
      setFirstStringOfPattern(``);
      setAvailablePattern(``);
      setIllegalFormats([]);
    }
  }, [singleArchive]);
  const sendData = async () => {
    let data = {
      watermarkText,
      maxFileSize,
      isDigitalCodeGeneratedWithSystem,
      firstStringOfPattern,
      availablePattern,
      illegalFormats,
    };
    await dispatch(insertMoreSettingArchiveAction(singleArchive._id, data));
  };
  return (
    <Fragment>
      <div>
        <GuardSystemRoot archiveId={singleArchive._id} />
        <SpaceStyled vertical={10}>
          <Row>
            <Col span={11}>
              <Input
                label="واترمارک"
                type="text"
                name={"watermarkText"}
                value={watermarkText}
                onChange={(e) => {
                  setWatermarkText(e.target.value);
                }}
                className="form-control"
                id="validationCustom04"
                placeholder="متن واترمارک ..."
                required
              />
            </Col>
            <Col span={12} offset={1}>
              <Input
                label="حداکثر حجم"
                type="number"
                name={"maxFileSize"}
                value={maxFileSize}
                onChange={(e) => {
                  setMaxFileSize(e.target.value);
                }}
                className="form-control"
                id="validationCustom04"
                placeholder="حداکثر حجم فایل هر سند را وارد کنید"
                required
              />
            </Col>
          </Row>
        </SpaceStyled>
        <div>
          <Divider />

          <div hidden={inputLabel.length < 2}>
            <div>
              <Row>
                <Col span={3}>
                  <Input
                    name={"firstStringOfPattern"}
                    value={firstStringOfPattern}
                    placeholder={"شناسه"}
                    onChange={(e) => {
                      setFirstStringOfPattern(e.target.value);
                    }}
                    style={{ textAlign: "center" }}
                  />
                </Col>
                <Col>
                  <CenterVerticalStyled>
                    <b className={"text-right "}>{inputLabel}</b>
                  </CenterVerticalStyled>
                </Col>
              </Row>
            </div>
          </div>
          <Radio.Group value={availablePattern}>
            <Space direction="vertical">
              <Radio
                value={"one"}
                onClick={() => {
                  setAvailablePattern(`one`);
                  setInputLabel(`-حروفی که کاربر وارد میکند`);
                }}
              >
                <b>نوع اول - [شناسه]-(توسط کاربر وارد شود) f-</b>
                <b style={{ color: "red" }}>541263</b>
              </Radio>
              <Radio
                value={"two"}
                onClick={() => {
                  setAvailablePattern(`two`);
                  setInputLabel(`-تاریخ-عددی که کاربر وارد میکند`);
                }}
              >
                نوع دوم - [شناسه]-تاریخ-(توسط کاربر وارد شود) f-
                <b style={{ color: "green" }}>14001025</b>
                <b style={{ color: "red" }}>741525</b>
              </Radio>
              <Radio
                value={"three"}
                onClick={() => {
                  setAvailablePattern(`three`);
                  setInputLabel(`-تاریخ-عددی که سامانه تولید میکند`);
                }}
              >
                نوع سوم - [شناسه]-تاریخ-(توسط سامانه وارد می شود) f-
                <b style={{ color: "green" }}>14001025</b>
                <b style={{ color: "red" }}>001</b>
              </Radio>
              <Radio
                value={"four"}
                onClick={() => {
                  setAvailablePattern(`four`);
                  setInputLabel(``);
                }}
              >
                کامل توسط سامانه تولید شود
              </Radio>
              <Radio
                value={"five"}
                onClick={() => {
                  setAvailablePattern(`five`);
                  setInputLabel(``);
                }}
              >
                کامل توسط کاربر تولید شود
              </Radio>
            </Space>
          </Radio.Group>
        </div>

        <Row justify="end">
          <Col>
            <CustomButton color={lightGreenColor} onClick={sendData}>
              ثبت
            </CustomButton>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};
export default InsertMoreSettingDialog;
