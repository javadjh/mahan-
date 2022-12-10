import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { WaterMark } from "@ant-design/pro-components";
import { FileContext } from "../../context/file/FileContext";
import { Document, Page, pdfjs } from "react-pdf";
import CustomText from "../../styled/components/CustomText";
import { Col, Input, Row } from "antd";
import CustomButton from "../../styled/components/CustomButton";
import { darkBlueColor } from "../../app/appColor";
import { CenterStyled, SpaceStyled } from "../../styled/global";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const PDFViewerComponent = ({ previewUrl, watermark }) => {
  const { fileStatistic } = useContext(FileContext);
  const [file, setFile] = useState("");
  let [isLoad, setIsLoad] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [numPagesInput, setNumPagesInput] = useState(pageNumber);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(parseInt(numPages));
    setPageNumber(1);
  };
  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    } else {
      setPageNumber(1);
    }
  };
  useEffect(() => {
    if (previewUrl) {
      axios(`http://localhost:5000/${previewUrl}`, {
        method: "GET",
        withCredentials: false,
        responseType: "blob",
        header: {
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
        const file = new Blob([response.data], { type: "application/pdf" });
        setFile(file);
        setTimeout(() => {
          setIsLoad(true);
        }, 500);
      });
    }
  }, [previewUrl]);
  return (
    <>
      {isLoad && (
        <div style={{ width: "680px !important" }}>
          {file ? (
            <React.Fragment>
              <div>
                <div>
                  <Row
                    align="middle"
                    justify="space-between"
                    style={{ width: "100%" }}
                  >
                    <Col>
                      <CustomText color={darkBlueColor}>
                        صفحه {pageNumber} از {numPages}
                      </CustomText>
                    </Col>
                    <Col>
                      <Row
                        align="middle"
                        justify="center"
                        style={{
                          backgroundColor: "#e5e5e5",
                          padding: 10,
                          borderRadius: 5,
                          margin: 0,
                        }}
                      >
                        <Col>
                          {pageNumber > 1 && (
                            <CustomText
                              color={darkBlueColor}
                              style={{ cursor: "pointer", margin: 0 }}
                              onClick={handlePrevPage}
                            >
                              قبلی /
                            </CustomText>
                          )}
                        </Col>
                        <Col>
                          {pageNumber < numPages && (
                            <CustomText
                              color={darkBlueColor}
                              style={{ cursor: "pointer", margin: 0 }}
                              onClick={handleNextPage}
                            >
                              بعدی
                            </CustomText>
                          )}
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row align="middle">
                        <Col>
                          <Input
                            value={numPagesInput}
                            type={"number"}
                            onChange={(e) => {
                              if (Number(e.target.value) > numPages) return;
                              setNumPagesInput(Number(e.target.value));
                            }}
                            placeholder={"صفحه"}
                            style={{ width: 100 }}
                          />
                        </Col>
                        <Col>
                          <SpaceStyled right={10}>
                            <CustomButton
                              className={"btn btn-dark mx-2"}
                              onClick={() => {
                                setPageNumber(numPagesInput);
                              }}
                            >
                              برو
                            </CustomButton>
                          </SpaceStyled>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "#e5e5e5",
                  }}
                  className={"d-flex justify-content-center"}
                >
                  <WaterMark
                    fontColor={"rgba(0,0,0,0.42)"}
                    fontFamily={"primary-font"}
                    fontSize={30}
                    content={fileStatistic.archiveWatermark}
                  >
                    <CenterStyled>
                      <Document file={file} onLoadSuccess={onLoadSuccess}>
                        <CenterStyled>
                          <Page pageNumber={pageNumber} />
                        </CenterStyled>
                      </Document>
                    </CenterStyled>
                  </WaterMark>
                </div>
              </div>
            </React.Fragment>
          ) : null}
        </div>
      )}
    </>
  );
};
export default PDFViewerComponent;
