import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../RootComponent/MainLayout";
import { getSupervisorsAction } from "../stateManager/actions/UsersAction";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  setArchiveGuardSystemAction,
  setGuardSystemAction,
} from "../stateManager/actions/ArchiveAction";
import { Checkbox } from "antd";
const animatedComponents = makeAnimated();

const cycle = [
  {
    value: 1,
    label: "یک مرحله",
  },
  {
    value: 2,
    label: "دو مرحله",
  },
  {
    value: 3,
    label: "سه مرحله",
  },
];
const GuardSystemRoot = ({ archiveId }) => {
  const dispatch = useDispatch();
  const supervisors = useSelector((state) => state.usersAutocomplete);
  const usersArchives = useSelector((state) => state.usersArchives);
  const guardSystem = useSelector((state) => state.guardSystem);
  const [usersArchivesState, setUsersArchivesState] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const [primitiveUser, setPrimitiveUser] = useState();
  const [auditUser, setAuditUser] = useState();
  const [finallyUser, setFinallyUser] = useState();
  const [cycleValue, setCycleValue] = useState(3);
  useEffect(() => {
    getData();
    setArchives();
  }, [usersArchives]);

  useEffect(() => {
    if (archiveId) getArchiveGuardSystem();
  }, [archiveId]);

  useEffect(() => {
    setIsActive(guardSystem.isActive);
    setCycleValue(guardSystem.cycle ? guardSystem.cycle : 1);
    if (guardSystem._id) {
      if (guardSystem.primitive) setPrimitiveUser(guardSystem.primitive.value);
      if (guardSystem.audit) setAuditUser(guardSystem.audit.value);
      if (guardSystem.finally) setFinallyUser(guardSystem.finally.value);
    }
    console.log({
      primitiveUser: guardSystem?.primitive?.value,
      auditUser: guardSystem?.audit?.value,
      finallyUser: guardSystem?.finally?.value,
    });
  }, [guardSystem]);

  const getArchiveGuardSystem = async () => {
    await dispatch(setGuardSystemAction(archiveId));
  };
  const getData = async () => {
    await dispatch(getSupervisorsAction());
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

  const sendData = async () => {
    await dispatch(
      setArchiveGuardSystemAction({
        cycle: cycleValue,
        archiveId,
        primitiveUserId: isActive ? primitiveUser : undefined,
        auditUserId: isActive ? auditUser : undefined,
        finallyUserId: isActive ? finallyUser : undefined,
        isActive,
      })
    );
    window.$("#insertMoreSetting").modal("hide");
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#68686822",
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
      }}
    >
      {/* <Select
        onChange={(e) => {
          setArchiveId(e.value);
        }}
        noOptionsMessage={() => "یافت نشد"}
        placeholder={"جست و جو در بایگانی..."}
        components={animatedComponents}
        className={"col-lg-12 mb-3"}
        style={{ width: "100%" }}
        options={usersArchivesState}
      /> */}
      {archiveId && (
        <div className={"mx-3"}>
          <Checkbox
            value={isActive}
            checked={isActive}
            onChange={() => {
              setIsActive(!isActive);
            }}
          >
            برای بایگانی ناظر فعال شود
          </Checkbox>
        </div>
      )}
      {cycleValue && isActive && (
        <div className={"card card-body mx-3"}>
          <div className={"row"}>
            <Select
              className={"mb-3 col-lg-4"}
              onChange={(e) => {
                setCycleValue(e.value);
              }}
              noOptionsMessage={() => "یافت نشد"}
              placeholder={"تعداد مراحل"}
              defaultValue={cycle[guardSystem.cycle - 1]}
              components={animatedComponents}
              options={cycle}
            />
          </div>
          <div className={"row mb-3"}>
            <div className={"col-lg-6 row"}>
              <label className={"mt-2 col-lg-3"}>تصویب کننده</label>
              <Select
                onChange={(e) => {
                  setFinallyUser(e.value);
                }}
                className={"col-lg-9"}
                noOptionsMessage={() => "یافت نشد"}
                defaultValue={guardSystem.finally}
                placeholder={"تصویب کننده"}
                components={animatedComponents}
                options={supervisors}
              />
            </div>
          </div>
          {cycleValue >= 2 && (
            <div className={"row mb-3"}>
              <div className={"col-lg-6 row"}>
                <label className={"mt-2 col-lg-3"}>تایید اولیه</label>
                <Select
                  onChange={(e) => {
                    setPrimitiveUser(e.value);
                  }}
                  className={"col-lg-9"}
                  noOptionsMessage={() => "یافت نشد"}
                  defaultValue={guardSystem.primitive}
                  placeholder={"تایید اولیه"}
                  components={animatedComponents}
                  options={supervisors}
                />
              </div>
            </div>
          )}

          {cycleValue >= 3 && (
            <div className={"row mb-3"}>
              <div className={"col-lg-6 row"}>
                <label className={"mt-2 col-lg-3"}>ممیزی</label>
                <Select
                  onChange={(e) => {
                    setAuditUser(e.value);
                  }}
                  className={"col-lg-9"}
                  defaultValue={guardSystem.audit}
                  noOptionsMessage={() => "یافت نشد"}
                  placeholder={"ممیزی"}
                  components={animatedComponents}
                  options={supervisors}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <button
        hidden={!archiveId}
        onClick={() => {
          sendData();
        }}
        className={"btn btn-success btn-block mt-3 mx-3 col-lg-1 "}
      >
        ثبت
      </button>
    </div>
  );
};
export default GuardSystemRoot;
