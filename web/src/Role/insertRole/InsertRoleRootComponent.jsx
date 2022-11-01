import React, { useContext, useEffect } from "react";
import MainLayout from "../../RootComponent/MainLayout";
import BaseInformationUpsertRoleComponent from "./BaseInformationUpsertRoleComponent";
import SecondInformationUpsertRoleComponent from "./SecondInformationUpsertRoleComponent";
import { useDispatch, useSelector } from "react-redux";
import CustomCard from "../../styled/components/CustomCard";
import {
  getAllAccessAction,
  getManualAccessAction,
} from "../../stateManager/actions/AccessActioon";
import { UpsertRoleContext } from "./UpsertRoleContext";
import {
  insertRoleAction,
  updateRoleAction,
} from "../../stateManager/actions/RolesAction";
import { StickyContainer, Sticky } from "react-sticky";
import { useHistory } from "react-router";
import { Col, Row } from "antd";
const InsertRoleRootComponent = ({ history, match }) => {
  history = useHistory();
  const dispatch = useDispatch();
  let access = useSelector((state) => state.access);
  const singleRole = useSelector((state) => state.singleRole);
  const {
    setAccessList,
    title,
    setTitle,
    description,
    setDescription,
    accessList,
    formValidator,
    setValidatorMessage,
    id,
    setId,
    form,
  } = useContext(UpsertRoleContext);
  useEffect(() => {
    getData();
    return () => {
      dispatch(getManualAccessAction([]));
    };
  }, []);

  useEffect(() => {
    if (singleRole._id) {
      setTitle(singleRole.title);
      setDescription(singleRole.description);
      setId(singleRole._id);
      form.setFieldsValue(singleRole);
      for (let i = 0; i < access.length; i++) {
        for (let j = 0; j < singleRole.accessList.length; j++) {
          if (access[i].title === singleRole.accessList[j].title) {
            access[i].isSelected = true;
          }
        }
      }
    }
    setAccessList(access);
  }, [access, singleRole]);

  const getData = async () => {
    await dispatch(getAllAccessAction());
  };

  const insertRoleHandle = async (formData) => {
    let access = accessList.filter((a) => a.isSelected === true);
    const data = {
      ...formData,
      ...{ accessList: access },
    };
    if (singleRole._id) await dispatch(updateRoleAction(id, data, history));
    else await dispatch(insertRoleAction(data, history));
  };

  return (
    <StickyContainer>
      <div>
        <CustomCard>
          <Row>
            <Col span={12}>
              <Sticky topOffset={200}>
                {({
                  style,
                  distanceFromTop,
                  distanceFromBottom,
                  calculatedHeight,
                }) => (
                  <header style={style}>
                    <BaseInformationUpsertRoleComponent
                      insertRoleHandle={insertRoleHandle}
                    />
                  </header>
                )}
              </Sticky>
            </Col>

            <SecondInformationUpsertRoleComponent access={access} />
          </Row>
        </CustomCard>
      </div>
    </StickyContainer>
  );
};
export default InsertRoleRootComponent;
