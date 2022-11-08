import { Breadcrumb, Col, Row } from "antd";
import React from "react";
import { useContext } from "react";
import { ArchiveTreeContext } from "../../context/ArchiveTree/ArchiveTreesContext";
import {
  CenterVerticalStyled,
  CustomCursor,
  SpaceStyled,
} from "../../styled/global";
import { BsArrowRight } from "react-icons/bs";
const TreeRouteComponent = () => {
  const { setMainParent, routes, setRoutes } = useContext(ArchiveTreeContext);
  const sliceroute = (route) => {
    let newRoutes = [];
    for (let i = 0; i < routes.length; i++) {
      const item = routes[i];
      newRoutes.push(item);
      if (item.value === route.value) break;
    }
    setRoutes(newRoutes);
    setMainParent(route.obj);
  };
  const backPress = () => {
    let routesCopy = [...routes];
    setMainParent(routesCopy[routesCopy.length - 2].obj);
    routesCopy = routesCopy.slice(0, routesCopy.length - 1);
    setRoutes(routesCopy);
  };
  return (
    <SpaceStyled vertical={10}>
      <Breadcrumb>
        <Breadcrumb.Item onClick={backPress}>
          <CustomCursor>
            <BsArrowRight style={{ fontSize: 17 }} />
          </CustomCursor>
        </Breadcrumb.Item>
        {routes.map((route) => (
          <Breadcrumb.Item key={route.value} onClick={() => sliceroute(route)}>
            <CustomCursor>{route.label}</CustomCursor>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </SpaceStyled>
  );
};
export default TreeRouteComponent;
