import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { RootContext } from "./RootContext";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";
const SidebarRootComponent = () => {
  const { access, handleHide } = useContext(RootContext);
  const appInfo = useSelector((state) => state.appInfo);
  return (
    <div className="vertical-menu text-center pb-5">
      <div>
        <Link to={"/"} data-tip={"داشبورد"} style={{ cursor: "pointer" }}>
          <img
            src={
              appInfo.logo
                ? `http://192.168.2.24:5000/${appInfo.logo}`
                : "./assets/images/logo.png"
            }
            width={50}
            height={50}
            className={"mt-3"}
          />
        </Link>
        <ReactTooltip />
        <br />
        <hr className={"mt-2 mx-0 mb-0 p-0"} />
      </div>
      <Link to={"/"} data-tip={"داشبورد"} style={{ cursor: "pointer" }}>
        <div>
          <img
            src="./assets/images/chart3d.png"
            width={50}
            height={50}
            className={"mt-3"}
          />
          <ReactTooltip />
          <br />
          <hr className={"mt-2 mx-0 mb-0 p-0"} />
        </div>
      </Link>
      {/*<div>
                <Link to={"/archive-trees"} data-tip={"درخت بایگانی"} style={{cursor:"pointer"}}>
                    <img src="./assets/images/archive3d.png" width={50} height={50} className={"mt-3"}/>
                </Link>
                <ReactTooltip  />
                <br/>
                <hr className={"mt-2 mx-0 mb-0 p-0"}/>
            </div>*/}
      <Link
        to={"/archive-trees"}
        data-tip={"بایگانی"}
        style={{ cursor: "pointer" }}
      >
        <div>
          <img
            src="./assets/images/list3d.png"
            width={50}
            height={50}
            className={"mt-3"}
          />

          <ReactTooltip />
          <br />
          <hr className={"mt-2 mx-0 mb-0 p-0"} />
        </div>
      </Link>
      <Link to={"/library"} data-tip={"کازیو"} style={{ cursor: "pointer" }}>
        <div>
          <img
            src="./assets/images/library3d.png"
            width={50}
            height={50}
            className={"mt-3"}
          />
          <ReactTooltip />
          <br />
          <hr className={"mt-2 mx-0 mb-0 p-0"} />
        </div>
      </Link>
      <Link
        to={"/lends"}
        data-tip={"اشتراک گذاری"}
        style={{ cursor: "pointer" }}
      >
        <div>
          <img
            src="./assets/images/check3d.png"
            width={50}
            height={50}
            className={"mt-3"}
          />
          <ReactTooltip />
          <br />
          <hr className={"mt-2 mx-0 mb-0 p-0"} />
        </div>
      </Link>
      <Link
        to={"/files-guard-system"}
        data-tip={"ناظر"}
        style={{ cursor: "pointer" }}
      >
        <div hidden={handleHide("ناظر")}>
          <img
            src="./assets/images/supervisor.png"
            width={50}
            height={50}
            className={"mt-3"}
          />

          <ReactTooltip />
          <br />
          <hr className={"mt-2 mx-0 mb-0 p-0"} />
        </div>
      </Link>
      <Link
        to={"/reporting"}
        data-tip={"گزارش گیری"}
        style={{ cursor: "pointer" }}
      >
        <div hidden={handleHide("گزارش گیری")}>
          <img
            src="./assets/images/report.png"
            width={50}
            height={50}
            className={"mt-3"}
          />

          <ReactTooltip />
          <br />
          <hr className={"mt-2 mx-0 mb-0 p-0"} />
        </div>
      </Link>
      <Link
        to={"/logs"}
        data-tip={"تاریخچه تغییرات"}
        style={{ cursor: "pointer" }}
      >
        <div hidden={handleHide("تاریخچه تغییرات")}>
          <img
            src="./assets/images/logs.png"
            width={50}
            height={50}
            className={"mt-3"}
          />

          <ReactTooltip />
          <br />
          <hr className={"mt-2 mx-0 mb-0 p-0"} />
        </div>
      </Link>

      <Link
        to={"/files-alerts"}
        data-tip={"هشدار ها"}
        style={{ cursor: "pointer" }}
      >
        <div>
          <img
            src="./assets/images/filesalerts.png   "
            width={50}
            height={50}
            className={"mt-3"}
          />

          <ReactTooltip />
          <br />
          <hr className={"mt-2 mx-0 mb-0 p-0"} />
        </div>
      </Link>
    </div>
  );
};
export default SidebarRootComponent;
