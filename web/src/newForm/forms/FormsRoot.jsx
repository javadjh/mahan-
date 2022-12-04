import { Col, Row } from "antd";
import React, { Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { lightGreenColor } from "../../app/appColor";
import { getAllFormsAction } from "../../stateManager/actions/FormAction";
import CustomButton from "../../styled/components/CustomButton";
import CustomDialog from "../../styled/components/CustomDialog";
import { SpaceStyled } from "../../styled/global";
import FormsTable from "./FormsTable";
import Auth from "../../auth/Auth";

const FormsRoot = ({ history }) => {
  history = useHistory();
  const dispatch = useDispatch();
  const forms = useSelector((state) => state.forms);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await dispatch(getAllFormsAction());
  };
  return (
    <Fragment>
      <Row justify="space-between" align="middle">
        <Col span={24}>
          <Row justify="end" align="middle">
            <Col>
              <Auth accessList={["افزودن فرم"]}>
                <Link to={"/forms/upsert/form/0"}>
                  <CustomButton color={lightGreenColor}>
                    افزودن فرم جدید
                  </CustomButton>
                </Link>
              </Auth>
            </Col>
          </Row>
        </Col>
      </Row>
      <SpaceStyled top={20}>
        <FormsTable forms={forms} history={history} />
      </SpaceStyled>
    </Fragment>
  );
};
export default FormsRoot;
