import { BlueHeader } from "./style";
import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Image, Input, Row } from "antd";
import CustomCard from "../styled/components/CustomCard";
import { CustomCursor, SpaceStyled } from "../styled/global";
import CustomText from "../styled/components/CustomText";
import { darkBlueColor } from "../app/appColor";
import CustomMenuItem from "../styled/components/CustomMenuItem";
import {
  AlertOutlined,
  CaretLeftOutlined,
  ClusterOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  EditOutlined,
  FileProtectOutlined,
  FolderOutlined,
  FundProjectionScreenOutlined,
  LoginOutlined,
  ReadOutlined,
  SettingOutlined,
  ShareAltOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import UserProfileDialog from "../Profile/UserProfileDialog";
import { useSelector } from "react-redux";
import AppSettingDialog from "../dialog/AppSettingDialog";
import CustomDialog from "../styled/components/CustomDialog";
import SearchInputComponent from "../styled/components/SearchInputComponent";
import FooterRootComponent from "./FooterRootComponent";

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
        <Row justify="space-between">
          <Col>
            <Image src="/assets/logo.png" preview={false} />
          </Col>
          <Col>
            <SearchInputComponent placeholder="موتور جستجو..." />
          </Col>
        </Row>
      </BlueHeader>
      <Row>
        <Col span={6}>
          <SpaceStyled top={-90} right={15}>
            <CustomCard>
              <SpaceStyled bottom={30}>
                <SpaceStyled horizontal={30}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      {/* <CustomText size={20} color={"#BFCED8"}>
                      مدیریت سامانه
                    </CustomText> */}
                      <SpaceStyled bottom={10}>
                        <Image
                          src="http://localhost:3000/assets/mahan-typography.png"
                          preview={false}
                        />
                      </SpaceStyled>
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
                        width={60}
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
                </SpaceStyled>
              </SpaceStyled>
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
                icon={<DatabaseOutlined />}
                title={"بخش اطلاعات پایه"}
                dropdown={
                  <>
                    <CustomMenuItem
                      href={"/users"}
                      icon={<UserOutlined />}
                      title={"مدیریت کاربران"}
                    />
                    <CustomMenuItem
                      href={"/roles"}
                      icon={<FileProtectOutlined />}
                      title={"مدیریت نقش ها"}
                    />
                    <CustomMenuItem
                      href={"/people"}
                      icon={<UsergroupAddOutlined />}
                      title={"مدیریت اشخاص حقیقی"}
                    />
                    <CustomMenuItem
                      href={"/legal-people"}
                      icon={<UsergroupAddOutlined />}
                      title={"مدیریت اشخاص حقوقی"}
                    />
                    <CustomMenuItem
                      href={"/applicants"}
                      icon={<ClusterOutlined />}
                      title={"سمت سازمانی"}
                    />
                  </>
                }
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
        <Col span={18}>
          <SpaceStyled top={-90} horizontal={10}>
            {location?.pathname === "/" ? (
              <>{children}</>
            ) : (
              <CustomCard>{children}</CustomCard>
            )}
          </SpaceStyled>
          <FooterRootComponent />
        </Col>
      </Row>
    </div>
  );
};
export default AdminLayoutComponent;
