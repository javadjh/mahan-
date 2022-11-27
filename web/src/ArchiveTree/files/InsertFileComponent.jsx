import React, { useEffect, useRef, useState } from "react";
import moment1 from "jalali-moment";
import RSelect from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  getInsertFileInsertDataAction,
  getSingleFileArchive,
  insertFileAction,
  setManualSingleFileArchive,
} from "../../stateManager/actions/FileAction";
import makeAnimated from "react-select/animated";
import { validatorSP } from "../../utility/formValidator";
import PersianDatePickerComponent from "../../utility/PersianDatePickerComponent";
import { useHistory } from "react-router";
import { Button, Checkbox, Col, Form, Input, Row, Select } from "antd";
import { getAllFormsAction } from "../../stateManager/actions/FormAction";
import { colourStyles, SpaceStyled } from "../../styled/global";
import CustomButton from "../../styled/components/CustomButton";
import { maxForm, minForm, requiredForm } from "../../config/formValidator";
const animatedComponents = makeAnimated();

const InsertFileComponent = ({ tree, mainTree, isUpdate = false, fileId }) => {
  let [archive, setArchive] = useState(tree?.archive);
  let [lang, setLang] = useState(tree?.lang);
  const [form] = Form.useForm();
  const [isLoaded, setIsLoaded] = useState(!isUpdate);
  const history = useHistory();
  const [reload, setReload] = useState();
  const dispatch = useDispatch();
  const insertFileData = useSelector((state) => state.insertFileData);
  const file = useSelector((state) => state.file);

  const forms = useSelector((state) => state.forms);

  useEffect(() => {
    getData();
    return () => {
      dispatch(setManualSingleFileArchive({}));
    };
  }, []);
  useEffect(() => {
    if (file?._id) {
      form.setFieldsValue(file);
      setArchive(file.archiveTreeId.archive);
      setLang(file.archiveTreeId.lang);
      setIsLoaded(true);
    }
  }, [file?._id]);

  const getData = async () => {
    if (isUpdate) {
      await dispatch(getSingleFileArchive(fileId));
    }
    await dispatch(getInsertFileInsertDataAction());
    await dispatch(getAllFormsAction());
  };

  const sendData = async (formData) => {
    formData.fileDate = lang === "fa" ? formData.faDate : formData.enDate;
    formData.archiveTreeId = tree._id;
    formData.mainArchiveTreeId = mainTree?._id;
    formData.applicantId = formData.applicantId.value;
    formData.enDate = undefined;
    formData.faDate = undefined;
    console.log(formData);
    await dispatch(insertFileAction(formData, history));
  };
  return (
    <div>
      {isLoaded && (
        <div>
          <Form
            form={form}
            initialValues={{
              enDate: new Date().toISOString(),
              faDate: new Date().toISOString(),
            }}
            onFinish={sendData}
          >
            <Row align="middle">
              <Col span={12}>
                <Form.Item valuePropName="checked" name={"hasSpecialForm"}>
                  <Checkbox
                    onChange={() => {
                      setReload(Date.now());
                    }}
                  >
                    فرم روکش سند برای این پرونده متفاوت باشد
                  </Checkbox>
                </Form.Item>
              </Col>

              {form.getFieldValue("hasSpecialForm") ? (
                <Col span={12}>
                  <Form.Item name={"formSelected"} rules={[requiredForm]}>
                    <Select
                      placeholder="فرم را انتخاب کنید"
                      style={{ width: "100%" }}
                    >
                      <Select.Option value={``} name={``}>
                        انتخاب کنید
                      </Select.Option>
                      {forms.map((f) => (
                        <Select.Option value={f._id} name={f._id}>
                          {f.title}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              ) : null}
            </Row>
            <SpaceStyled vertical={10}>
              <Row align="middle">
                {archive.availablePattern === "one" ||
                archive.availablePattern === "two" ||
                archive.availablePattern === "five" ? (
                  <Col span={8} dir={"ltr"}>
                    <Row align="middle">
                      {archive.availablePattern === "five" ? null : (
                        <Col span={8}>
                          {archive.availablePattern === "two"
                            ? `${archive.firstStringOfPattern}-${moment1(
                                new Date(),
                                "YYYY/MM/DD"
                              )
                                .locale("fa")
                                .format("YYYYMMDD")}`
                            : `${archive.firstStringOfPattern}-`}
                        </Col>
                      )}
                      <Col span={15}>
                        <Form.Item
                          style={{ margin: 0, padding: 0, width: 0, height: 0 }}
                          name={"fileCodeType"}
                        ></Form.Item>
                        <Form.Item
                          name={"fileCode"}
                          rules={[
                            ...[minForm(3), maxForm(20)],
                            ...[
                              archive.availablePattern === "one" ||
                              archive.availablePattern === "two" ||
                              archive.availablePattern === "four"
                                ? requiredForm
                                : {},
                            ],
                          ]}
                        >
                          <Input
                            onChange={(e) => {
                              form.setFieldsValue({
                                ...form.getFieldsValue,
                                ...{
                                  fileCodeType: e.target.value,
                                },
                              });
                            }}
                            placeholder="شماره پرونده"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                ) : null}
              </Row>
            </SpaceStyled>

            <SpaceStyled vertical={10}>
              <Form.Item
                name={"title"}
                rules={[requiredForm, minForm(2), maxForm(255)]}
              >
                <Input placeholder="عنوان پرونده را وارد نمایید..." />
              </Form.Item>
            </SpaceStyled>
            <SpaceStyled vertical={10}>
              <Row>
                <Col span={8}>
                  <SpaceStyled left={10}>
                    {lang === "fa" ? (
                      <Form.Item name={"faDate"} rules={[requiredForm]}>
                        <PersianDatePickerComponent
                          value={form.getFieldValue("faDate")}
                          onSelect={(moment) => {
                            const miladiDate = moment.format("MM/DD/YYYY");
                            const persianDate = moment.format("jYYYY/jMM/jDD");
                            console.log(persianDate);
                            console.log(miladiDate);
                            form.setFieldsValue({
                              ...form.getFieldsValue,
                              ...{
                                faDate: moment,
                              },
                            });
                            // setFaDate(moment);
                          }}
                        />
                      </Form.Item>
                    ) : (
                      <div dir={"ltr"}>
                        <Form.Item name={"enDate"} rules={[requiredForm]}>
                          <PersianDatePickerComponent
                            value={form.getFieldValue("enDate")}
                            onSelect={(moment) => {
                              const miladiDate = moment.format("MM/DD/YYYY");
                              const persianDate =
                                moment.format("jYYYY/jMM/jDD");
                              console.log(persianDate);
                              console.log(miladiDate);
                              form.setFieldsValue({
                                ...form.getFieldsValue,
                                ...{
                                  enDate: moment,
                                },
                              });
                              // setEnDate(moment);
                            }}
                          />
                        </Form.Item>
                      </div>
                    )}
                  </SpaceStyled>
                </Col>

                <Col span={8}>
                  <SpaceStyled left={10}>
                    <Form.Item rules={[requiredForm]} name={"fileStatus"}>
                      <Select
                        placeholder="وضعیت پرونده را مشخص کنید"
                        style={{ width: "100%" }}
                      >
                        <Select.Option value={undefined} key={undefined}>
                          انتخاب کنید
                        </Select.Option>

                        <Select.Optionon value={"جاری"} key={"جاری"}>
                          جاری
                        </Select.Optionon>
                        <Select.Option value={"نیمه جاری"} key={"نیمه جاری"}>
                          نیمه جاری
                        </Select.Option>
                        <Select.Option value={"مختومه"} key={"مختومه"}>
                          مختومه
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </SpaceStyled>
                </Col>
                <Col span={8}>
                  <SpaceStyled left={10}>
                    <Form.Item name={"type"} rules={[requiredForm]}>
                      <Select style={{ width: "100%" }}>
                        <Select.Option value={""} key={""}>
                          انتخاب کنید
                        </Select.Option>
                        {insertFileData?.fileAccess?.map((fileAccessItem) => (
                          <Select.Option
                            value={fileAccessItem}
                            key={fileAccessItem}
                          >
                            {fileAccessItem}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </SpaceStyled>
                </Col>
              </Row>
            </SpaceStyled>
            <SpaceStyled vertical={10}>
              <Row>
                <Col span={12}>
                  <SpaceStyled left={10}>
                    <div
                      onClick={() => {
                        getData();
                      }}
                    >
                      <Form.Item name={"contacts"} rules={[requiredForm]}>
                        <RSelect
                          styles={colourStyles}
                          noOptionsMessage={() => "یافت نشد"}
                          placeholder={"جست و جو در مخاطبین..."}
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          options={insertFileData.people}
                        />
                      </Form.Item>
                    </div>
                  </SpaceStyled>
                </Col>
                <Col span={12}>
                  <div
                    onClick={() => {
                      getData();
                    }}
                  >
                    <Form.Item name={"applicantId"} rules={[requiredForm]}>
                      <RSelect
                        styles={colourStyles}
                        className="basic-single"
                        classNamePrefix="select"
                        noOptionsMessage={() => "یافت نشد"}
                        placeholder={"جست و جو در سمت های سازمانی..."}
                        components={animatedComponents}
                        options={insertFileData.applicants}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </SpaceStyled>
            <Form.Item name={"keyword"}>
              <Input.TextArea
                rows={4}
                placeholder={
                  "کلید واژه های مورد نظر خود را جهت جستجو راحت تر وارد کنید"
                }
              />
            </Form.Item>
            <Row justify="end">
              <Col span={8}>
                {/* onClick={sendData} */}
                <CustomButton block htmlType="submit">
                  ثبت پرونده
                </CustomButton>
              </Col>
            </Row>
          </Form>
        </div>
      )}
    </div>
  );
};
export default InsertFileComponent;
