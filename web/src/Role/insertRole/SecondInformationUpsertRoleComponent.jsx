import { Checkbox, Col, Divider, Input } from "antd";
import React, { useContext } from "react";
import CustomCard from "../../styled/components/CustomCard";
import { CenterVerticalStyled } from "../../styled/global";
import { UpsertRoleContext } from "./UpsertRoleContext";
const SecondInformationUpsertRoleComponent = ({ access }) => {
  const { addAccessListHandle } = useContext(UpsertRoleContext);
  const titleBlock = (index) => {
    switch (index) {
      case 0:
        return (
          <>
            <Divider>بایگانی</Divider>
          </>
        );
      case 5:
        return (
          <>
            <Divider>سند</Divider>
          </>
        );

      case 14:
        return (
          <>
            <Divider>عمومی</Divider>
          </>
        );

      case 15:
        return (
          <>
            <Divider>مدیریت</Divider>
          </>
        );

      case 28:
        return (
          <>
            <Divider>پرونده</Divider>
          </>
        );
    }
  };

  return (
    <Col span={12}>
      <CustomCard>
        <div>
          <h4>دسترسی ها</h4>
          <p>در این قسمت ، سطوح دسترسی هر نقش تعیین میگردد.</p>
          <div>
            {access.map((a, index) => (
              <div>
                <div>
                  <p>{titleBlock(index)}</p>
                </div>
                <div>
                  <Checkbox
                    onClick={(e) => {
                      addAccessListHandle(a);
                    }}
                    checked={a.isSelected}
                    id={a.title}
                  >
                    {a.title}
                  </Checkbox>
                </div>
                {/*<p>{a.description}</p>*/}
              </div>
            ))}
          </div>
        </div>
      </CustomCard>
    </Col>
  );
};
export default SecondInformationUpsertRoleComponent;
