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
  const docs = [{ uri: "http://localhost:5000/1.pdf" }];
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
      console.log(f);
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
      console.log(f);
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
  let pdf = "http://localhost:5000/62d0a491df63a81dfc99fb58.pdf";

  return (
    <StickyContainer>
      <PdfPreviewComponent />
      <MainLayout title={"داشبورد"} isMain={true}>
        {/*<embed src={'http://www.africau.edu/images/default/sample.pdf'} type="application/pdf"/>*/}
        {/*<iframe src={pdf} title="testPdf" height="100%" width="100%" />*/}

        <div className={"row mx-1"}>
          <div className={"col-lg-5"}>
            <div className={"card card-body"}>
              <div className={"row"}>
                <div className={"col-lg-4"}>
                  <p>
                    <b style={{ fontSize: 15 }}>اسناد در یک نگاه</b>
                  </p>
                  <p className={"my-1"}>
                    <b> تعداد اسناد : </b>
                    {adminDashboard.totalDocuments}
                  </p>
                  <p className={"my-1"}>
                    <b>تعداد اسناد کازیو : </b>
                    {adminDashboard.totalLibrariesDocument}
                  </p>
                  <p className={"my-1"}>
                    <b> حجم اسناد : </b>
                    <span dir={"ltr"}>{adminDashboard.totalSize}</span>
                  </p>
                </div>
                <div className={"col-lg-4"}>
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
                </div>
                <div className={"col-lg-4"}>
                  <p>
                    <b style={{ fontSize: 15 }}>حجم اسناد به تفکیک</b>
                  </p>
                  <p className={"my-1"}>
                    <b>آمار امروز : </b>
                    <span dir={"ltr"}>{adminDashboard.totalTodaySize}</span>
                  </p>
                  <p className={"my-1"}>
                    <b>آمار 7 روز قبل : </b>
                    <span dir={"ltr"}>{adminDashboard.total7DaySize}</span>
                  </p>
                  <p className={"my-1"}>
                    <b>آمار 30 روز قبل : </b>
                    <span dir={"ltr"}>{adminDashboard.total30DaySize}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className={"card card-body"}>
              <div className={"col-lg-13"}>
                <>
                  <h6
                    onClick={() => {
                      window.$("#updateAppSettingDialog").modal("show");
                    }}
                  >
                    پرونده های سامانه
                  </h6>
                  {pieData.labels ? (
                    <div className={"col-lg-13"}>
                      <div className={"mx-5"}>
                        <div className={"mx-4"}>
                          <Pie type={"pie"} data={pieData} />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </>
              </div>
            </div>
          </div>
          <div className={"col-lg-5"}>
            <div className={"card card-body "}>
              <div className={"row"}>
                <div className={"col-lg-4"}>
                  <p>
                    <b style={{ fontSize: 15 }}>پرونده در یک نگاه</b>
                  </p>
                  <p className={"my-1"}>
                    <b> تعداد پرونده : </b>
                    {adminDashboard.totalFileCount}
                  </p>
                  <p className={"my-1"}>
                    <b>پرونده های در انتظار : </b>
                    {adminDashboard.totalWaitingForConfirmCount}
                  </p>
                  <p className={"my-1"}>
                    <b> پرونده های رد شده : </b>
                    {adminDashboard.totalFileRejectCount}
                  </p>
                </div>
                <div className={"col-lg-4"}>
                  <p>
                    <b style={{ fontSize: 15 }}>تعداد پرونده به تفکیک</b>
                  </p>
                  <p className={"my-1"}>
                    <b>آمار امروز : </b>
                    {adminDashboard.fileTodayCount}
                  </p>
                  <p className={"my-1"}>
                    <b>آمار 7 روز پیش : </b>
                    {adminDashboard.file7DaysCount}
                  </p>
                  <p className={"my-1"}>
                    <b>آمار 30 روز پیش : </b>
                    {adminDashboard.file30DaysCount}
                  </p>
                </div>
                <div className={"col-lg-4"}>
                  <p>
                    <b style={{ fontSize: 15 }}>نوع پرونده ها</b>
                  </p>
                  <p className={"my-1"}>
                    <b>پرونده مختومه : </b>
                    {adminDashboard.makhtomeCount}
                  </p>
                  <p className={"my-1"}>
                    <b>پرونده نیمه جاری : </b>
                    {adminDashboard.nimeJari}
                  </p>
                  <p className={"my-1"}>
                    <b>پرونده جاری : </b>
                    {adminDashboard.jari}
                  </p>
                </div>
              </div>
            </div>
            <div className={"card card-body"}>
              <div className={"col-lg-13"}>
                <>
                  <h6>تعداد پرونده های ایجاد شده در 7 روز اخیر</h6>
                  {pieData.labels ? (
                    <Bar
                      height={200}
                      options={options}
                      data={verticalData}
                      type={"bar"}
                    />
                  ) : null}
                </>
              </div>
            </div>
          </div>
          <div className={"col-lg-2"}>
            <div className={"card"}>
              <h6 className={"p-2"}>پنج پرونده ی اخیر</h6>
              {adminDashboard.lastFileName.map((f, index) => (
                <div
                  className={"mb-2 px-2"}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                  }}
                >
                  <p className={"p-0 m-0"}>• {f.title}</p>
                  <p className={"align-right text-right p-0 m-0"}>
                    {f.createDate}
                  </p>
                </div>
              ))}
            </div>
            <div className={"card card-body"}>
              <h6>تعداد پرونده بایگانی ها</h6>
              {adminDashboard.archives.map((a) => (
                <div className={"my-1"}>
                  <span>• </span>
                  <span>{a.title}</span>
                  <span>({a.fileCount})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    </StickyContainer>
  );
};
export default UsersDashboardRoot;
