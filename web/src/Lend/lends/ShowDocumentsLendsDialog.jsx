import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDocumentAction,
  getDocumentsAction,
} from "../../stateManager/actions/DocumentAction";
import PagingComponent from "../../utility/PagingComponent";
import { setLoadingAction } from "../../stateManager/actions/LoadingAction";
import { getDocumentFileService } from "../../service/DocumentService";
import saveAs from "file-saver";
const ShowDocumentsLendsDialog = ({ dialogData }) => {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.documents);
  const document = useSelector((state) => state.document);
  const [searchValue, setSearchValue] = useState("");
  const [previewUrl, setPreviewUrl] = useState();
  const [pageId, setPageId] = useState(1);
  const [singleDocument, setSingleDocument] = useState({});
  useEffect(() => {
    getData();
  }, [pageId, searchValue, dialogData]);

  useEffect(() => {
    if (singleDocument._id) getSingleDocument();
  }, [singleDocument]);

  useEffect(() => {
    if (previewUrl) saveAs(`http://192.168.2.24:5000/${previewUrl}`);
  }, [previewUrl]);

  const getSingleDocument = async () => {
    if (singleDocument._id)
      await dispatch(getDocumentAction(singleDocument._id));
  };

  const getData = () => {
    if (dialogData.isCompleteFile) {
      getCompleteFile();
    } else {
    }
  };

  const getCompleteFile = async () => {
    await dispatch(
      getDocumentsAction({
        pageId,
        eachPerPage: 12,
        searchValue,
        fileId: dialogData.fileId,
      })
    );
  };

  const handleDocPaging = (page) => {
    setPageId(page);
  };

  const onGetFileHandle = async (id = "1", title, ex = undefined) => {
    await dispatch(setLoadingAction(true));
    const { data, status } = await getDocumentFileService(
      id === "1" ? document._id : id
    );
    await dispatch(setLoadingAction(false));
    if (status === 200) {
      let filename;
      if (
        ex === "png" ||
        ex === "jpg" ||
        ex === "jpge" ||
        ex === "docx" ||
        ex === "xlsm" ||
        ex === "xlsx" ||
        ex === "txt"
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
    }
  };
  return (
    <Fragment>
      <div
        className="modal fade bs-example-modal-xl"
        id="showDocumentsLendsDialog"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content p-4">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              name={"documentName"}
              className="form-control"
              placeholder={"جستجو..."}
            />
            {singleDocument._id ? (
              <div
                className={"card my-3 shadow"}
                style={{ backgroundColor: "#efefef" }}
              >
                <div className={"card-body"}>
                  <div
                    className={"btn btn-dark my-1"}
                    onClick={() => {
                      onGetFileHandle(
                        singleDocument._id,
                        singleDocument.title,
                        singleDocument.ex
                      );
                    }}
                  >
                    {singleDocument.title} - (نسخه 1)
                  </div>
                  <h5>یادداشت ها</h5>
                  {singleDocument.notes.map((n) => (
                    <div>
                      <span className={"m-0 p-0"} style={{ width: "50%" }}>
                        {n.title}
                      </span>
                      <span className={"m-0 p-0"} style={{ width: "50%" }}>
                        {n.description}
                      </span>
                      <hr />
                    </div>
                  ))}
                  {document.versions.map((v) => (
                    <div
                      className={"btn btn-success mr-2 my-1"}
                      onClick={() => {
                        onGetFileHandle(v._id, v.title, v.ex);
                      }}
                    >
                      {v.title} - (نسخه {v.version})
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="table-rep-plugin">
              <div
                className="table-responsive mb-0"
                data-pattern="priority-columns"
              >
                <table id="tech-companies-1" className="table table-striped">
                  <thead>
                    <tr>
                      <th>شماره</th>
                      <th data-priority="6">عنوان</th>
                      <th data-priority="6">حجم</th>
                      <th data-priority="6">فرمت</th>
                      <th data-priority="6">تاریخ ایجاد</th>
                      <th data-priority="6">عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.documents.map((d, index) => (
                      <tr
                        className={"custom-cursor"}
                        onClick={() => {
                          setSingleDocument(d);
                        }}
                        style={{ width: "100% !important" }}
                      >
                        <th>{index + 1}</th>
                        <td>{d.title}</td>
                        <td>{d.documentSize}</td>
                        <td>{d.ex}</td>
                        <td>{d.createDate}</td>
                        <td>
                          <i
                            className={"mdi mdi-cloud-download"}
                            style={{ color: "green" }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <PagingComponent
              handlePaging={handleDocPaging}
              pageId={documents.pageId}
              eachPerPage={documents.eachPerPage}
              total={documents.total}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ShowDocumentsLendsDialog;
