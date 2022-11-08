import React, { useContext } from "react";
import { ArchiveTreeContext } from "../../context/ArchiveTree/ArchiveTreesContext";
import TreeItem from "./TreeItem";

const ArchiveTreesComponents = () => {
  const { archiveTrees, setMainParent, setRoutes, routes } =
    useContext(ArchiveTreeContext);
  const addTree = (tree) => {
    let routesCopy = [...routes];
    routesCopy.push({
      label: tree.title,
      value: tree._id,
      obj: tree,
    });
    setRoutes(routesCopy);
    setMainParent(tree);
  };
  return (
    <>
      {archiveTrees?.map((tree) => (
        <TreeItem tree={tree} addTree={addTree} />
      ))}
    </>
  );
};
export default ArchiveTreesComponents;
