import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import axios from "axios";
const PdfPreviewComponent = () => {
  const [file, setFile] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(1);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(parseInt(numPages));
    setPageNumber(1);
  };

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    } else {
      setPageNumber(1);
    }
  };

  return (
    <div
      className="modal fade"
      id="pdfPreviewDialog"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content p-4">
          <div>
            <div className="Example">
              <header>
                <h1>React PDF Sample</h1>
              </header>
              <div className="Example__container">
                <div className="Example__container__load">
                  <label htmlFor="file">انتخاب از فایل:</label>{" "}
                  <input onChange={onFileChange} type="file" />
                  <hr />
                </div>
                {file ? (
                  <React.Fragment>
                    <div className="Example__container__document">
                      <Document file={file} onLoadSuccess={onLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                      </Document>
                    </div>

                    {numPages > 1 ? (
                      <div className="pagination">
                        {pageNumber < numPages && (
                          <button className="button" onClick={handleNextPage}>
                            بعدی
                          </button>
                        )}

                        {pageNumber > 1 && (
                          <button className="button" onClick={handlePrevPage}>
                            قبلی
                          </button>
                        )}
                      </div>
                    ) : null}
                    <div className="pagination">
                      <p>
                        صفحه {pageNumber} از {numPages}
                      </p>
                    </div>
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PdfPreviewComponent;
