import React, { Fragment, useEffect, useState } from "react";
import MainLayout from "../RootComponent/MainLayout";
import PagingComponent from "../utility/PagingComponent";
import FilesGuardSystemTableComponent from "../components/FilesGuard/FilesGuardSystemTableComponent";
import { useDispatch, useSelector } from "react-redux";
import { getArchivesFilesGuardSystemAction } from "../stateManager/actions/ArchiveAction";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import FileGuardSystemActionDialog from "../dialog/FileGuardSystemActionDialog";
import { Col, Input, Row } from "antd";
import { colourStyles, SpaceStyled } from "../styled/global";
const animatedComponents = makeAnimated();
const FilesGuardSystemRoot = () => {
  const dispatch = useDispatch();
  const [pageId, setPageId] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState({});
  const [archiveId, setArchiveId] = useState(localStorage.getItem("archive"));
  const [usersArchivesState, setUsersArchivesState] = useState([]);
  const [reload, setReload] = useState();
  const files = useSelector((state) => state.archiveTreesFiles);
  const usersArchives = useSelector((state) => state.usersArchives);
  useEffect(() => {
    getFiles();
    setArchives();
  }, [pageId, searchValue, archiveId, usersArchives, reload]);

  const getFiles = async () => {
    if (archiveId) {
      await dispatch(
        getArchivesFilesGuardSystemAction({
          pageId,
          eachPerPage: 12,
          searchValue,
          archiveId,
        })
      );
    }
  };
  const setArchives = () => {
    let archives = [];
    usersArchives.map((u) => {
      archives.push({
        value: u.archiveId._id,
        label: u.archiveId.title,
      });
    });
    setUsersArchivesState(archives);
  };
  return (
    <Fragment>
      <div>
        <Row>
          <Col span={12}>
            {usersArchivesState && (
              <Select
                styles={colourStyles}
                onChange={(e) => {
                  setArchiveId(e.value);
                }}
                noOptionsMessage={() => "یافت نشد"}
                placeholder={"جست و جو در بایگانی..."}
                components={animatedComponents}
                className={"mb-3"}
                options={usersArchivesState}
              />
            )}
          </Col>
          <Col span={12}>
            <Input
              placeholder={"جستجو..."}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </Col>
        </Row>
        <div>
          <p>
            دسترسی شما :{" "}
            <span style={{ color: "green" }}>{files.accessRule}</span>
          </p>
        </div>

        <FilesGuardSystemTableComponent
          files={files}
          setPageId={setPageId}
          setReload={setReload}
        />
        {/* <PagingComponent
          handlePaging={(page) => setPageId(page)}
          pageId={files.pageId}
          eachPerPage={files.eachPerPage}
          total={files.total}
        /> */}
      </div>
    </Fragment>
  );
};
export default FilesGuardSystemRoot;
