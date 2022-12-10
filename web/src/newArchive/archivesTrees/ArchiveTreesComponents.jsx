import React, { useContext } from "react";
import { ArchiveTreeContext } from "../../context/ArchiveTree/ArchiveTreesContext";
import { archiveTreesDataAction } from "../../stateManager/actions/ArchiveTreeAction";
import TreeItem from "./TreeItem";

const ArchiveTreesComponents = () => {
  const { archiveTrees, setMainParent, setRoutes, routes, dispatch } =
    useContext(ArchiveTreeContext);
  const addTree = async (tree) => {
    let routesCopy = [...routes];
    routesCopy.push({
      label: tree.title,
      value: tree._id,
      obj: tree,
    });
    setRoutes(routesCopy);
    setMainParent(tree);
    await dispatch(archiveTreesDataAction({ routes: routesCopy }));
    await dispatch(archiveTreesDataAction({ mainParent: tree }));
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
