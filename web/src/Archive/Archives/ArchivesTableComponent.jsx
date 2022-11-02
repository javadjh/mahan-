import React from "react";
const ArchivesTableComponent = ({
  archives,
  upsertArchiveHandle,
  deleteArchiveHandle,
}) => {
  return (
    <div className="table-rep-plugin">
      <div className="table-responsive mb-0" data-pattern="priority-columns">
        <table id="tech-companies-1" className="table table-striped">
          <thead>
            <tr>
              <th>شماره</th>
              <th data-priority="1">عنوان</th>
              <th data-priority="6">سازنده</th>
              <th data-priority="6">تاریخ ایجاد</th>
              <th data-priority="6">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {archives.map((a, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{a.title}</td>
                <td>{a.creator ? a.creator.userName : ""}</td>
                <td>{a.createDate}</td>
                <td>
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
                            upsertArchiveHandle(a);
                          }}
                        >
                          ویرایش
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={() => {
                            deleteArchiveHandle(a._id);
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
export default ArchivesTableComponent;
