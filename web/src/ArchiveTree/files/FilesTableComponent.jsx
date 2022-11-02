import React, { useContext } from "react";
import { ArchiveTreeContext } from "../ArchiveTreeContext";
import { useDispatch } from "react-redux";
import { changeManualFileFormAction } from "../../stateManager/actions/FileAction";
const FilesTableComponent = ({ files, hasForm, history, archiveId }) => {
  const dispatch = useDispatch();
  const { setFileId } = useContext(ArchiveTreeContext);
  return (
    <div className="table-rep-plugin">
      <div className="table-responsive mb-0" data-pattern="priority-columns">
        <table id="tech-companies-1" className="table table-striped">
          <thead>
            <tr>
              <th>شماره</th>
              <th data-priority="1">عنوان</th>
              <th data-priority="6">نوع</th>
              <th data-priority="6">وضعیت</th>
              <th data-priority="6">شماره پرونده</th>
              <th data-priority="6">تاریخ</th>
              <th data-priority="6">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {files.map((f, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{f.title}</td>
                <td>{f.type}</td>
                <td>{f.fileStatus}</td>
                <td>{f.fileCode}</td>
                <td>{f.fileDate}</td>
                <td>
                  <div className="row">
                    {/*{hasForm?(
                                        // <i className="mdi mdi-newspaper mx-1" style={{fontSize:16,color:"orange",cursor:"pointer"}} />
                                    ):null}*/}
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
                            archiveId: archiveId,
                            fileId: f._id,
                            hasForm,
                          },
                        });
                      }}
                    >
                      dcdcd
                    </i>
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
export default FilesTableComponent;
