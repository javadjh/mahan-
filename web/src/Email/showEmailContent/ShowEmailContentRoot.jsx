import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmailAction } from "../../stateManager/actions/EmailAction";
import MainLayout from "../../RootComponent/MainLayout";
import { getDocumentFileService } from "../../service/DocumentService";
import { getDocumentsFileEmailService } from "../../service/EmailService";
import useWindowDimensions from "../../utility/useWindowDimensions";

const ShowEmailContentRoot = ({ getDocumentsFileEmailHandle }) => {
  const email = useSelector((state) => state.email);
  const { width } = useWindowDimensions();

  return (
    <>
      {email._id ? (
        <>
          <div className={"mx-3"}>
            <h4 className={"mt-3 p-0"}>پرونده : {email.fileId.title}</h4>
            <p className={"m-0 p-0"}>
              فرستنده : {email.creator.firstName} {email.creator.lastName} -{" "}
              {email.creator.userName}
            </p>
            <p className={"m-0 p-0"}>تاریخ انقضا : {email.expireDate}</p>
            <p className={"m-0 p-0"}>تاریخ ارسال : {email.createDate}</p>
            <div className={"row"}>
              <div className={"col-lg-8"}>
                <div className={"card card-body"}>
                  <div className={"row"}>
                    <div className={"col-lg-6"}>
                      <p className={"mb-1"}>شماره : {email.fileId.fileCode}</p>
                      <p className={"mb-1"}>نوع : {email.fileId.type}</p>
                      <p className={"mb-1"}>
                        وضعیت : {email.fileId.fileStatus}
                      </p>
                    </div>
                    <div className={"col-lg-6"}>
                      <p className={"mb-1"}>تاریخ : {email.fileId.fileDate}</p>
                      <p className={"mb-1"}>
                        ایجاد : {email.fileId.createDate}
                      </p>
                      <p className={"mb-1"}>
                        اسناد ارسال شده : {email.documents.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={"col-lg-4 "}>
                <div className={"card card-body"}>
                  <div>
                    <h6 className={"mb-1"}>مخاطبین پرونده : </h6>
                    {email.fileId.contacts
                      ? email.fileId.contacts.map((c) => (
                          <span>{c.label} ،</span>
                        ))
                      : null}
                    <h6 className={"mb-1 mt-2"}>کلیدواژه های پرونده : </h6>
                    <span>{email.fileId.keyword}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={"row"}>
              <div className={`row col-lg-8`}>
                {email.documents.map((d) => (
                  <div className={"px-1 col-lg-4"}>
                    <div className={"card  text-center"}>
                      <div className={"px-3"}>
                        <img
                          className={"mt-1"}
                          width={90}
                          height={90}
                          src={`http://192.168.2.25:3000/assets/images/icons/${d.ex}.png`}
                        />
                        <p className={"m-0 p-0"}>{d.title.substr(0, 15)}</p>
                        <p className={"m-0 p-0"}>حجم : {d.documentSize}</p>
                        <p className={"m-0 p-0"}>ایجاد : {d.createDate}</p>
                      </div>
                      <div
                        className={"btn btn-block btn-primary m-0 py-1"}
                        onClick={() => {
                          getDocumentsFileEmailHandle(d._id, d.title, d.ex);
                        }}
                      >
                        دریافت
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={"col-lg-4"}>
                <div className={"card card-body"}>
                  {email.fileId.form
                    ? email.fileId.form.map((f) => (
                        <p>
                          <b>{f.label}</b> : {f.answer}
                        </p>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
export default ShowEmailContentRoot;
