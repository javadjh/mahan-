import React, { Fragment, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiDownloadCloud } from "react-icons/fi";
import ReactPlayer from "react-player";
import {
  getDocumentFileService,
  insertDocumentService,
} from "../../service/DocumentService";
import {
  addVideoFlagAction,
  removeVideoFlagAction,
  setManualDocumentAction,
} from "../../stateManager/actions/DocumentAction";
import { doneToast, errorToast } from "../../utility/ShowToast";
import ImageCropComponent from "../document/imageCroper/ImageCropComponent";
import MP4PlayerComponent from "../document/MP4Player/MP4PlayerComponent";
import ReactTooltip from "react-tooltip";

import axios from "axios";
import { Col, Collapse, Form, Input, Modal, Row, Spin } from "antd";
import { LoopCircleLoading } from "react-loadingg";

import { RootContext } from "../../RootComponent/RootContext";
import { FileContext } from "../../context/file/FileContext";
import PDFViewerComponent from "../../newFile/document/PDFViewerComponent";
import {
  CenterStyled,
  CenterVerticalStyled,
  CustomCursor,
  SpaceStyled,
} from "../../styled/global";
import {
  borderColor,
  darkBlueOpacityColor,
  lightBackgroundColor,
  lightBlueColor,
  redColor,
} from "../../app/appColor";
import CustomText from "../../styled/components/CustomText";
import CustomButton from "../../styled/components/CustomButton";
import { maxForm, minForm, requiredForm } from "../../config/formValidator";
import { convertToJalali } from "../../utility/dateUtil";
import { SERVER_IP } from "../../config/ip";
import Auth from "../../auth/Auth";
import { DocumentContext } from "../../context/document/DocumentContext";

const ShowSingleDocumentDialog = ({ doc, isLoaded, previewUrl }) => {
  // const { isLoaded, previewUrl } = useContext(DocumentContext);
  const dispatch = useDispatch();

  const addNewFlagHandle = async (startSecond, endSecond, description) => {
    if (description.length < 2) {
      errorToast("توضیح را وارد کنید");
      return false;
    }
    await dispatch(
      addVideoFlagAction({
        startSecond,
        endSecond,
        description,
        documentId: doc._id,
      })
    );
    return true;
  };
  const deleteFlagHandle = async (flagId) => {
    await dispatch(removeVideoFlagAction(doc._id, flagId));
  };

  return (
    <Fragment style={{ zIndex: 8000 }}>
      {isLoaded ? (
        <Row>
          {/* <Col
            span={7}
            style={{
              backgroundColor: lightBackgroundColor,
              borderRadius: 10,
            }}
          >
            <div>
              <Form
                onFinish={async ({ note }) => {
                  let newNote = await addNewNoteForDocument(note, doc._id);
                  setNotes(newNote.notes);
                }}
              >
                <Auth accessList={["ویرایش سند"]}>
                  <SpaceStyled vertical={10} horizontal={10}>
                    <Form.Item
                      name={"note"}
                      rules={[requiredForm, minForm(2), maxForm(500)]}
                    >
                      <Input.TextArea placeholder="یادداشت وارد کنید" />
                    </Form.Item>
                  </SpaceStyled>
                  <SpaceStyled vertical={10} horizontal={10}>
                    <CustomButton htmlType="submit">ثبت</CustomButton>
                  </SpaceStyled>
                </Auth>

                {notes?.map((n) => (
                  <SpaceStyled vertical={10} horizontal={10}>
                    <Collapse accordion>
                      <Collapse.Panel
                        header={`توسط : ${n.userFullName} - ${convertToJalali(
                          n.createDate
                        )}`}
                        key="1"
                      >
                        <p>{n.description}</p>
                        <Auth accessList={["ویرایش سند"]}>
                          <CustomText
                            color={redColor}
                            onClick={async () => {
                              let note = await removeNoteFromDocument(
                                n._id,
                                doc._id
                              );
                              setNotes(note.notes);
                            }}
                          >
                            حذف
                          </CustomText>
                        </Auth>
                      </Collapse.Panel>
                    </Collapse>
                  </SpaceStyled>
                ))}
              </Form>
            </div>
          </Col> */}
          <Col span={24}>
            <SpaceStyled right={10}>
              {previewUrl && doc.ex ? (
                <>
                  {doc.ex === "png" ||
                  doc.ex === "jpg" ||
                  doc.ex === "PNG" ||
                  doc.ex === "jpge" ? (
                    <>
                      <ImageCropComponent
                        ex={doc.ex}
                        title={doc.title + "." + doc.ex}
                        documentId={doc._id}
                        imageHeight={doc.imageHeight}
                        documentSize={doc.documentSize}
                        imageWidth={doc.imageWidth}
                      />
                    </>
                  ) : doc.ex.toLowerCase() === "mp4" ||
                    doc.ex.toLowerCase() === "mkv" ||
                    doc.ex.toLowerCase() === "wmv" ? (
                    <>
                      <CenterStyled>
                        <a
                          href={`${SERVER_IP}/${previewUrl}`}
                          target="_blank"
                          download={true}
                        >{`دریافت سند`}</a>
                      </CenterStyled>
                      <MP4PlayerComponent
                        doc={doc}
                        deleteFlagHandle={deleteFlagHandle}
                        url={`${SERVER_IP}/${previewUrl}`}
                        addNewFlagHandle={addNewFlagHandle}
                      />
                    </>
                  ) : doc.ex === "txt" ? (
                    <>
                      <pre>{doc.txt}</pre>
                    </>
                  ) : doc.ex === "pdf" ||
                    doc.ex === "docx" ||
                    doc.ex === "xlsm" ||
                    doc.ex === "xlsx" ? (
                    <>
                      <CenterStyled>
                        <a
                          href={`${SERVER_IP}/${previewUrl}`}
                          target="_blank"
                          download={true}
                        >{`دریافت سند`}</a>
                      </CenterStyled>
                      <PDFViewerComponent previewUrl={previewUrl} />
                    </>
                  ) : (
                    <div
                      style={{ width: "100%", height: "300px" }}
                      className={"text-center mt-5"}
                    >
                      <CustomCursor>
                        <a
                          href={`${SERVER_IP}/${previewUrl}`}
                          target="_blank"
                          download={true}
                        >
                          <CenterVerticalStyled>
                            <CenterStyled>
                              <FiDownloadCloud
                                style={{ fontSize: 150, color: lightBlueColor }}
                              />
                              <CustomText>دریافت سند</CustomText>
                            </CenterStyled>
                          </CenterVerticalStyled>
                        </a>
                      </CustomCursor>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Spin />
                </>
              )}
            </SpaceStyled>
          </Col>
        </Row>
      ) : (
        <CenterStyled>
          <Spin />
        </CenterStyled>
      )}
    </Fragment>
  );
};
export default ShowSingleDocumentDialog;
