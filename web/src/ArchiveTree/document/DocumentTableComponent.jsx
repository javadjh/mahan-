import React from "react";
import { useDispatch } from "react-redux";
import { reportDamageDocumentAction } from "../../stateManager/actions/DocumentAction";
const DocumentTableComponent = ({
  documents,
  onOpenAlertDialogHandle,
  handleSetSingleDocumentId,
  documentsSelected,
  setDocumentsSelected,
  setIsShoeDocBlock,
  handleHide,
  getSingleDocument,
  history,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="table-rep-plugin">
      <div className="table-responsive mb-0" data-pattern="priority-columns">
        <table id="tech-companies-1" className="table table-striped">
          <thead>
            <tr>
              <th>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    onClick={(e) => {
                      if (e.target.checked) {
                        setDocumentsSelected(documents);
                      } else {
                        setDocumentsSelected([]);
                      }
                    }}
                    id={"checkAll"}
                  />
                  <label className="custom-control-label" htmlFor={"checkAll"}>
                    همه
                  </label>
                </div>
              </th>
              <th data-priority="6">عنوان</th>
              <th data-priority="6">حجم</th>
              <th data-priority="6">فرمت</th>
              <th data-priority="6">تاریخ ایجاد</th>
              <th data-priority="6">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((d, index) => (
              <tr
                className={"custom-cursor"}
                style={{ width: "100% !important" }}
                onDoubleClick={() => {
                  setIsShoeDocBlock(true);
                  handleSetSingleDocumentId(d._id);
                  getSingleDocument();
                }}
              >
                <th>
                  <div className="custom-control custom-checkbox col-lg-5">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      checked={documentsSelected.includes(d)}
                      onClick={() => {
                        let documentsSelectedCopy = [...documentsSelected];
                        if (documentsSelected.includes(d)) {
                          documentsSelectedCopy = documentsSelectedCopy.filter(
                            (f) => f._id !== d._id
                          );
                        } else {
                          documentsSelectedCopy.push(d);
                        }
                        setDocumentsSelected(documentsSelectedCopy);
                      }}
                      id={d._id}
                    />
                    <label className="custom-control-label" htmlFor={d._id}>
                      {index + 1}
                    </label>
                  </div>
                </th>
                <td>{d.title}</td>
                <td dir={"ltr"}>{d.documentSize}</td>
                <td>{d.ex}</td>
                <td>{d.createDate}</td>
                <td>
                  <div className="btn-group">
                    <i
                      hidden={handleHide("نمایش سندها")}
                      className="mdi mdi-eye custom-cursor m-0 p-0"
                      style={{ color: "royalblue", fontSize: 15 }}
                      onClick={() => {
                        setIsShoeDocBlock(true);
                        handleSetSingleDocumentId(d._id);
                      }}
                    />
                    <i
                      hidden={handleHide("حذف سند")}
                      className="mdi mdi-delete custom-cursor mx-2 p-0"
                      style={{ color: "red", fontSize: 15 }}
                      onClick={() => {
                        onOpenAlertDialogHandle(d);
                      }}
                    />
                    <i
                      hidden={handleHide("نمایش سندها")}
                      className="fas fa-pencil-alt mx-2 p-0 mt-1"
                      style={{ color: "black", fontSize: 11 }}
                      onClick={() => {
                        history.push(`/edit-${d._id}-${d.lastDocumentId}`);
                      }}
                    />
                    {/*<i className="mdi mdi-flag custom-cursor mx-2 p-0" style={{color:"black",fontSize:15}}  onClick={ async ()=>{
                                        await dispatch(reportDamageDocumentAction(d._id))
                                    }}/>*/}
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
export default DocumentTableComponent;
