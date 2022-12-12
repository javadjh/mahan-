import { Image } from "antd";
import React, { useContext } from "react";
import ReactTooltip from "react-tooltip";
import { grayColor } from "../../app/appColor";
import { FRONT_IP } from "../../config/ip";
import { FileContext } from "../../context/file/FileContext";
import CustomEXShower from "../../styled/components/CustomEXShower";
import CustomText from "../../styled/components/CustomText";
import {
  CenterStyled,
  CenterVerticalStyled,
  SpaceStyled,
} from "../../styled/global";
import { fileNameToEX } from "../../utility/global";
const FilesUploadedComponent = () => {
  const { images, uploadedFile, canUpload } = useContext(FileContext);
  return (
    <>
      {!canUpload ? (
        <div>
          <div
            style={{
              minHeight: "30vh",
              borderRadius: 12,
              margin: 40,
              background: "rgba(230, 237, 241, 0.24)",
              border: "1.2px dashed #DDE6ED",
              borderRadius: 6,
            }}
          >
            <div style={{ width: "100%", height: "100%" }}>
              {images?.length > 0 || uploadedFile?.length > 0 ? (
                <>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <>
                      {uploadedFile?.map((u) => (
                        <>
                          <span
                            style={{
                              flexWrap: "wrap",
                              width: 100,
                              height: 100,
                              marginTop: 5,
                              marginBottom: 30,
                              marginRight: 5,
                              marginLeft: 5,
                              backgroundColor: "rgba(0,0,0,0.3)",
                              padding: 5,
                              borderRadius: 10,
                              position: "relative",
                            }}
                          >
                            <img
                              style={{
                                objectFit: "cover",
                                borderRadius: 7,
                                zIndex: -1,
                                opacity: "0.5",
                              }}
                              width={90}
                              height={90}
                              src={"/assets/icons/paper.svg"}
                            />
                            <p style={{ width: 100 }} className={"text-center"}>
                              <span data-tip={u.title}>
                                {u.title.substr(0, 10)}
                              </span>
                              <ReactTooltip />
                            </p>
                            <span
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                              }}
                            >
                              <Image
                                style={{
                                  objectFit: "cover",
                                  borderRadius: 7,
                                }}
                                width={40}
                                preview={false}
                                src={"/assets/icons/check.svg"}
                              />
                            </span>
                          </span>
                        </>
                      ))}
                      {images?.map((i, index) => (
                        <>
                          <span
                            style={{
                              flexWrap: "wrap",
                              width: 100,
                              height: 100,
                              marginTop: 5,
                              marginBottom: 30,
                              marginRight: 5,
                              marginLeft: 5,
                              padding: 5,
                              borderRadius: 10,
                              position: "relative",
                            }}
                          >
                            <CenterStyled>
                              <CustomEXShower ex={fileNameToEX(i.title)} />
                            </CenterStyled>
                            <CenterStyled>
                              <p
                                style={{ width: 100 }}
                                className={"text-center"}
                              >
                                <span data-tip={i.title}>
                                  {i.title.substr(0, 10)}
                                </span>
                                <ReactTooltip />
                              </p>
                            </CenterStyled>
                            {index === 0 ? (
                              <span
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                }}
                              >
                                <div className="lds-roller">
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                </div>
                              </span>
                            ) : null}
                          </span>
                        </>
                      ))}
                    </>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "30vh",
                  }}
                >
                  <CenterVerticalStyled>
                    <CenterStyled>
                      <Image
                        src="/assets/icons/upload.svg"
                        width={100}
                        height={100}
                        preview={false}
                      />
                      <SpaceStyled top={20}>
                        <CenterStyled>
                          <CustomText color="black" size={17}>
                            فایل را اینجا رها کنید
                          </CustomText>
                          <CustomText color={grayColor} size={14}>
                            انتخاب فایل یا فایل را اینجا رها کنید
                          </CustomText>
                        </CenterStyled>
                      </SpaceStyled>
                    </CenterStyled>
                  </CenterVerticalStyled>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default FilesUploadedComponent;
