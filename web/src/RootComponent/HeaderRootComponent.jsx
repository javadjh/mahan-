import React, { Fragment, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootContext } from "./RootContext";
import { Link } from "react-router-dom";
import { searchEngineAction } from "../stateManager/actions/FileAction";
import AppSettingDialog from "../dialog/AppSettingDialog";
import { defaultDate } from "../utility/dateUtil";
import { getUsersFileAlertsAction } from "../stateManager/actions/FileAlertAction";
const HeaderRootComponent = ({ history }) => {
  history = useHistory();
  const dispatch = useDispatch();
  const { access, handleHide } = useContext(RootContext);
  const [searchValue, setSearchValue] = useState();
  const files = useSelector((state) => state.search.files);
  const documents = useSelector((state) => state.search.documents);
  const usersFileAlerts = useSelector((state) => state.usersFileAlerts);
  const userProfile = useSelector((state) => state.userProfile);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    defaultDate(true);
    if (searchValue) getData();
    getFileAlerts();
  }, [searchValue]);
  const getData = async () => {
    await dispatch(
      searchEngineAction({
        searchValue,
      })
    );
  };
  const getFileAlerts = async () => {
    await dispatch(getUsersFileAlertsAction());
  };
  const onFilesTargetHandler = (target) => {
    let result = "";
    target.map((item) => {
      switch (item) {
        case "title":
          result += ` عنوان ، `;
          break;
        case "fileCode":
          result += " شماره پرونده ، ";
          break;
        case "fileStatus":
          result += " وضعیت پرونده ، ";
          break;
        case "keyword":
          result += " کلیدواژه ، ";
          break;
        case "type":
          result += " نوع ، ";
          break;
        case "archiveTreeId":
          result += " درخت ، ";
          break;
        case "form":
          result += " روکش پرونده ، ";
          break;
      }
    });
    result = result.substring(0, result.length - 2);
    return result;
  };
  const onDocumentsTargetHandler = (target) => {
    let result = "";
    target.map((item) => {
      switch (item) {
        case "title":
          result += ` عنوان ، `;
          break;
        case "documentName":
          result += " نام فایل سند ، ";
          break;
        case "note":
          result += " یادداشت ، ";
          break;
        case "flag":
          result += " تگ ویدیو ، ";
          break;
        case "OCR":
          result += " متن تصویر ، ";
          break;
      }
    });
    result = result.substring(0, result.length - 2);
    return result;
  };
  return (
    <>
      <header id="page-topbar" style={{ zIndex: 200 }}>
        <div className="navbar-header">
          <div className="container-fluid">
            <div className="float-right">
              <div className="dropdown d-none d-lg-inline-block ml-1 mt-2">
                <nav className="nav-area2">
                  <ul className="menu">
                    <div
                      className="dropdown d-inline-block"
                      style={{ marginTop: -10 }}
                    >
                      <div
                        className="dropdown-menu dropdown-menu-right"
                        style={{ width: 400 }}
                      >
                        {usersFileAlerts.map((d) => (
                          <div className={"mx-2"}>
                            <div>
                              <p className={"my-1 mx-0"}>
                                پرونده : <b>{d.fileId.title}</b>
                              </p>
                              <hr className={"m-1"} />
                              <p className={"my-1 mx-0"}>
                                عنوان : <b>{d.title}</b>
                              </p>
                              <p className={"my-1 mx-0"}>
                                توضیحات : {d.description}
                              </p>
                              <hr className={"m-1"} />
                              <p className={"my-1 mx-0"}>
                                ایجاد کننده : {d.creator.firstName}{" "}
                                {d.creator.lastName}
                              </p>
                              <div className={"row "}>
                                <p className={"my-1 mx-0 col-lg-6 text-left"}>
                                  ایجاد : {d.createDate}
                                </p>
                                {d.alertDate ? (
                                  <p
                                    className={"my-1 mx-0 col-lg-6 text-right"}
                                  >
                                    انقضا : {d.alertDate}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <li>
                      <div
                        className="dropdown d-inline-block"
                        style={{ marginTop: -10 }}
                      >
                        <button
                          type="button"
                          className="btn header-item waves-effect"
                          id="page-header-user-dropdown"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i
                            className={"mdi mdi-bell-ring"}
                            style={{ fontSize: 27 }}
                          />
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                          {usersFileAlerts.map((u, index) => (
                            <>
                              <div
                                style={{ width: 500 }}
                                className={"dropdown-item"}
                              >
                                <span style={{ color: "royalblue" }}>
                                  <h6 style={{ display: "inline" }}>
                                    {u.title}{" "}
                                  </h6>{" "}
                                  ({u.fileId.title})
                                </span>
                                <br />
                                <p className={"mt-2 mb-0 mx-0 p-0"}>
                                  {u.description}
                                </p>
                                <div style={{ width: 450 }}>
                                  <p className={"text-right m-0 p-0"}>
                                    {u.createDate}
                                  </p>
                                </div>
                              </div>
                              {usersFileAlerts.length !== index + 1 ? (
                                <hr className={"m-0 p-0"} />
                              ) : null}
                            </>
                          ))}
                        </div>
                      </div>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src={
                            userProfile.profileImage
                              ? `http://192.168.2.25:5000/${userProfile._id}/${userProfile.profileImage}`
                              : "./assets/images/profile.png"
                          }
                          alt="Cinque Terre"
                          width="30"
                          height="30"
                          style={{
                            borderRadius: 200,
                            marginLeft: 8,
                            marginTop: -5,
                          }}
                        />
                        <span style={{ marginTop: -5 }}>
                          {userProfile.lastName ? (
                            <>
                              {userProfile.firstName}{" "}
                              {userProfile.lastName.length > 5
                                ? userProfile.lastName.substr(0, 5) + ".."
                                : userProfile.lastName}
                            </>
                          ) : null}
                        </span>
                      </a>

                      <ul>
                        <li>
                          <Link>
                            <span
                              onClick={() => {
                                window.$("#userProfileDialog").modal("show");
                              }}
                            >
                              نمایه کاربری
                            </span>
                          </Link>
                        </li>
                        <li
                          onClick={() => {
                            window.$("#resetPasswordDialog").modal("show");
                          }}
                        >
                          <Link>تغییر کلمه عبور</Link>
                        </li>
                        <li
                          onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                          }}
                        >
                          <Link>خروج</Link>
                        </li>
                      </ul>
                    </li>

                    {/*<li className={"mx-3"} onClick={()=>{
                                            localStorage.clear()
                                            window.location.reload()
                                        }} style={{marginTop:11}}>
                                            <i className={"mdi mdi-logout"}
                                               style={{color:"white",
                                                   fontSize:20,
                                               }}/>
                                        </li>*/}
                    <li>
                      <a href="#">مدیریت</a>
                      <ul>
                        <li>
                          <Link to={"/users"} hidden={handleHide("کاربران")}>
                            مدیریت کاربران
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/roles"}
                            hidden={handleHide("الگوی دسترسی")}
                          >
                            مدیریت نقش ها
                          </Link>
                        </li>
                        <li>
                          <Link to={"/forms"} hidden={handleHide("افزودن فرم")}>
                            مدیریت فرم ها
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/archives"}
                            hidden={handleHide("ایجاد بایگانی")}
                          >
                            مدیریت بایگانی
                          </Link>
                        </li>
                        <li>
                          <a>
                            <span
                              onClick={() => {
                                setVisible(true);
                              }}
                            >
                              تنظیمات عمومی
                            </span>
                            <AppSettingDialog
                              setVisible={setVisible}
                              visible={visible}
                            />
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">اطلاعات پایه</a>

                      <ul>
                        <li>
                          <Link
                            to={"/people"}
                            hidden={handleHide("مدیریت اشخاص حقیقی")}
                          >
                            اشخاص حقیقی
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/legal-people"}
                            hidden={handleHide("مدیریت اشخاص حقوقی")}
                          >
                            اشخاص حقوقی
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/applicants"}
                            hidden={handleHide("مدیریت سمت سازمانی")}
                          >
                            سمت سازمانی
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className={"ml-5"}>
              {/*<div className="navbar-brand-box">
                                <a href="index.html" className="logo logo-dark">
                                        <span className="logo-sm">
                                            <img src="./assets/images/logo-sm.png" alt="" height="20"/>
                                        </span>
                                    <span className="logo-lg">
                                            <img src="./assets/images/logo-dark.png" alt="" height="17"/>
                                        </span>
                                </a>

                                <a href="index.html" className="logo logo-light">
                                        <span className="logo-sm">
                                            <img src="./assets/images/logo-sm.png" alt="" height="20"/>
                                        </span>
                                    <span className="logo-lg">
                                            <img src="./assets/images/logo-light.png" alt="" height="19"/>
                                        </span>
                                </a>
                            </div>*/}

              <div className={"mx-5"}>
                <form className="app-search d-none d-lg-inline-block">
                  <div className="position-relative" style={{ width: 550 }}>
                    <input
                      type="text"
                      id={"search-engine-input"}
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                      }}
                      className="form-control"
                      placeholder="جستجو ..."
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    />
                    <span className="bx bx-search-alt" />
                    <div
                      id={"search-engine-block"}
                      className="dropdown-menu dropdown-menu-right m-0 p-0"
                      style={{ minWidth: 450 }}
                    >
                      <div
                        style={{ backgroundColor: "#e9e9e9" }}
                        className={"m-0 p-0"}
                      >
                        <p className={"my-0 mx-2 p-0"}>پرونده</p>
                        <hr className={"m-0 p-0"} />
                      </div>
                      {files.map((f) => (
                        <div
                          className={"p-1 dropdown-item custom-cursor"}
                          onClick={() => {
                            history.push({
                              pathname: "/upsert-document",
                              state: {
                                archiveId: f.archiveId._id,
                                fileId: f._id,
                                hasForm: f.archiveId.isFormRequired,
                              },
                            });
                          }}
                        >
                          <a style={{ fontSize: 16 }} className="m-0 p-0">
                            {f.title}
                          </a>
                          <br />
                          <a
                            style={{ color: "#aeaeae", fontSize: 13 }}
                            className="m-0 p-0"
                          >
                            {f.archiveTreeId.route}
                          </a>
                          <br />
                          <a
                            style={{
                              color: "black",
                              backgroundColor: "yellow",
                            }}
                          >
                            یافته شده در : {onFilesTargetHandler(f.target)}
                          </a>
                        </div>
                      ))}
                      <div
                        style={{ backgroundColor: "#e9e9e9" }}
                        className={"m-0 p-0"}
                      >
                        <p className={"my-0 mx-2 p-0"}>اسناد</p>
                        <hr className={"m-0 p-0"} />
                      </div>
                      {documents.map((d) => (
                        <div
                          className={"p-1 dropdown-item custom-cursor"}
                          onClick={() => {
                            history.push({
                              pathname: "/upsert-document",
                              state: {
                                archiveId: d.archiveId._id,
                                fileId: d.fileId._id,
                                hasForm: d.archiveId.isFormRequired,
                                documentId: d._id,
                                isFocused: true,
                              },
                            });
                          }}
                        >
                          <a style={{ fontSize: 16 }} className="m-0 p-0">
                            {d.title.length > 30
                              ? d.title.substr(0, 30) + "..."
                              : d.title}
                          </a>
                          <br />
                          <a
                            style={{ color: "#aeaeae", fontSize: 13 }}
                            className="m-0 p-0"
                          >
                            {d.fileId.title.length > 30
                              ? d.fileId.title.substr(0, 30) + "..."
                              : d.fileId.title}
                          </a>
                          <br />
                          <a
                            style={{
                              color: "black",
                              backgroundColor: "yellow",
                            }}
                          >
                            یافته شده در : {onDocumentsTargetHandler(d.target)}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </div>

              <button
                type="button"
                className="btn btn-sm px-3 font-size-16 header-item toggle-btn waves-effect"
                id="vertical-menu-btn"
              >
                <i className="fa fa-fw fa-bars"></i>
              </button>

              {/*<div className="row">
                                <div className="col-sm-6 mt-3">
                                    <div className="dropdown">
                                        <button className="btn btn-light dropdown-toggle px-4" type="button"
                                                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                            {localStorage.getItem("archiveTitle")?localStorage.getItem("archiveTitle"):"لطفا یک بایگانی انتخاب کنید"}
                                            <i className="mdi mdi-chevron-down"></i>
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
                                             aria-labelledby="page-header-search-dropdown">

                                            <form className="p-3">
                                                <div className="form-group m-0">
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" placeholder="جستجو ..."
                                                               aria-label="Recipient's username"/>
                                                        <div className="input-group-append">
                                                            <button className="btn btn-primary" type="submit"><i
                                                                className="mdi mdi-magnify"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>*/}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default HeaderRootComponent;
