import React, { useContext } from "react";
import { RootContext } from "../../RootComponent/RootContext";
const PeopleTableComponent = ({
  people,
  editPersonHandle,
  onDeleteClickListener,
}) => {
  const { handleHide } = useContext(RootContext);
  return (
    <div className="table-rep-plugin">
      <div className="table-responsive mb-0" data-pattern="priority-columns">
        <table id="tech-companies-1" className="table table-striped">
          <thead>
            <tr>
              <th>شماره</th>
              <th data-priority="6">نام و نام خانوادگی</th>
              <th data-priority="6">پدر</th>
              <th data-priority="6">شناسنامه</th>
              <th data-priority="6">تولد</th>
              <th data-priority="6">شماره ملی</th>
              <th data-priority="6">جنسیت</th>
              <th data-priority="6" hidden={handleHide("مدیریت اشخاص حقیقی")}>
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {people.map((person, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>
                  {person.firstName} {person.lastName}
                </td>
                <td>{person.fathersName}</td>
                <td>{person.idCode}</td>
                <td>{person.birthday}</td>
                <td>{person.melliCode}</td>
                <td>{person.gender === "man" ? "آقا" : "خانم"}</td>
                <td hidden={handleHide("مدیریت اشخاص حقیقی")}>
                  <div className="btn-group">
                    <div className="btn-group dropright">
                      <span
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="mdi mdi mdi-menu" />
                      </span>
                      <div className="dropdown-menu">
                        <a
                          className="dropdown-item"
                          onClick={() => {
                            editPersonHandle(person);
                          }}
                        >
                          ویرایش
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={() => {
                            onDeleteClickListener(person._id);
                          }}
                        >
                          حذف
                        </a>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PeopleTableComponent;
