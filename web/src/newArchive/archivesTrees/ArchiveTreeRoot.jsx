import { Breadcrumb, Menu } from "antd";
import React from "react";
import { useContext } from "react";
import ArchiveTreesComponents from "./ArchiveTreesComponents";
import TreeRouteComponent from "./TreeRouteComponent";

const ArchiveTreeRoot = () => {
  return (
    <>
      <TreeRouteComponent />
      <ArchiveTreesComponents />
    </>
  );
};
export default ArchiveTreeRoot;
