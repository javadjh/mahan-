import React, { useState } from "react";
import { Col, Row, Table } from "antd";
import { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
ChartJS.register(ArcElement, Tooltip, Legend);
const FileStatisticComponent = () => {
  const fileStatistic = useSelector((state) => state.fileStatistic);
  const [optionChart, setOptionChart] = useState({});
  useEffect(() => {
    initChart();
  }, []);
  const initChart = () => {
    const labels = [];
    const values = [];
    fileStatistic.chartEx.map((f) => {
      labels.push(f.ex);
      values.push(f.value);
    });
    setOptionChart({
      labels,
      datasets: [
        {
          label: "# of Votes",
          data: values,
          backgroundColor: [
            "rgba(198, 40, 40)",
            "rgba(173, 20, 87 )",
            "rgba(106, 27, 154)",
            "rgba(69, 39, 160 )",
            "rgba(40, 53, 147)",
            "rgba(21, 101, 192)",
          ],
          borderColor: [
            "rgba(13, 71, 161)",
            "rgba(194, 24, 91)",
            "rgba(123, 31, 162)",
            "rgba(81, 45, 168)",
            "rgba(48, 63, 159)",
            "rgba(25, 118, 210)",
          ],
          borderWidth: 0,
        },
      ],
    });
  };

  const columns = [
    {
      title: "شماره",
      key: "index",
      render: (item, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "فرمت",
      key: "ex",
      dataIndex: "ex",
    },
    {
      title: "حجم",
      key: "size",
      dataIndex: "size",
    },
    {
      title: "تعداد",
      key: "value",
      dataIndex: "value",
    },
    {
      title: "درصد",
      key: "percentage",
      dataIndex: "percentage",
    },
  ];

  return (
    <>
      {optionChart.labels ? (
        <Row>
          <Col span={10}>
            <Pie data={optionChart} />
          </Col>
          <Col span={14}>
            <Table
              columns={columns}
              dataSource={fileStatistic.chartEx}
              pagination={false}
            />
          </Col>
        </Row>
      ) : null}
    </>
  );
};
export default FileStatisticComponent;
