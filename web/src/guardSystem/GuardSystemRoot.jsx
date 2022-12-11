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
import { Button, Checkbox, Col, Divider, Image, Row } from "antd";
import { colourStyles, SpaceStyled } from "../styled/global";
import CustomButton from "../styled/components/CustomButton";
import CustomSmallButton from "../styled/components/CustomSmallButton";
import { FRONT_IP } from "../config/ip";
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
  };

  return (
    <div
      style={{
        width: "100%",
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
        <Divider orientation={"right"}>
          <Checkbox
            value={isActive}
            checked={isActive}
            onChange={() => {
              setIsActive(!isActive);
            }}
          >
            برای بایگانی ناظر فعال شود
          </Checkbox>
        </Divider>
      )}
      {cycleValue && isActive && (
        <div className={"card card-body mx-3"}>
          <Row align="middle" justify="center">
            <Col span={11} align={"top"}>
              <SpaceStyled vertical={10}>
                <Select
                  styles={colourStyles}
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
              </SpaceStyled>
            </Col>
            <Col span={2} align={"middle"}>
              <Image
                preview={false}
                src={`${FRONT_IP}/assets/svg/guard-${
                  cycleValue === 1
                    ? "one"
                    : cycleValue === 2
                    ? "two"
                    : "three-1"
                }.svg`}
              />
            </Col>
            <Col span={11}>
              {cycleValue === 1 && (
                <>
                  <SpaceStyled vertical={10}>
                    <Select
                      style={{ width: "100%" }}
                      styles={colourStyles}
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
                  </SpaceStyled>
                </>
              )}
              {cycleValue === 2 && (
                <>
                  <SpaceStyled vertical={10}>
                    {cycleValue >= 2 && (
                      <SpaceStyled vertical={10}>
                        <Select
                          style={{ width: "100%" }}
                          styles={colourStyles}
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
                      </SpaceStyled>
                    )}
                    <Select
                      style={{ width: "100%" }}
                      styles={colourStyles}
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
                  </SpaceStyled>
                </>
              )}
              {cycleValue === 3 && (
                <div>
                  {cycleValue >= 2 && (
                    <SpaceStyled vertical={10}>
                      <Select
                        style={{ width: "100%" }}
                        styles={colourStyles}
                        onChange={(e) => {
                          setPrimitiveUser(e.value);
                        }}
                        noOptionsMessage={() => "یافت نشد"}
                        defaultValue={guardSystem.primitive}
                        placeholder={"تایید اولیه"}
                        components={animatedComponents}
                        options={supervisors}
                      />
                    </SpaceStyled>
                  )}
                  {cycleValue >= 3 && (
                    <SpaceStyled vertical={10}>
                      <Select
                        style={{ width: "100%" }}
                        styles={colourStyles}
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
                    </SpaceStyled>
                  )}

                  <SpaceStyled vertical={10}>
                    <Select
                      style={{ width: "100%" }}
                      styles={colourStyles}
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
                  </SpaceStyled>
                </div>
              )}
            </Col>
          </Row>
        </div>
      )}

      {archiveId && (
        <SpaceStyled top={10}>
          <CustomButton
            isLeft={true}
            onClick={() => {
              sendData();
            }}
          >
            ثبت
          </CustomButton>
        </SpaceStyled>
      )}
    </div>
  );
};
export default GuardSystemRoot;
