import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../RootComponent/MainLayout";
import { StickyContainer, Sticky } from "react-sticky";
import { getAdminDashboardAction } from "../stateManager/actions/UsersAction";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import PdfPreviewComponent from "../dialog/PdfPreviewComponent";
import { Col, Row } from "antd";
import CustomCard from "../styled/components/CustomCard";
import { SpaceStyled } from "../styled/global";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "",
    },
  },
};

const UsersDashboardRoot = () => {
  const dispatch = useDispatch();
  const [pieData, setPieData] = useState({});
  const [verticalData, setVerticalData] = useState({});
  const usersDashboard = useSelector((state) => state.usersDashboard);
  const adminDashboard = useSelector((state) => state.adminDashboard);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await dispatch(getAdminDashboardAction());
  };

  useEffect(() => {
    initChart();
  }, [adminDashboard]);

  const initChart = () => {
    //pie chart
    let pieLabel = [];
    let pieValues = [];
    adminDashboard.fileType.map((f) => {
      pieLabel.push(f.label);
      pieValues.push(f.value);
    });
    setPieData({
      labels: pieLabel,
      datasets: [
        {
          label: "# of Votes",
          data: pieValues,
          backgroundColor: [
            "rgb(243,188,0)",
            "rgb(0,175,130)",
            "rgb(0,117,164)",
          ],
          borderColor: [
            "rgb(255,255,255)",
            "rgb(255,255,255)",
            "rgb(255,255,255)",
          ],
          borderWidth: 5,
        },
      ],
    });

    //vertical chart
    let verticalLabel = [];
    let verticalValues = [];
    adminDashboard.fileUpload7DaysAgo.map((f) => {
      verticalLabel.push(f.label);
      verticalValues.push(f.value);
    });
    setVerticalData({
      labels: verticalLabel,
      datasets: [
        {
          label: "تعداد",
          data: verticalValues,
          backgroundColor: "rgb(0,117,164)",
        },
      ],
    });
  };

  return (
    <StickyContainer>
      <Row>
        <Col span={9}>
          <SpaceStyled left={10} bottom={10}>
            <CustomCard>
              <Row>
                <Col span={12}>
                  <p>
                    <b style={{ fontSize: 15 }}>اسناد در یک نگاه</b>
                  </p>
                  <p>
                    <b> تعداد اسناد : </b>
                    {adminDashboard.totalDocuments}
                  </p>
                  <p>
                    <b>تعداد اسناد کازیو : </b>
                    {adminDashboard.totalLibrariesDocument}
                  </p>
                  <p>
                    <b> حجم اسناد : </b>
                    <span dir={"ltr"}>{adminDashboard.totalSize}</span>
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    <b style={{ fontSize: 15 }}>تعداد اسناد به تفکیک</b>
                  </p>
                  <p className={"my-1"}>
                    <b>آمار امروز : </b>
                    {adminDashboard.totalTodayDocuments}
                  </p>
                  <p className={"my-1"}>
                    <b>آمار 7 روز قبل : </b>
                    {adminDashboard.last7DayDocuments}
                  </p>
                  <p className={"my-1"}>
                    <b>آمار 30 روز قبل : </b>
                    {adminDashboard.last30DayDocuments}
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    <b style={{ fontSize: 15 }}>حجم اسناد به تفکیک</b>
                  </p>
                  <p>
                    <b>آمار امروز : </b>
                    <span dir={"ltr"}>{adminDashboard.totalTodaySize}</span>
                  </p>
                  <p>
                    <b>آمار 7 روز قبل : </b>
                    <span dir={"ltr"}>{adminDashboard.total7DaySize}</span>
                  </p>
                  <p>
                    <b>آمار 30 روز قبل : </b>
                    <span dir={"ltr"}>{adminDashboard.total30DaySize}</span>
                  </p>
                </Col>
              </Row>
            </CustomCard>
          </SpaceStyled>
          <SpaceStyled left={10} bottom={10}>
            <CustomCard>
              <h3>پرونده های سامانه</h3>
              {pieData.labels ? <Pie type={"pie"} data={pieData} /> : null}
            </CustomCard>
          </SpaceStyled>
        </Col>
        <Col span={9}>
          <SpaceStyled left={10} bottom={10}>
            <CustomCard>
              <Row>
                <Col span={12}>
                  <p>
                    <b style={{ fontSize: 15 }}>پرونده در یک نگاه</b>
                  </p>
                  <p>
                    <b> تعداد پرونده : </b>
                    {adminDashboard.totalFileCount}
                  </p>
                  <p>
                    <b>پرونده های در انتظار : </b>
                    {adminDashboard.totalWaitingForConfirmCount}
                  </p>
                  <p>
                    <b> پرونده های رد شده : </b>
                    {adminDashboard.totalFileRejectCount}
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    <b style={{ fontSize: 15 }}>تعداد پرونده به تفکیک</b>
                  </p>
                  <p>
                    <b>آمار امروز : </b>
                    {adminDashboard.fileTodayCount}
                  </p>
                  <p>
                    <b>آمار 7 روز پیش : </b>
                    {adminDashboard.file7DaysCount}
                  </p>
                  <p>
                    <b>آمار 30 روز پیش : </b>
                    {adminDashboard.file30DaysCount}
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    <b style={{ fontSize: 15 }}>نوع پرونده ها</b>
                  </p>
                  <p>
                    <b>پرونده مختومه : </b>
                    {adminDashboard.makhtomeCount}
                  </p>
                  <p>
                    <b>پرونده نیمه جاری : </b>
                    {adminDashboard.nimeJari}
                  </p>
                  <p>
                    <b>پرونده جاری : </b>
                    {adminDashboard.jari}
                  </p>
                </Col>
              </Row>
            </CustomCard>
          </SpaceStyled>
          <SpaceStyled left={10} bottom={10}>
            <CustomCard>
              <Col span={24}>
                <>
                  <h3>تعداد پرونده های ایجاد شده در 7 روز اخیر</h3>
                  {pieData.labels ? (
                    <Bar
                      height={200}
                      options={options}
                      data={verticalData}
                      type={"bar"}
                    />
                  ) : null}
                </>
              </Col>
            </CustomCard>
          </SpaceStyled>
        </Col>
        <Col span={6}>
          <CustomCard>
            <h6>پنج پرونده ی اخیر</h6>
            {adminDashboard.lastFileName.map((f, index) => (
              <div
                style={{
                  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                }}
              >
                <p>• {f.title}</p>
                <p>{f.createDate}</p>
              </div>
            ))}
          </CustomCard>
          <CustomCard>
            <h3>تعداد پرونده بایگانی ها</h3>
            {adminDashboard.archives.map((a) => (
              <div>
                <span>• </span>
                <span>{a.title}</span>
                <span>({a.fileCount})</span>
              </div>
            ))}
          </CustomCard>
        </Col>
      </Row>
    </StickyContainer>
  );
};
export default UsersDashboardRoot;
