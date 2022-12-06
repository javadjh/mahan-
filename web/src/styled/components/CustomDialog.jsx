import React, { useState } from "react";
import { Modal } from "antd";
import styled from "styled-components";
import { CloseCircleFilled } from "@ant-design/icons";
import { useEffect } from "react";
const CustomDialog = (props) => {
  const [visible, setVisible] = useState(props.isShow);
  const [modalInfo, setModalInfo] = useState({
    ...{
      centered: true,
      footer: null,
      maskClosable: false,
      title: props.title,
      closeIcon: (
        <CloseCircleFilled
          onClick={() => {
            setVisible(false);
            if (props.setIsShow) props.setIsShow(false);
          }}
          style={{ color: "white", fontSize: 20 }}
        />
      ),
      maskStyle: {
        backdropFilter: "blur(3px)",
        backgroundColor: "#21212199",
      },
      onCancel: () => {
        setVisible(false);
        if (props.setIsShow) props.setIsShow(false);
      },
    },
  });
  useEffect(() => {
    setVisible(props.isShow);
  }, [props]);
  return (
    <>
      <span onClick={() => setVisible(true)}>{props.actionRender}</span>
      <Modal
        visible={visible}
        width={props.width ? props.width : "50%"}
        {...modalInfo}
        {...props}
      >
        {props.render}
      </Modal>
    </>
  );
};
const IconWrapper = styled.div`
  height: 2rem;
  width: 2rem;
  border-radius: 100%;
  color: white;
  background-color: #fff;
  transform: translate(-0.5rem, 0.5rem);
`;
export default CustomDialog;
