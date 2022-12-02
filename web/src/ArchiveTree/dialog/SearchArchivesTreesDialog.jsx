import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchArchivesTreesService } from "../../service/ArchiveTreeService";
import { searchArchivesTreesAction } from "../../stateManager/actions/ArchiveTreeAction";
import { changeFilesArchiveTreeAction } from "../../stateManager/actions/FileAction";
const SearchArchivesTreesAction = ({ moveToNewArchiveTree }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [archiveId, setArchiveId] = useState("");
  const [archiveTree, setArchiveTree] = useState({});
  const searchArchivesTrees = useSelector((state) => state.searchArchivesTrees);
  const usersArchives = useSelector((state) => state.usersArchives);
  useEffect(() => {
    getData();
  }, [searchValue, archiveId]);
  const getData = async () => {
    if (archiveId)
      await dispatch(
        searchArchivesTreesAction({
          archiveId,
          searchValue,
        })
      );
  };

  return (
    <Fragment>
      <div
        className="modal fade"
        id="searchArchivesTrees"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content p-4">
            <div>
              <label htmlFor="validationCustom04">جستجو در قفسه ها</label>
              <select
                className="custom-select"
                onChange={(e) => {
                  if (e.target.value) setArchiveId(e.target.value);
                }}
              >
                <option value={undefined} name={undefined}>
                  انتخاب کنید
                </option>
                {usersArchives.map((u) => (
                  <option value={u.archiveId._id} name={u.archiveId._id}>
                    {u.archiveId.title}
                  </option>
                ))}
              </select>
              <div className="form-group">
                <input
                  type="text"
                  name={"searchValue"}
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  className="form-control mt-3"
                  id="validationCustom04"
                  placeholder="عنوان قفسه را وارد کنید..."
                  required
                />
              </div>
              {searchArchivesTrees.map((s) => (
                <div
                  className={"card p-3 my-3  custom-cursor row"}
                  onClick={() => {
                    setArchiveTree(s);
                  }}
                >
                  <span>{s.route}</span>
                </div>
              ))}
              {archiveTree._id ? (
                <button
                  className={"btn btn-primary btn-block"}
                  onClick={() => {
                    moveToNewArchiveTree({
                      archive: archiveTree.archive,
                      _id: archiveTree._id,
                    });
                  }}
                >
                  انتقال به {archiveTree.title}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default SearchArchivesTreesAction;
