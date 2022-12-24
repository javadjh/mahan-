import React, { useEffect, useState } from "react";
import { Dropdown, Form, Input, Menu, Select } from "antd";
import styled from "styled-components";
import { SpaceStyled } from "../global";
import { useDispatch, useSelector } from "react-redux";
import { searchEngineAction } from "../../stateManager/actions/FileAction";
import { useHistory } from "react-router";
import CustomLabel from "./CustomLabel";
import Auth from "../../auth/Auth";

const SearchInputComponent = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const files = useSelector((state) => state.search.files);
  const documents = useSelector((state) => state.search.documents);
  useEffect(() => {
    getData();
  }, [searchValue]);
  const getData = async () => {
    await dispatch(
      searchEngineAction({
        searchValue,
      })
    );
  };
  const onFilesTargetHandler = (target) => {
    let result = "";
    target.map((item) => {
      switch (item) {
        case "title":
          result += ` عنوان ، `;
          break;
        case "fileCode":
          result += " شماره پرونده ، ";
          break;
        case "fileStatus":
          result += " وضعیت پرونده ، ";
          break;
        case "keyword":
          result += " کلیدواژه ، ";
          break;
        case "type":
          result += " نوع ، ";
          break;
        case "archiveTreeId":
          result += " درخت ، ";
          break;
        case "form":
          result += " روکش پرونده ، ";
          break;
      }
    });
    result = result.substring(0, result.length - 2);
    return result;
  };
  const onDocumentsTargetHandler = (target) => {
    let result = "";
    target.map((item) => {
      switch (item) {
        case "title":
          result += ` عنوان ، `;
          break;
        case "documentName":
          result += " نام فایل سند ، ";
          break;
        case "note":
          result += " یادداشت ، ";
          break;
        case "flag":
          result += " تگ ویدیو ، ";
          break;
        case "OCR":
          result += " متن تصویر ، ";
          break;
      }
    });
    result = result.substring(0, result.length - 2);
    return result;
  };
  return (
    <SpaceStyled vertical={20} horizontal={20}>
      <Form>
        <Form.Item>
          <Auth accessList={["جستجوی پیشرفته اسناد"]}>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <CustomLabel title="پرونده ها" />
                    {files.map((f) => (
                      <div
                        className={"p-1 dropdown-item custom-cursor"}
                        onClick={() => {
                          history.push({
                            pathname: "/file/" + f._id + "/0",
                            state: {
                              archiveId: f.archiveId._id,
                              fileId: f._id,
                              hasForm: f.archiveId.isFormRequired,
                            },
                          });
                        }}
                      >
                        <a style={{ fontSize: 16 }} className="m-0 p-0">
                          {f.title}
                        </a>
                        <br />
                        <a
                          style={{ color: "#aeaeae", fontSize: 13 }}
                          className="m-0 p-0"
                        >
                          {f.archiveTreeId.route}
                        </a>
                        <br />
                        <a
                          style={{
                            color: "black",
                            backgroundColor: "yellow",
                          }}
                        >
                          یافته شده در : {onFilesTargetHandler(f.target)}
                        </a>
                      </div>
                    ))}
                    <CustomLabel title="اسناد" />
                    {documents.map((d) => (
                      <div
                        className={"p-1 dropdown-item custom-cursor"}
                        onClick={() => {
                          history.push({
                            pathname: `/document/${d.fileId._id}/${d._id}`,
                          });
                        }}
                      >
                        <a style={{ fontSize: 16 }} className="m-0 p-0">
                          {d.title.length > 30
                            ? d.title.substr(0, 30) + "..."
                            : d.title}
                        </a>
                        <br />
                        <a
                          style={{ color: "#aeaeae", fontSize: 13 }}
                          className="m-0 p-0"
                        >
                          {d.fileId.title.length > 30
                            ? d.fileId.title.substr(0, 30) + "..."
                            : d.fileId.title}
                        </a>
                        <br />
                        <a
                          style={{
                            color: "black",
                            backgroundColor: "yellow",
                          }}
                        >
                          یافته شده در : {onDocumentsTargetHandler(d.target)}
                        </a>
                      </div>
                    ))}
                  </Menu.Item>
                </Menu>
              }
            >
              <Input
                onChange={(e) => {
                  setSearchValue(e.target.value || "");
                }}
                className="ant-search-custom"
                placeholder="موتور جستجو..."
              />
            </Dropdown>
          </Auth>
        </Form.Item>
      </Form>
    </SpaceStyled>
  );
};
export default SearchInputComponent;
