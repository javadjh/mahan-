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
import Auth from "../auth/Auth";

const AdminLayoutComponent = ({ children, location }) => {
  const [isShowAppSetting, setIsShowAppSetting] = useState(false);
  useEffect(() => {}, [location]);
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
                          src="http://192.168.2.25:3000/assets/mahan-typography.png"
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
                            ? `http://192.168.2.25:5000/${userProfile._id}/${userProfile.profileImage}`
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
              <Auth
                accessList={[
                  "انتصاب کاربران به بایگانی",
                  "انتصاب کاربران به بایگانی",
                  "انتصاب کاربران به بایگانی",
                  "ثبت اطلاعات تکمیلی برای بایگانی",
                  "ثبت اطلاعات تکمیلی برای بایگانی",
                ]}
              >
                <CustomMenuItem
                  href={"/archive-trees"}
                  icon={<UnorderedListOutlined />}
                  title={"بخش بایگانی"}
                />
              </Auth>
              <Auth accessList={["کازیو"]}>
                <CustomMenuItem
                  href={"/library"}
                  icon={<ShareAltOutlined />}
                  title={"یخش کازیو"}
                />
              </Auth>
              <Auth accessList={["اشتراک گذاری"]}>
                <CustomMenuItem
                  href={"/lends"}
                  icon={<UserOutlined />}
                  title={"بخش اشتراک گذاری"}
                />
              </Auth>
              <Auth accessList={["ناظر"]}>
                <CustomMenuItem
                  href={"/files-guard-system"}
                  icon={<ReadOutlined />}
                  title={"بخش ناظر سامانه"}
                />
              </Auth>
              <Auth accessList={["گزارش گیری"]}>
                <CustomMenuItem
                  href={"/reporting"}
                  icon={<FundProjectionScreenOutlined />}
                  title={"بخش گزارش گیری"}
                />
              </Auth>
              <CustomMenuItem
                href={"/files-alerts"}
                icon={<AlertOutlined />}
                title={"بخش هشدار ها"}
              />
              <Auth accessList={["تاریخچه تغییرات"]}>
                <CustomMenuItem
                  href={"/logs"}
                  icon={<AlertOutlined />}
                  title={"بخش لاگ ها"}
                />
              </Auth>
              <Auth
                accessList={[
                  "کاربران",
                  "تعریف کاربر",
                  "الگوی دسترسی",
                  "مدیریت اشخاص حقیقی",
                  "مدیریت اشخاص حقوقی",
                  "مدیریت سمت سازمانی",
                  "افزودن فرم",
                ]}
              >
                <CustomMenuItem
                  icon={<DatabaseOutlined />}
                  title={"بخش اطلاعات پایه"}
                  dropdown={
                    <>
                      <Auth accessList={["کاربران", "تعریف کاربر"]}>
                        <CustomMenuItem
                          href={"/users"}
                          icon={<UserOutlined />}
                          title={"مدیریت کاربران"}
                        />
                      </Auth>
                      <Auth accessList={["الگوی دسترسی"]}>
                        <CustomMenuItem
                          href={"/roles"}
                          icon={<FileProtectOutlined />}
                          title={"مدیریت نقش ها"}
                        />
                      </Auth>
                      <Auth accessList={["مدیریت اشخاص حقیقی"]}>
                        <CustomMenuItem
                          href={"/people"}
                          icon={<UsergroupAddOutlined />}
                          title={"مدیریت اشخاص حقیقی"}
                        />
                      </Auth>

                      <Auth accessList={["مدیریت اشخاص حقوقی"]}>
                        <CustomMenuItem
                          href={"/legal-people"}
                          icon={<UsergroupAddOutlined />}
                          title={"مدیریت اشخاص حقوقی"}
                        />
                      </Auth>
                      <Auth accessList={["مدیریت سمت سازمانی"]}>
                        <CustomMenuItem
                          href={"/applicants"}
                          icon={<ClusterOutlined />}
                          title={"سمت سازمانی"}
                        />
                      </Auth>
                      <Auth accessList={["افزودن فرم"]}>
                        <CustomMenuItem
                          href={"/forms"}
                          icon={<ClusterOutlined />}
                          title={"فرم ساز"}
                        />
                      </Auth>
                    </>
                  }
                />
              </Auth>

              <Auth accessList={["مدیریت اطلاعات پایه"]}>
                <CustomDialog
                  title={"تنظیمات برنامه"}
                  render={
                    <AppSettingDialog
                      setIsShowAppSetting={setIsShowAppSetting}
                    />
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
              </Auth>

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
