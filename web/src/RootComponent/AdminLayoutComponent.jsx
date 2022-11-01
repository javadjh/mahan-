import { BlueHeader } from "./style";
import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "antd";
import CustomCard from "../styled/components/CustomCard";
import { CustomCursor, SpaceStyled } from "../styled/global";
import CustomText from "../styled/components/CustomText";
import { darkBlueColor } from "../app/appColor";
import CustomMenuItem from "../styled/components/CustomMenuItem";
import {
  AlertOutlined,
  CaretLeftOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  EditOutlined,
  FolderOutlined,
  FundProjectionScreenOutlined,
  LoginOutlined,
  ReadOutlined,
  SettingOutlined,
  ShareAltOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import UserProfileDialog from "../Profile/UserProfileDialog";
import { useSelector } from "react-redux";
import AppSettingDialog from "../dialog/AppSettingDialog";
import CustomDialog from "../styled/components/CustomDialog";
const AdminLayoutComponent = ({ children, location }) => {
  const [isShowAppSetting, setIsShowAppSetting] = useState(false);
  useEffect(() => {
    console.log(location?.pathname);
    console.log(location);
  }, [location]);
  const userProfile = useSelector((state) => state.userProfile);
  return (
    <div style={{ backgroundColor: "#F7F9FB", minHeight: "100vh" }}>
      <BlueHeader>
        <Image src="/assets/logo.png" preview={false} />
      </BlueHeader>
      <Row>
        <Col span={5}>
          <SpaceStyled top={-90} right={15}>
            <CustomCard>
              <Row justify="space-between">
                <Col>
                  <CustomText size={20} color={"#BFCED8"}>
                    مدیریت سامانه
                  </CustomText>
                  <Row>
                    <Col>
                      <CustomText color={darkBlueColor}>
                        ویرایش اطلاعات کاربری
                      </CustomText>
                    </Col>
                    <Col>
                      <SpaceStyled right={10}>
                        <UserProfileDialog />
                      </SpaceStyled>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Image
                    width={50}
                    style={{
                      borderRadius: 100,
                      aspectRatio: "1/1",
                      objectFit: "cover",
                    }}
                    preview={false}
                    src={
                      userProfile.profileImage
                        ? `http://localhost:5000/${userProfile._id}/${userProfile.profileImage}`
                        : "./assets/avatar.png"
                    }
                  />
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
              <CustomDialog
                title={"تنظیمات برنامه"}
                render={
                  <AppSettingDialog setIsShowAppSetting={setIsShowAppSetting} />
                }
                actionRender={
                  <CustomMenuItem
                    onClick={() => setIsShowAppSetting(true)}
                    icon={<SettingOutlined />}
                    title={"بخش مدیریت سامانه"}
                  />
                }
                isShow={isShowAppSetting}
              />
              <CustomMenuItem
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                icon={<LoginOutlined />}
                title={"خروج"}
              />
            </CustomCard>
          </SpaceStyled>
        </Col>
        <Col span={19}>
          <SpaceStyled top={-90} horizontal={10}>
            {location?.pathname === "/" ? (
              <>{children}</>
            ) : (
              <CustomCard>{children}</CustomCard>
            )}
          </SpaceStyled>
        </Col>
      </Row>
    </div>
  );
};
export default AdminLayoutComponent;
