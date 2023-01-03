import { Affix, Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { hightlightColor } from "../app/appColor";
import { getAppInfoAction } from "../stateManager/actions/AppSettingAction";
import { store } from "../stateManager/Store";
import CustomNasq from "../styled/components/CustomNasq";
import { SpaceStyled } from "../styled/global";
const FooterRootComponent = () => {
  const dispatch = useDispatch();
  const appInfo = useSelector((state) => state.appInfo);
  useEffect(() => {
    dispatch(getAppInfoAction());
  }, []);
  return (
    <FooterContainer>
      <SpaceStyled
        style={{ position: "sticky", top: "0px" }}
        top={40}
        horizontal={20}
      >
        <Row justify="space-between" align="middle">
          <Col span={17}>
            <span style={{ color: hightlightColor, fontSize: 12 }}>
              {" "}
              تمام حقوق این سامانه محفوظ میباشد و کپی برداری غیر قانونی و پیگرد
              قانونی دارد
            </span>
          </Col>
          <Col span={7}>
            <span style={{ color: hightlightColor, fontSize: 12 }}>
              سامانه قدرتمند مدیریت اسناد <b>ماهان</b> نسخه ({appInfo.version}){" "}
            </span>
            <CustomNasq color={hightlightColor} size={30}>
              ماهان
            </CustomNasq>
          </Col>
        </Row>
      </SpaceStyled>
    </FooterContainer>
  );
};
export default FooterRootComponent;
const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 75%;
  margin-bottom: 0px;
`;
