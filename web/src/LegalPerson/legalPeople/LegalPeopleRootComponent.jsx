import React, { useContext, useEffect, useState } from "react";
import AlertDialog from "../../utility/AlertDialog";
import { Col, Input, Row } from "antd";
import UpsertPersonDialog from "../../Person/insertPerson/UpsertPersonDialog";
import PagingComponent from "../../utility/PagingComponent";
import MainLayout from "../../RootComponent/MainLayout";

import { useDispatch, useSelector } from "react-redux";
import CustomDialog from "../../styled/components/CustomDialog";
import CustomButton from "../../styled/components/CustomButton";
import { lightGreenColor, orangeColor } from "../../app/appColor";

import {
  deleteLegalPeopleAction,
  getLegalPeopleAction,
} from "../../stateManager/actions/LegalPeopleAction";
import UpsertLegalPersonDialog from "../insertLegalPerson/UpsertLegalPersonDialog";
import { SpaceStyled } from "../../styled/global";
import { RootContext } from "../../RootComponent/RootContext";
import InsertLegalPeopleFromExcelDialog from "../insertLegalPerson/InsertLegalPeopleFromExcelDialog";
import LegalPeopleTableComponent from "../../components/legalPeople/LegalPeopleTableComponent";

const LegalPeopleRootComponent = () => {
  const [isUploadExcelDialogShow, setIsUploadExcelDialogShow] = useState(false);
  const [isUpsertDialogShow, setIsUpsertDialogShow] = useState(false);
  const { handleHide } = useContext(RootContext);
  const dispatch = useDispatch();
  const legalPeople = useSelector((state) => state.legalPeople);
  const [singleLegalPerson, setSingleLegalPerson] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [singleId, setSingleId] = useState("");
  const [pageId, setPageId] = useState(1);

  useEffect(() => {
    getData();
  }, [pageId, searchValue]);

  const getData = async () => {
    await dispatch(
      getLegalPeopleAction({
        pageId,
        eachPerPage: 12,
        searchValue,
      })
    );
  };

  const onClickEditLegalPerson = (legalPerson) => {
    setSingleLegalPerson(legalPerson);
    setIsUpsertDialogShow(true);
  };

  const deleteLegalPerson = async (id) => {
    await dispatch(deleteLegalPeopleAction(id));
  };

  const onClickDeleteLegalPerson = (id) => {
    setSingleId(id);
  };

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col span={12}>
          <Input
            block
            placeholder="جستجو در اشحاص حقوقی"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Col>
        <Col span={11} offset={1}>
          <Row justify="end" align="middle">
            <Col>
              <CustomDialog
                title={"بارگذاری از طریق اکسل"}
                render={
                  <InsertLegalPeopleFromExcelDialog
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
                title={"شخص حقوقی"}
                render={
                  <UpsertLegalPersonDialog
                    setIsUpsertDialogShow={setIsUpsertDialogShow}
                    singleLegalPerson={singleLegalPerson}
                  />
                }
                actionRender={
                  <CustomButton
                    onClick={() => {
                      setSingleLegalPerson({
                        companyName: "",
                      });
                      setIsUpsertDialogShow(true);
                    }}
                    color={lightGreenColor}
                  >
                    افزودن شخص حقوقی
                  </CustomButton>
                }
                isShow={isUpsertDialogShow}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <SpaceStyled top={20}>
        <LegalPeopleTableComponent
          total={legalPeople.total}
          pageId={legalPeople.pageId}
          setPageId={setPageId}
          legalPeople={legalPeople.legalPeople}
          deleteLegalPerson={deleteLegalPerson}
          onClickEditLegalPerson={onClickEditLegalPerson}
        />
      </SpaceStyled>
    </>
  );
};
export default LegalPeopleRootComponent;
