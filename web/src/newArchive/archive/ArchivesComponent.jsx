import React from "react";
import { useSelector } from "react-redux";
import CustomText from "../../styled/components/CustomText";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  CenterVerticalStyled,
  HorizontalScroll,
  SpaceStyled,
} from "../../styled/global";

import { titleColor } from "../../app/appColor";
import ArchiveItemComponent from "./ArchiveItemComponent";
import { Col, Row } from "antd";
import { useState } from "react";
import styled from "styled-components";
const ArchivesComponent = () => {
  const usersArchives = useSelector((state) => state.usersArchives);
  const DragableCursor = styled.div`
    cursor: grab;
  `;
  return (
    <>
      <SpaceStyled bottom={20}>
        <CustomText color={titleColor} bold>
          لیست بایگانی ها
        </CustomText>
      </SpaceStyled>
      <HorizontalScroll>
        <CenterVerticalStyled>
          <Swiper
            style={{ width: "100%" }}
            spaceBetween={10}
            slidesPerView={3.5}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {usersArchives.map((archive) => (
              <SwiperSlide>
                <DragableCursor>
                  <ArchiveItemComponent archive={archive} />
                </DragableCursor>
              </SwiperSlide>
            ))}
          </Swiper>
        </CenterVerticalStyled>
      </HorizontalScroll>
    </>
  );
};
export default ArchivesComponent;
