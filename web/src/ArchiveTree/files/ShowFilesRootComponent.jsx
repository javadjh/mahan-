import React, { useContext, useEffect, useState } from "react";
import FilesTableComponent from "./FilesTableComponent";
import { ArchiveTreeContext } from "../ArchiveTreeContext";
import { archiveTreesFilesAction } from "../../stateManager/actions/FileAction";
import { useDispatch, useSelector } from "react-redux";
import PagingComponent from "../../utility/PagingComponent";
import { useHistory } from "react-router";
import { RootContext } from "../../RootComponent/RootContext";
const ShowFilesRootComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { handleHide } = useContext(RootContext);
  const archiveTreesFiles = useSelector((state) => state.archiveTreesFiles);
  const { currentArchiveTree, setSingleForAddFile, setIsShowAddFile } =
    useContext(ArchiveTreeContext);
  const [pageId, setPageId] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    getArchiveFiles();
  }, [currentArchiveTree, pageId, searchValue]);

  const getArchiveFiles = async () => {
    if (currentArchiveTree)
      await dispatch(
        archiveTreesFilesAction(currentArchiveTree._id, {
          pageId,
          eachPerPage: 20,
          searchValue,
        })
      );
  };
  const handlePaging = (page) => {
    setPageId(page);
  };
  return (
    <div className={"col-lg-9 card pt-3"}>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div>
              <div className={"row mt-0 mb-3"}>
                <div className={"col-lg-8"}>
                  <div className={"mb-1"}>
                    <div className={"row ml-3"}>
                      <p className="mx-1 p-0" style={{ marginTop: 3 }}>
                        {currentArchiveTree ? currentArchiveTree.route : null}
                      </p>
                    </div>
                    <div className={"mb-2"}>
                      <button
                        hidden={handleHide("ویرایش پرونده")}
                        onClick={() => {
                          setSingleForAddFile(currentArchiveTree);
                          setIsShowAddFile(true);
                        }}
                        type="button"
                        className="btn btn-success ml-3 mt-0 waves-effect waves-light "
                        data-toggle="button"
                        aria-pressed="false"
                      >
                        افزودن پرونده جدید
                      </button>
                      <button className={"btn btn-light  mx-2"}>
                        تعداد کل : {archiveTreesFiles.total}
                      </button>
                    </div>
                  </div>
                </div>
                <div className={"col-lg-4"}>
                  <div>
                    <input
                      className="form-control col-lg-12"
                      type="text"
                      placeholder={"جستجو..."}
                      value={searchValue}
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <FilesTableComponent
                files={archiveTreesFiles.files}
                hasForm={currentArchiveTree.archive.isFormRequired}
                history={history}
                archiveId={currentArchiveTree.archive._id}
              />
              <PagingComponent
                eachPerPage={archiveTreesFiles.eachPerPage}
                total={archiveTreesFiles.total}
                pageId={archiveTreesFiles.pageId}
                handlePaging={handlePaging}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShowFilesRootComponent;
