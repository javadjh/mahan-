import React, { useContext, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  deletePersonAction,
  getPeopleAction,
} from "../../stateManager/actions/PeopleAction";
import UpsertPersonDialog from "../insertPerson/UpsertPersonDialog";
import { RootContext } from "../../RootComponent/RootContext";
import InsertPeopleFromExcelDialog from "../insertPerson/InsertPeopleFromExcelDialog";
import CustomDialog from "../../styled/components/CustomDialog";
import CustomButton from "../../styled/components/CustomButton";
import PeopleTableComponent from "../../components/people/PeopleTableComponent";
import { SpaceStyled } from "../../styled/global";
import { lightGreenColor, orangeColor } from "../../app/appColor";
import { Col, Input, Row } from "antd";
const PeopleRootComponent = () => {
  const { handleHide } = useContext(RootContext);
  const people = useSelector((state) => state.people);
  const [pageId, setPageId] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [singlePerson, setSinglePerson] = useState({});
  const [personIdSelectForDelete, setPersonIdSelectForDelete] = useState();
  let [isUpsertDialogShow, setIsUpsertDialogShow] = useState(false);
  let [isUploadExcelDialogShow, setIsUploadExcelDialogShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isUpsertDialogShow) setSinglePerson({});
  }, [isUpsertDialogShow]);

  useEffect(() => {
    getData();
  }, [pageId, searchValue]);
  const getData = async () => {
    await dispatch(getPeopleAction({ pageId, eachPerPage: 12, searchValue }));
  };
  const handlePaging = (page) => {
    setPageId(page);
  };
  const editPersonHandle = (person) => {
    setSinglePerson(person);
    setIsUpsertDialogShow(true);
  };

  const onDeleteClickListener = (id) => {
    setPersonIdSelectForDelete(id);
  };

  const deletePersonHandle = async (id) => {
    await dispatch(deletePersonAction(id));
  };

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col span={12}>
          <Input
            block
            placeholder="جستجو در اشحاص حقیقی"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Col>
        <Col span={11} offset={1}>
          <Row justify="end" align="middle">
            <Col>
              <CustomDialog
                title={"بارگذاری از طریق اکسل"}
                render={
                  <InsertPeopleFromExcelDialog
                    setIsUploadExcelDialogShow={setIsUploadExcelDialogShow}
                  />
                }
                actionRender={
                  <CustomButton style={{ marginLeft: 10 }} color={orangeColor}>
                    بارگذاری از طریق اکسل
                  </CustomButton>
                }
                isShow={isUploadExcelDialogShow}
              />
            </Col>
            <Col>
              <CustomDialog
                title={"شخص حقیقی"}
                render={
                  <UpsertPersonDialog
                    setIsUpsertDialogShow={setIsUpsertDialogShow}
                    singlePerson={singlePerson}
                  />
                }
                actionRender={
                  <CustomButton color={lightGreenColor}>
                    افزودن شخص حقیقی
                  </CustomButton>
                }
                isShow={isUpsertDialogShow}
                setIsShow={setIsUpsertDialogShow}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <SpaceStyled top={20}>
        <PeopleTableComponent
          deletePersonHandle={deletePersonHandle}
          people={people.people}
          setPageId={setPageId}
          onDeleteClickListener={onDeleteClickListener}
          editPersonHandle={editPersonHandle}
          pageId={people.pageId}
          total={people.total}
          eachPerPage={people.eachPerPage}
        />
      </SpaceStyled>
    </>
  );
};
export default PeopleRootComponent;
