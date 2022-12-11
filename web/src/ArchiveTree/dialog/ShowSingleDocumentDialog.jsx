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

const ShowSingleDocumentDialog = ({ doc }) => {
  let [notes, setNotes] = useState(doc?.notes);
  const { addNewNoteForDocument, removeNoteFromDocument } =
    useContext(FileContext);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState();

  useEffect(() => {
    if (doc._id) onGetFileHandle(doc._id, doc.documentName, doc.ex);
  }, [doc]);

  const onGetFileHandle = async (id = "1", title, ex = undefined) => {
    setIsLoaded(false);
    // setIsFileDownloading(true);
    const { data, status } = await getDocumentFileService(
      id === "1" ? document._id : id
    );
    if (status === 200) {
      setIsLoaded(true);
      let filename;
      if (
        ex === "png" ||
        ex === "jpg" ||
        ex === "jpge" ||
        ex === "docx" ||
        ex === "xlsm" ||
        ex === "xlsx" ||
        ex === "txt" ||
        ex === "xlsx"
      ) {
        filename = `${title}.pdf`;
        if (id !== "1") {
          setPreviewUrl(id + ".pdf");
        }
      } else {
        filename = `${title}.${ex}`;
        if (id !== "1") {
          setPreviewUrl(id + "." + ex);
        }
      }
      // saveAs(`http://192.168.2.24:5000/${filename.includes(".pdf")?id + ".pdf":id+"."+ex}`, filename);

      // setIsFileDownloading(false);
    } else {
      // setIsFileDownloading(false);
    }
  };

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
          <Col
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
                      </Collapse.Panel>
                    </Collapse>
                  </SpaceStyled>
                ))}
              </Form>
            </div>
          </Col>
          <Col span={17}>
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
                          href={`http://192.168.2.24:5000/${previewUrl}`}
                          target="_blank"
                          download={true}
                        >{`دریافت سند`}</a>
                      </CenterStyled>
                      <MP4PlayerComponent
                        doc={doc}
                        deleteFlagHandle={deleteFlagHandle}
                        url={`http://192.168.2.24:5000/${previewUrl}`}
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
                          href={`http://192.168.2.24:5000/${previewUrl}`}
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
                          href={`http://192.168.2.24:5000/${previewUrl}`}
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
