import React, { Fragment, useContext, useEffect, useState } from "react";
import MainLayout from "../RootComponent/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getArchiveFilesArchive } from "../stateManager/actions/FileAction";
import { LibraryContext } from "./LibraryContext";
import LibrariesDocumentsComponent from "./LibrariesDocumentsComponent";
import CustomLabel from "../styled/components/CustomLabel";
import CustomCard from "../styled/components/CustomCard";
import { Col, Row } from "antd";
import CustomButton from "../styled/components/CustomButton";

const animatedComponents = makeAnimated();
const LibraryRootComponent = () => {
  const dispatch = useDispatch();
  const { setFile, sendData, archive, setArchive } = useContext(LibraryContext);

  const usersArchives = useSelector((state) => state.usersArchives);
  const archivesFile = useSelector((state) => state.archivesFile);

  const [usersArchivesState, setUsersArchivesState] = useState([]);

  useEffect(() => {
    setArchives();
  }, [usersArchives]);

  useEffect(() => {
    if (archive) getArchivesFile("");
  }, [archive]);

  const setArchives = () => {
    let archives = [];
    console.table(usersArchives);
    usersArchives.map((u) => {
      archives.push({
        value: u.archiveId._id,
        label: u.archiveId.title,
      });
    });
    setUsersArchivesState(archives);
    if (archives.length === 1) {
      setArchive(archives[0].value);
    }
  };

  const getArchivesFile = async (searchValue) => {
    await dispatch(
      getArchiveFilesArchive({
        archiveId: archive,
        searchValue,
      })
    );
  };

  return (
    <Fragment>
      <div className={"mb-4 mx-2"}>
        {/* <span className="alert alert-info " role="alert">
          <CustomLabel
            title={`جهت حذف اسناد انتخاب شده کلید "Del"
            و جهت انتقال به پوشه کلید "M" را
            فشار دهید`}
          />
        </span> */}
      </div>
      <CustomCard>
        <Row align="bottom">
          <Col span={9}>
            <label htmlFor="validationCustom04">انتخاب بایگانی</label>
            {usersArchivesState.length === 1 ? (
              <>
                <p style={{ color: "green" }}>{usersArchivesState[0].label}</p>
              </>
            ) : (
              <div>
                <Select
                  onChange={(e) => {
                    setArchive(e.value);
                  }}
                  noOptionsMessage={() => "یافت نشد"}
                  placeholder={"جست و جو در بایگانی..."}
                  components={animatedComponents}
                  options={usersArchivesState}
                />
              </div>
            )}
          </Col>
          <Col span={9} offset={1}>
            <label htmlFor="validationCustom04">انتخاب پرونده</label>
            <div>
              <Select
                onChange={(e) => {
                  setFile(e.value);
                  getArchivesFile(e.label);
                }}
                noOptionsMessage={() => "یافت نشد"}
                placeholder={"جست و جو در پرونده..."}
                closeMenuOnSelect={false}
                components={animatedComponents}
                options={archivesFile}
              />
            </div>
          </Col>
          <Col span={4} offset={1}>
            <CustomButton onClick={sendData}>ثبت اسناد</CustomButton>
          </Col>
        </Row>
      </CustomCard>
      <div className={" mt-3"} style={{ marginRight: 32 }}>
        <LibrariesDocumentsComponent />
      </div>
    </Fragment>
  );
};
export default LibraryRootComponent;
