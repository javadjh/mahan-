import React, { useEffect, useState } from "react";
import LogsTableComponent from "../Log/LogsTableComponent";
import PagingComponent from "../utility/PagingComponent";
import MainLayout from "../RootComponent/MainLayout";
import ReportingTableComponent from "./ReportingTableComponent";
import { useDispatch, useSelector } from "react-redux";
import { getReportingFilterFileService } from "../service/FileService";
import {
  getReportingAction,
  getReportingFilterDataAction,
} from "../stateManager/actions/FileAction";
import RSelect from "react-select";
import makeAnimated from "react-select/animated";
import PersianDatePickerComponent from "../utility/PersianDatePickerComponent";
import { saveAs } from "file-saver";
import { Col, Row, Select } from "antd";
import CustomCard from "../styled/components/CustomCard";
import { SpaceStyled } from "../styled/global";

const animatedComponents = makeAnimated();
const ReportingRootComponent = () => {
  const dispatch = useDispatch();
  const reporting = useSelector((state) => state.reporting);
  const reportingFilterData = useSelector((state) => state.reportingFilterData);
  const [pageId, setPageId] = useState(1);
  const [legalPeople, setLegalPeople] = useState([]);
  const [people, setPeople] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [isDes, setIsDes] = useState(-1);
  const [type, setType] = useState();
  const [fileStatus, setFileStatus] = useState();
  const [sortBy, setSortBy] = useState();

  useEffect(() => {
    dispatch(getReportingFilterDataAction());
  }, []);
  useEffect(() => {
    getData();
  }, [
    pageId,
    sortBy,
    people,
    legalPeople,
    applicants,
    endDate,
    startDate,
    isDes,
    type,
    fileStatus,
  ]);

  const getData = async () => {
    let finalPeople = [];
    people.map((p) => {
      finalPeople.push(p.value);
    });

    let finalLegalPeople = [];
    legalPeople.map((l) => {
      finalLegalPeople.push(l.value);
    });

    let finalApplicant = [];
    applicants.map((a) => {
      finalApplicant.push(a.value);
    });
    await dispatch(
      getReportingAction({
        pageId,
        eachPerPage: 12,
        legalPeople: finalLegalPeople,
        people: finalPeople,
        applicants: finalApplicant,
        startDate,
        endDate,
        isDes,
        sortBy,
        type,
        fileStatus,
        isGettingFile: true,
      })
    );
  };
  const handlePaging = (page) => {
    setPageId(page);
  };
  const getReportingFile = async () => {
    let finalPeople = [];
    people.map((p) => {
      finalPeople.push(p.value);
    });

    let finalLegalPeople = [];
    legalPeople.map((l) => {
      finalLegalPeople.push(l.value);
    });

    let finalApplicant = [];
    applicants.map((a) => {
      finalApplicant.push(a.value);
    });
    const { data, status } = await getReportingFilterFileService({
      pageId,
      eachPerPage: 12,
      legalPeople: finalLegalPeople,
      people: finalPeople,
      applicants: finalApplicant,
      startDate,
      endDate,
      isDes,
      sortBy,
      type,
      fileStatus,
    });
    if (status === 200) {
      saveAs(data, Date.now() + ".xlsx");
    }
  };
  return (
    <Row>
      <Col span={24}>
        <CustomCard>
          <Row>
            <Col span={17}>
              <h4 className="card-title ml-3 mt-1">گزارش های سامانه</h4>
              <p>
                در این قسمت میتوانید گزارش های مربوط به پرونده های سامانه را
                مشاهده کنید
              </p>
            </Col>
          </Row>
          <SpaceStyled top={10}>
            <Row>
              <Col span={8}>
                <SpaceStyled left={5}>
                  <RSelect
                    onChange={(e) => {
                      setLegalPeople(e);
                    }}
                    noOptionsMessage={() => "یافت نشد"}
                    placeholder={"جست و جو در اشخاص..."}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={reportingFilterData.legalPeople}
                  />
                </SpaceStyled>
              </Col>
              <Col span={8}>
                <SpaceStyled left={5}>
                  <RSelect
                    onChange={(e) => {
                      setPeople(e);
                    }}
                    noOptionsMessage={() => "یافت نشد"}
                    placeholder={"جست و جو در اشخاص..."}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={reportingFilterData.people}
                  />
                </SpaceStyled>
              </Col>
              <Col span={8}>
                <SpaceStyled left={5}>
                  <RSelect
                    onChange={(e) => {
                      setApplicants(e);
                    }}
                    noOptionsMessage={() => "یافت نشد"}
                    placeholder={"جست و جو در گیرنده ها..."}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={reportingFilterData.applicant}
                  />
                </SpaceStyled>
              </Col>
              <Col span={8}>
                <SpaceStyled left={5}>
                  <Select defaultValue="null" style={{ width: "100%" }}>
                    <Select.Option value="null"> بر اساس</Select.Option>
                    <Select.Option value="-1">صعودی</Select.Option>
                    <Select.Option value="1">نزولی</Select.Option>
                  </Select>
                  {/* <select
                className="custom-select mx-1"
                onChange={(e) => {
                  console.log(e.target.value);
                  setIsDes(Number(e.target.value));
                }}
              >
                <option value={undefined} name={undefined}></option>
                <option value={"-1"} name={"-1"}></option>
                <option value={"1"} name={"1"}>
                  نزولی
                </option>
              </select> */}
                </SpaceStyled>
              </Col>
              <Col span={8}>
                <SpaceStyled left={5}>
                  <PersianDatePickerComponent
                    value={startDate}
                    onSelect={(moment) => {
                      const miladiDate = moment.format("MM/DD/YYYY");
                      const persianDate = moment.format("jYYYY/jMM/jDD");
                      console.log(persianDate);
                      console.log(miladiDate);
                      setStartDate(moment);
                    }}
                  />
                </SpaceStyled>
              </Col>
              <Col span={8}>
                <SpaceStyled>
                  <PersianDatePickerComponent
                    value={endDate}
                    onSelect={(moment) => {
                      const miladiDate = moment.format("MM/DD/YYYY");
                      const persianDate = moment.format("jYYYY/jMM/jDD");
                      console.log(persianDate);
                      console.log(miladiDate);
                      setEndDate(moment);
                    }}
                  />
                </SpaceStyled>
              </Col>
            </Row>
          </SpaceStyled>
          <div className={"row mb-4"}>
            <div className={"col-lg-3"}>
              <label htmlFor="validationCustom04">وضعیت پرونده</label>
              <select
                className="custom-select mx-1"
                onChange={(e) => {
                  setFileStatus(
                    e.target.value === "وضعیت پرونده"
                      ? undefined
                      : e.target.value
                  );
                }}
              >
                <option value={undefined} name={undefined}>
                  وضعیت پرونده
                </option>
                <option value={"جاری"} name={"جاری"}>
                  جاری
                </option>
                <option value={"نیمه جاری"} name={"نیمه جاری"}>
                  نیمه جاری
                </option>
                <option value={"به کل محرمانه"} name={"به کل محرمانه"}>
                  به کل محرمانه
                </option>
              </select>
            </div>
            <div className={"col-lg-3"}>
              <label htmlFor="validationCustom04">نوع پرونده</label>
              <select
                className="custom-select mx-1"
                onChange={(e) => {
                  setType(
                    e.target.value === "نوع پرونده" ? undefined : e.target.value
                  );
                }}
              >
                <option value={undefined} name={undefined}>
                  نوع پرونده
                </option>
                <option value={"عادی"} name={"عادی"}>
                  عادی
                </option>
                <option value={"محرمانه"} name={"محرمانه"}>
                  محرمانه
                </option>
                <option value={"به کل محرمانه"} name={"به کل محرمانه"}>
                  به کل محرمانه
                </option>
              </select>
            </div>
          </div>
          <div className={" align-right text-right"}>
            <button
              className="btn btn-primary waves-effect waves-light mb-3 align-right text-right"
              onClick={getReportingFile}
            >
              <i className="fas fa-file-excel font-size-16 align-middle mr-2"></i>{" "}
              دریافت خروجی excel
            </button>
          </div>
          <ReportingTableComponent
            sortBy={sortBy}
            files={reporting.files}
            setSortBy={setSortBy}
          />
          <PagingComponent
            handlePaging={handlePaging}
            pageId={reporting.pageId}
            eachPerPage={reporting.eachPerPage}
            total={reporting.total}
          />
        </CustomCard>
      </Col>
    </Row>
  );
};
export default ReportingRootComponent;
