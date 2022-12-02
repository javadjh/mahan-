import React, { useEffect, useState } from "react";
import PagingComponent from "../utility/PagingComponent";
import MainLayout from "../RootComponent/MainLayout";
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
import { CenterVerticalStyled, SpaceStyled } from "../styled/global";
import PeopleSelectorComponent from "../components/share/PeopleSelectorComponent";
import LegalPeopleSelectorComponent from "../components/share/LegalPeopleSelectorComponent";
import ApplicantsSelectorComponent from "../components/share/ApplicantsSelectorComponent";
import CustomButton from "../styled/components/CustomButton";
import { orangeColor } from "../app/appColor";
import ReportTableComponent from "../components/report/ReportTableComponent";

const animatedComponents = makeAnimated();
const ReportingRootComponent = () => {
  const dispatch = useDispatch();
  const reporting = useSelector((state) => state.reporting);
  const reportingFilterData = useSelector((state) => state.reportingFilterData);
  const [pageId, setPageId] = useState(1);
  const [legalPeople, setLegalPeople] = useState();
  const [people, setPeople] = useState();
  const [applicants, setApplicants] = useState();
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
    await dispatch(
      getReportingAction({
        pageId,
        eachPerPage: 12,
        legalPeople,
        people,
        applicants,
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
    const { data, status } = await getReportingFilterFileService({
      pageId,
      eachPerPage: 12,
      legalPeople,
      people,
      applicants,
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
          <SpaceStyled top={10}>
            <Row>
              <Col span={8}>
                <SpaceStyled left={7} bottom={7}>
                  <LegalPeopleSelectorComponent
                    onLegalPersonSelect={(value) => setLegalPeople(value)}
                  />
                </SpaceStyled>
              </Col>
              <Col span={8}>
                <SpaceStyled left={7} bottom={7}>
                  <PeopleSelectorComponent
                    onPersonSelect={(value) => setPeople(value)}
                  />
                </SpaceStyled>
              </Col>
              <Col span={8}>
                <SpaceStyled left={7} bottom={7}>
                  <ApplicantsSelectorComponent
                    onApplicantSelect={(e) => setApplicants(e)}
                  />
                </SpaceStyled>
              </Col>
              <Col span={8}>
                <SpaceStyled left={7} bottom={7}>
                  <Select defaultValue="null" style={{ width: "100%" }}>
                    <Select.Option value="null"> بر اساس</Select.Option>
                    <Select.Option value="-1">صعودی</Select.Option>
                    <Select.Option value="1">نزولی</Select.Option>
                  </Select>
                  {/* <select
                className="custom-select mx-1"
                onChange={(e) => {
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
                <SpaceStyled left={7} bottom={7}>
                  <PersianDatePickerComponent
                    value={startDate}
                    onSelect={(moment) => {
                      const miladiDate = moment.format("MM/DD/YYYY");
                      const persianDate = moment.format("jYYYY/jMM/jDD");

                      setStartDate(moment);
                    }}
                  />
                </SpaceStyled>
              </Col>
              <Col span={8}>
                <SpaceStyled bottom={7} left={7}>
                  <PersianDatePickerComponent
                    value={endDate}
                    onSelect={(moment) => {
                      const miladiDate = moment.format("MM/DD/YYYY");
                      const persianDate = moment.format("jYYYY/jMM/jDD");

                      setEndDate(moment);
                    }}
                  />
                </SpaceStyled>
              </Col>
              <Col span={8}>
                <SpaceStyled bottom={7} left={7}>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="وضعیت پرونده"
                    onChange={(e) => {
                      setFileStatus(e === "وضعیت پرونده" ? undefined : e);
                    }}
                  >
                    <Select.Option value={"وضعیت پرونده"} name={"وضعیت پرونده"}>
                      وضعیت پرونده
                    </Select.Option>
                    <Select.Option value={"جاری"} name={"جاری"}>
                      جاری
                    </Select.Option>
                    <Select.Option value={"نیمه جاری"} name={"نیمه جاری"}>
                      نیمه جاری
                    </Select.Option>
                    <Select.Option
                      value={"به کل محرمانه"}
                      name={"به کل محرمانه"}
                    >
                      به کل محرمانه
                    </Select.Option>
                  </Select>
                </SpaceStyled>
              </Col>
              <Col span={8}>
                <SpaceStyled bottom={7} left={7}>
                  <Select
                    placeholder="نوع پرونده"
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setType(e === "نوع پرونده" ? undefined : e);
                    }}
                  >
                    <Select.Option value={"نوع پرونده"} name={"نوع پرونده"}>
                      نوع پرونده
                    </Select.Option>
                    <Select.Option value={"عادی"} name={"عادی"}>
                      عادی
                    </Select.Option>
                    <Select.Option value={"محرمانه"} name={"محرمانه"}>
                      محرمانه
                    </Select.Option>
                    <Select.Option
                      value={"به کل محرمانه"}
                      name={"به کل محرمانه"}
                    >
                      به کل محرمانه
                    </Select.Option>
                  </Select>
                </SpaceStyled>
              </Col>
              <Col span={8} align={"middle"}>
                <CenterVerticalStyled style={{ width: "100%" }}>
                  <SpaceStyled bottom={7} left={7} style={{ width: "100%" }}>
                    <CustomButton
                      color={orangeColor}
                      onClick={getReportingFile}
                    >
                      دریافت خروجی excel
                    </CustomButton>
                  </SpaceStyled>
                </CenterVerticalStyled>
              </Col>
            </Row>
          </SpaceStyled>

          <SpaceStyled top={20}>
            <ReportTableComponent
              sortBy={sortBy}
              files={reporting.files}
              setSortBy={setSortBy}
              pageId={reporting.pageId}
              eachPerPage={reporting.eachPerPage}
              total={reporting.total}
              setPageId={setPageId}
            />
          </SpaceStyled>
        </CustomCard>
      </Col>
    </Row>
  );
};
export default ReportingRootComponent;
