import { BlueHeader } from "./style";
import React from "react";
import { Col, Image, Row } from "antd";
import CustomCard from "../styled/components/CustomCard";
import { SpaceStyled } from "../styled/global";
import CustomText from "../styled/components/CustomText";
import { darkBlueColor } from "../app/appColor";
import CustomMenuItem from "../styled/components/CustomMenuItem";
import {
  AlertOutlined,
  CaretLeftOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  FolderOutlined,
  FundProjectionScreenOutlined,
  LoginOutlined,
  ReadOutlined,
  SettingOutlined,
  ShareAltOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
const AdminLayoutComponent = ({ children }) => {
  return (
    <div style={{ backgroundColor: "#F7F9FB", minHeight: "100vh" }}>
      <BlueHeader>
        <Image src="/assets/logo.png" preview={false} />
      </BlueHeader>
      <Row>
        <Col span={7}>
          <SpaceStyled top={-90} right={30}>
            <CustomCard>
              <Row justify="space-between">
                <Col>
                  <CustomText size={20} color={"#BFCED8"}>
                    مدیریت سامانه
                  </CustomText>
                  <CustomText color={darkBlueColor}>
                    ویرایش اطلاعات کاربری
                  </CustomText>
                </Col>
                <Col>
                  <Image src="./assets/avatar.png" />
                </Col>
              </Row>
              <CustomMenuItem
                href={"/"}
                icon={<DashboardOutlined />}
                title={"پیشخوان کاربر"}
              />
              <CustomMenuItem
                href={"/archive-trees"}
                icon={<UnorderedListOutlined />}
                title={"بخش بایگانی"}
              />
              <CustomMenuItem
                href={"/library"}
                icon={<ShareAltOutlined />}
                title={"یخش کازیو"}
              />
              <CustomMenuItem
                href={"/lends"}
                icon={<UserOutlined />}
                title={"بخش اشتراک گذاری"}
              />
              <CustomMenuItem
                href={"/files-guard-system"}
                icon={<ReadOutlined />}
                title={"بخش ناظر سامانه"}
              />
              <CustomMenuItem
                href={"/reporting"}
                icon={<FundProjectionScreenOutlined />}
                title={"بخش گزارش گیری"}
              />
              <CustomMenuItem
                href={"/files-alerts"}
                icon={<AlertOutlined />}
                title={"بخش هشدار ها"}
              />
              <CustomMenuItem
                href={"/3"}
                icon={<DatabaseOutlined />}
                title={"بخش اطلاعات پایه"}
              />
              <CustomMenuItem
                href={"/2"}
                icon={<SettingOutlined />}
                title={"بخش مدیریت سامانه"}
              />
              <CustomMenuItem
                href={"/1"}
                icon={<LoginOutlined />}
                title={"خروج"}
              />
            </CustomCard>
          </SpaceStyled>
        </Col>
        <Col span={17}>
          <SpaceStyled top={-90} horizontal={20}>
            <CustomCard>{children}</CustomCard>
          </SpaceStyled>
        </Col>
      </Row>
    </div>
  );
};
export default AdminLayoutComponent;
