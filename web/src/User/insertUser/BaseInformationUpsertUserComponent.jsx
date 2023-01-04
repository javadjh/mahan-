import React, { useContext, useState } from "react";
import { UpsertUserContext } from "./UpsertUserContext";
import {
  just_english,
  just_english_and_digit,
  just_persian,
  melliCodeValidator,
} from "../../utility/inputValidators";
import { Col, Divider, Form, Input, Row } from "antd";
import { SpaceStyled } from "../../styled/global";
import CustomInput from "../../styled/components/CustomInput";
const BaseInformationUpsertUserComponent = () => {
  const [inputType, setInputType] = useState("password");
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phoneNumber,
    setPhoneNumber,
    userName,
    setUserName,
    password,
    setPassword,
    email,
    setEmail,
    position,
    setPosition,
    showMelliCodeError,
    setShowMelliCodeError,
    id,
    formValidator,
  } = useContext(UpsertUserContext);
  return (
    <Col span={11}>
      <SpaceStyled horizontal={5}>
        <div className="card-body">
          <h4 className="card-title">مشخصات کاربر</h4>
          <p className="card-title-desc">
            در این قسمت باید اطلاعات کلی کاربر را وارد نمایید
          </p>
          <form className="needs-validation" noValidate>
            <SpaceStyled bottom={10}>
              <Row>
                <Col span={11}>
                  <Form.Item label="نام">
                    <Input
                      type="text"
                      className="form-control"
                      id="validationCustom03"
                      value={firstName}
                      name={"firstName"}
                      onChange={(e) => {
                        if (
                          just_persian(e.target.value) ||
                          e.target.value.length === 0
                        ) {
                          formValidator.current.showMessageFor("firstName");
                          setFirstName(e.target.value);
                        }
                      }}
                      placeholder="نام را وارد کنید..."
                      required
                    />
                  </Form.Item>
                  {formValidator.current.message(
                    "firstName",
                    firstName,
                    "required|min:2|max:80"
                  )}
                </Col>
                <Col span={12} offset={1}>
                  <div className="form-group">
                    <Form.Item label="نام خانوادگی">
                      <Input
                        type="text"
                        value={lastName}
                        name={"lastName"}
                        onChange={(e) => {
                          if (
                            just_persian(e.target.value) ||
                            e.target.value.length === 0
                          ) {
                            formValidator.current.showMessageFor("lastName");
                            setLastName(e.target.value);
                          }
                        }}
                        className="form-control"
                        id="validationCustom04"
                        placeholder="نام خانوادگی را وارد کنید..."
                        required
                      />
                    </Form.Item>
                    {formValidator.current.message(
                      "lastName",
                      lastName,
                      "required|min:2|max:80"
                    )}
                  </div>
                </Col>
              </Row>
            </SpaceStyled>
            <SpaceStyled bottom={10}>
              <Row>
                <Col span={11}>
                  <Form.Item label="شماره تماس">
                    <Input
                      type="number"
                      name={phoneNumber}
                      onChange={(e) => {
                        if (e.target.value.length > 11) return;
                        formValidator.current.showMessageFor("phoneNumber");
                        setPhoneNumber(e.target.value);
                      }}
                      value={phoneNumber}
                      className="form-control"
                      id="validationCustom05"
                      placeholder="شماره تماس را وارد کنید..."
                      required
                    />
                  </Form.Item>
                  {formValidator.current.message(
                    "phoneNumber",
                    phoneNumber,
                    "required|min:11|max:11"
                  )}
                </Col>
                <Col span={12} offset={1}>
                  <Form.Item label="شماره ملی">
                    <Input
                      type="number"
                      disabled={id}
                      name={userName}
                      onChange={(e) => {
                        if (e.target.value.length > 10) return;
                        setUserName(e.target.value);
                        if (!melliCodeValidator(e.target.value)) {
                          setShowMelliCodeError(true);
                        } else {
                          setShowMelliCodeError(false);
                        }
                      }}
                      value={userName}
                      className="form-control"
                      id="validationCustom05"
                      placeholder="شماره ملی را وارد کنید..."
                      required
                    />
                  </Form.Item>
                  {showMelliCodeError ? (
                    <p style={{ color: "red" }}>شماره ملی نامعتبر است</p>
                  ) : null}
                </Col>
              </Row>
            </SpaceStyled>
            {id ? null : (
              <SpaceStyled bottom={10}>
                <Row>
                  <Col span={11}>
                    <Row>
                      <Col span={24}>
                        <Form.Item label="کلمه ی عبور">
                          <Input
                            type={inputType}
                            onChange={(e) => {
                              formValidator.current.showMessageFor("password");
                              if (
                                !just_persian(
                                  e.target.value.substr(
                                    e.target.value.length - 1,
                                    e.target.value.length
                                  )
                                ) ||
                                e.target.value.length === 0
                              ) {
                                setPassword(e.target.value);
                              }
                            }}
                            aria-describedby="validationTooltipUsernamePrepend"
                            value={password}
                            className="form-control "
                            id="validationCustom05"
                            placeholder="کلمه عبور را وارد کنید..."
                            required
                          />
                        </Form.Item>

                        <label style={{ fontSize: 11 }}>
                          کلمه عبور باید حداقل حاوی ۶ کارکتر، شامل حروف کوچک و
                          بزرگ انگلیسی، عدد و نماد باشد.
                        </label>
                        {formValidator.current.message(
                          "password",
                          password,
                          "min:6|max:32|password|required"
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12} offset={1}>
                    <Form.Item label="ایمیل">
                      <Input
                        type="text"
                        onChange={(e) => {
                          formValidator.current.showMessageFor("email");
                          setEmail(e.target.value);
                        }}
                        value={email}
                        className="form-control"
                        id="validationCustom05"
                        placeholder="ایمیل کاربر را وارد کنید"
                        required
                      />
                    </Form.Item>
                    {formValidator.current.message(
                      "email",
                      email,
                      "required|email"
                    )}
                  </Col>
                </Row>
              </SpaceStyled>
            )}
            <Divider></Divider>
            <Row>
              <Col span={12}>
                <Form.Item label="سمت کاربر">
                  <Input
                    type="text"
                    onChange={(e) => {
                      formValidator.current.showMessageFor("position");
                      setPosition(e.target.value);
                    }}
                    value={position}
                    className="form-control"
                    id="validationCustom05"
                    placeholder="سمت کاربر را وارد کنید"
                    required
                  />
                </Form.Item>
                {formValidator.current.message(
                  "position",
                  position,
                  "required|min:2|max:100"
                )}
              </Col>
            </Row>
          </form>
        </div>
      </SpaceStyled>
    </Col>
  );
};
export default BaseInformationUpsertUserComponent;
