import React, { useContext } from "react";
import { UpsertRoleContext } from "./UpsertRoleContext";
const SecondInformationUpsertRoleComponent = ({ access }) => {
  const { addAccessListHandle } = useContext(UpsertRoleContext);
  const titleBlock = (index) => {
    switch (index) {
      case 0:
        return (
          <>
            <h5 className={"mt-4"}>بایگانی</h5>
            <hr className={"m-0 p-0"} />
          </>
        );
      case 5:
        return (
          <>
            <h5 className={"mt-5"}>سند</h5>
            <hr className={"m-0 p-0"} />
          </>
        );

      case 14:
        return (
          <>
            <h5 className={"mt-5"}>عمومی</h5>
            <hr className={"m-0 p-0"} />
          </>
        );

      case 15:
        return (
          <>
            <h5 className={"mt-5"}>مدیریت</h5>
            <hr className={"m-0 p-0"} />
          </>
        );

      case 28:
        return (
          <>
            <h5 className={"mt-5"}>پرونده</h5>
            <hr className={"m-0 p-0"} />
          </>
        );
    }
  };

  return (
    <div className="col-lg-6">
      <div className="card card-body mx-2">
        <div className={"mx-3"}>
          <h4 className="card-title">دسترسی ها</h4>
          <p className="card-title-desc">
            در این قسمت ، سطوح دسترسی هر نقش تعیین میگردد.
          </p>
          <div className="button-items">
            {access.map((a, index) => (
              <>
                {titleBlock(index)}
                <div className="custom-control custom-checkbox col-lg-6 mt-2">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    onClick={(e) => {
                      addAccessListHandle(a);
                    }}
                    checked={a.isSelected}
                    id={a.title}
                  />
                  <label className="custom-control-label" htmlFor={a.title}>
                    {a.title}
                  </label>
                </div>
                {/*<p>{a.description}</p>*/}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SecondInformationUpsertRoleComponent;
