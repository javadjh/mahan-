import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getArchivesDetailActive,
  getSingleArchiveAction,
  setArchiveState,
} from "../../stateManager/actions/ArchiveAction";
import MainLayout from "../../RootComponent/MainLayout";
import {
  getArchiveTreesAction,
  setManualArchiveTreesAction,
} from "../../stateManager/actions/ArchiveTreeAction";
import ArchiveTreeLineArchiveTable from "./ArchiveTreeLineArchiveTable";
import ArchiveTreeLineFileTable from "./ArchiveTreeLineFileTable";
import { archiveTreesFilesAction } from "../../stateManager/actions/FileAction";
import PagingComponent from "../../utility/PagingComponent";
import { useHistory } from "react-router";
import ArchiveTreeSettingDialog from "../dialog/ArchiveTreeSettingDialog";
import AddTreeDialog from "../dialog/AddTreeDialog";
import { ArchiveTreeLineContext } from "./ArchiveTreeLineContext";
import InsertFileComponent from "../files/InsertFileComponent";
import InsertMoreSettingDialog from "../dialog/InsertMoreSettingDialog";
import UpsertMainArchiveTreesForm from "../dialog/UpsertMainArchiveTreesForm";
const ArchiveTreeLineRoot = ({ history }) => {
  history = useHistory();
  const dispatch = useDispatch();
  const {
    archiveId,
    setArchiveId,
    isShowAddFile,
    setIsShowAddFile,
    setSingleForAddFile,
    singleForAddFile,
  } = useContext(ArchiveTreeLineContext);
  const usersArchives = useSelector((state) => state.usersArchives);
  const archiveTrees = useSelector((state) => state.archiveTrees);
  const archiveTreesFiles = useSelector((state) => state.archiveTreesFiles);
  const reloadMainParentArchiveTree = useSelector(
    (state) => state.reloadMainParentArchiveTree
  );
  const [] = useState();
  const [mainParent, setMainParent] = useState([]);
  const [pageId, setPageId] = useState(1);
  const [isHideArchive, setIsHideArchive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    getArchives();
    return () => {
      dispatch(setManualArchiveTreesAction([]));
    };
  }, []);
  useEffect(() => {
    if (archiveId) getArchiveTrees();
  }, [
    archiveId,
    mainParent,
    pageId,
    reloadMainParentArchiveTree,
    isShowAddFile,
    searchValue,
  ]);

  useEffect(() => {
    setMainParent([]);
  }, [archiveId]);

  useEffect(() => {
    if (mainParent.length > 0) {
      setIsHideArchive(true);
    } else {
      setIsHideArchive(false);
    }
  }, [mainParent]);

  const getArchiveTrees = async () => {
    await dispatch(
      getArchiveTreesAction(
        mainParent.length > 0 ? false : true,
        mainParent.length > 0
          ? mainParent[mainParent.length - 1]._id
          : undefined,
        archiveId
      )
    );
    if (mainParent.length > 0)
      await dispatch(
        archiveTreesFilesAction(mainParent[mainParent.length - 1]._id, {
          pageId,
          eachPerPage: 20,
          searchValue,
        })
      );
  };

  const getArchives = async () => {
    await dispatch(getArchivesDetailActive());
  };

  return (
    <>
      <ArchiveTreeSettingDialog
        inTree={false}
        currentArchiveTree={singleForAddFile}
      />
      <AddTreeDialog inTree={false} />
      <InsertMoreSettingDialog />
      <UpsertMainArchiveTreesForm currentArchiveTree={singleForAddFile} />
      <div>
        <div className={"row"}>
          <div className={`col-lg-${isHideArchive ? "0" : "3"}`}>
            <div hidden={isHideArchive}>
              {usersArchives.map((u) => (
                <div
                  className={"card p-3 mb-2"}
                  style={{
                    backgroundColor:
                      localStorage.getItem("archive") === u.archiveId._id
                        ? "#48B116"
                        : "#ffffff",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h5
                      className={"m-0 custom-cursor"}
                      onClick={async () => {
                        setIsShowAddFile(false);
                        setArchiveId();
                        await dispatch(setArchiveState(u.archiveId._id));
                        setTimeout(() => {
                          window.location.reload();
                        }, 100);
                      }}
                      style={{
                        color:
                          localStorage.getItem("archive") === u.archiveId._id
                            ? "#ffffff"
                            : "#000000",
                      }}
                    >
                      {u.archiveId.title}
                    </h5>
                    <i
                      className={"mdi mdi-settings custom-cursor"}
                      onClick={async () => {
                        console.log(u.archiveId._id);
                        await dispatch(getSingleArchiveAction(u.archiveId._id));
                      }}
                      style={{
                        color:
                          localStorage.getItem("archive") === u.archiveId._id
                            ? "#ffffff"
                            : "orange",
                        fontSize: 19,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      color:
                        localStorage.getItem("archive") === u.archiveId._id
                          ? "#ffffff"
                          : "#000000",
                    }}
                  >
                    {u.archiveId.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={`col-lg-${isHideArchive ? "12" : "9"}`}>
            <div className={"py-0 ml-2"}>
              <div className={"pb-0"}>
                <div>
                  <div hidden={isShowAddFile}>
                    <>
                      <h5 className={"mb-0 pb-0"}>قفسه ها</h5>
                      <div className={"row"}>
                        {mainParent.length > 0 ? (
                          <>
                            <span
                              style={{ cursor: "pointer" }}
                              className={"px-2"}
                              onClick={() => {
                                setIsShowAddFile(false);
                                let mainParentCopy = [...mainParent];
                                mainParentCopy = mainParentCopy.slice(
                                  0,
                                  mainParentCopy.length - 1
                                );
                                setMainParent(mainParentCopy);
                              }}
                            >
                              <i className={"mdi mdi-arrow-right-thick"} />
                            </span>
                            {mainParent.map((m, index) => (
                              <span
                                style={{ cursor: "pointer", marginBottom: 10 }}
                                onClick={() => {
                                  let mainParentCopy = [...mainParent];
                                  mainParentCopy = mainParentCopy.slice(
                                    0,
                                    index + 1
                                  );
                                  setMainParent(mainParentCopy);
                                }}
                              >
                                {" "}
                                {m.title} /{" "}
                              </span>
                            ))}
                          </>
                        ) : (
                          <>
                            <br />
                          </>
                        )}
                      </div>
                      <ArchiveTreeLineArchiveTable
                        setMainParent={setMainParent}
                        mainParent={mainParent}
                        archives={archiveTrees}
                      />
                    </>
                  </div>
                </div>
                {isShowAddFile ? (
                  <InsertFileComponent inTree={false} />
                ) : (
                  <>
                    {mainParent.length > 0 ? (
                      <>
                        <div className={"card"}>
                          <div className={"card-body"}>
                            <h5>
                              پرونده های بایگانی{" "}
                              <span style={{ color: "green" }}>
                                ( {mainParent[mainParent.length - 1].title} )
                              </span>
                            </h5>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: 10,
                              }}
                            >
                              <div>
                                <button
                                  className={"btn btn-success "}
                                  onClick={() => {
                                    setSingleForAddFile(
                                      mainParent[mainParent.length - 1]
                                    );
                                    setIsShowAddFile(true);
                                  }}
                                >
                                  افزودن پرونده
                                </button>

                                <button className={"btn btn-light  mx-2"}>
                                  تعداد کل : {archiveTreesFiles.total}
                                </button>
                              </div>
                              <input
                                type="text"
                                onChange={(e) => {
                                  setSearchValue(e.target.value);
                                }}
                                className="form-control col-lg-5  "
                                id="validationCustom05"
                                placeholder="عنوان پرونده را وارد کنید..."
                                required
                              />
                            </div>
                            {archiveTreesFiles.files.length > 0 ? (
                              <span>
                                <ArchiveTreeLineFileTable
                                  history={history}
                                  hasForm={true}
                                  archiveId={archiveId}
                                  files={archiveTreesFiles.files}
                                />
                                <PagingComponent
                                  eachPerPage={archiveTreesFiles.eachPerPage}
                                  handlePaging={(page) => {
                                    setPageId(page);
                                  }}
                                  pageId={archiveTreesFiles.pageId}
                                  total={archiveTreesFiles.total}
                                />
                              </span>
                            ) : (
                              <>
                                <hr />
                                <p className={"text-center"}>پیدا نشد</p>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ArchiveTreeLineRoot;
