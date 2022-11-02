import React from "react";
import ReactTooltip from "react-tooltip";
const SupervisorFilesTableComponent = ({ files, history }) => {
  console.log("filesfiles");
  console.log("filesfiles");
  console.log(files);
  return (
    <div className="table-rep-plugin">
      <div className="table-responsive mb-0" data-pattern="priority-columns">
        <table id="tech-companies-1" className="table table-striped">
          <thead>
            <tr>
              <th>شماره</th>
              <th data-priority="6">عنوان</th>
              <th data-priority="6">وضعیت</th>
              <th data-priority="6">شماره پرونده</th>
              <th data-priority="6">سازنده</th>
              <th data-priority="6">ایجاد</th>
              <th data-priority="6">قفسه</th>
              <th data-priority="6">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{file.title} </td>
                <td>{file.fileStatus}</td>
                <td>{file.fileCode}</td>
                <td>
                  {file.creator.firstName} {file.creator.lastName}
                </td>
                <td>{file.createDate}</td>
                <td>
                  <span data-tip={file.archiveTreeId.route}>
                    {file.archiveTreeId.title}
                  </span>
                  <ReactTooltip />
                </td>

                <td>
                  <i
                    className="mdi mdi-eye mx-1"
                    style={{
                      fontSize: 16,
                      color: "royalblue",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      history.push({
                        pathname: "/upsert-document",
                        state: {
                          archiveId: file.archiveTreeId.archive._id,
                          fileId: file._id,
                          hasForm: file.archiveTreeId.archive.isFormRequired,
                        },
                      });
                    }}
                  >
                    sdc
                  </i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default SupervisorFilesTableComponent;
