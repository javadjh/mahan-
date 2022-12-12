import React from "react";
import { Result } from "antd";
import CustomButton from "../styled/components/CustomButton";
import CustomText from "../styled/components/CustomText";
import { SpaceStyled } from "../styled/global";

const InfoDialog = ({ title, setShowVisible, description }) => {
  return (
    <div>
      <Result
        title={title}
        extra={
          <>
            <SpaceStyled bottom={20}>
              <CustomText>{description}</CustomText>
            </SpaceStyled>
            <CustomButton type="primary" onClick={() => setShowVisible(false)}>
              آها ، متوجه شدم
            </CustomButton>
          </>
        }
      />
    </div>
  );
};
export default InfoDialog;
