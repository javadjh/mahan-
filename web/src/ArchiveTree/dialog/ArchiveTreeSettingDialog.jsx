import React, { Fragment, useContext, useEffect, useState } from "react";
import { ArchiveTreeContext } from "../ArchiveTreeContext";
import { ArchiveTreeLineContext } from "../archiveTreeLine/ArchiveTreeLineContext";
import {
  mainArchiveTreesFormAction,
  settingArchiveTreesAction,
} from "../../stateManager/actions/ArchiveTreeAction";
import { useDispatch, useSelector } from "react-redux";
import { RootContext } from "../../RootComponent/RootContext";
import { getAllFormsAction } from "../../stateManager/actions/FormAction";
import { Checkbox, Col, Radio, Row, Select, Space } from "antd";
import CustomButton from "../../styled/components/CustomButton";
import { SpaceStyled } from "../../styled/global";

const ArchiveTreeSettingDialog = ({ tree, reload }) => {
  const [lang, setLang] = useState("both");

  useEffect(() => {
    if (tree.title) {
      setLang(tree.lang ? tree.lang : "both");
    } else {
      setLang("both");
    }
  }, [tree]);

  const dispatch = useDispatch();
  const { handleHide } = useContext(RootContext);
  const forms = useSelector((state) => state.forms);
  const singleArchive = useSelector((state) => state.singleArchive.archive);
  const reloadMainParentArchiveTree = useSelector(
    (state) => state.reloadMainParentArchiveTree
  );
  const [form, setForm] = useState();
  const [isFormRequired, setIsFormRequired] = useState(false);
  useEffect(() => {
    getData();
    if (tree)
      if (tree._id) {
        setForm(tree.form);
        setIsFormRequired(tree.isFormRequired);
      } else {
        setForm(``);
        setIsFormRequired(false);
      }
  }, [singleArchive, tree, reloadMainParentArchiveTree]);
  const getData = async () => {
    if (!handleHide("انتخاب فرم برای بایگانی"))
      await dispatch(getAllFormsAction());
  };

  const onSubmitClickListener = async () => {
    await dispatch(settingArchiveTreesAction(tree._id, { lang }));
    if (tree)
      if (tree.isMain)
        await dispatch(
          mainArchiveTreesFormAction(tree._id, {
            formSelected: form,
            isFormRequired,
          })
        );
    reload(Date.now());
  };

  return (
    <Fragment>
      <h2>انتخاب زبان قفسه</h2>
      <Radio.Group
        value={lang}
        onChange={(e) => {
          setLang(e?.target?.value);
        }}
      >
        <Space direction="vertical">
          <Radio value={"en"} key={"en"}>
            انگلیسی (en)
          </Radio>
          <Radio value={"fa"} key={"fa"}>
            فارسی (fa)
          </Radio>
        </Space>
      </Radio.Group>
      {tree ? (
        <>
          {tree.isMain ? (
            <span hidden={handleHide("انتخاب فرم برای بایگانی")}>
              <h2>انتخاب روکش اسناد زیر مجموعه</h2>
              <Row justify="center" align="middle">
                <Col span={12}>
                  <Checkbox
                    checked={isFormRequired}
                    value={isFormRequired}
                    onChange={(e) => {
                      setIsFormRequired(e?.target?.checked);
                    }}
                  >
                    روکش سند برای این قفسه فعال شود.
                  </Checkbox>
                </Col>

                <Col span={12}>
                  {isFormRequired ? (
                    <Select
                      defaultValue={form}
                      onChange={(e) => {
                        setForm(e);
                      }}
                      style={{ width: "100%" }}
                    >
                      <Select.Option value={``} key={``}>
                        انتخاب کنید
                      </Select.Option>
                      {forms.map((f) => (
                        <Select.Option
                          selected={form === f._id}
                          value={f._id}
                          key={f._id}
                        >
                          {f.title}
                        </Select.Option>
                      ))}
                    </Select>
                  ) : null}
                </Col>
              </Row>
            </span>
          ) : null}
        </>
      ) : null}

      <SpaceStyled top={20}>
        <Row justify="end">
          <Col span={8}>
            <CustomButton block onClick={onSubmitClickListener}>
              ثبت
            </CustomButton>
          </Col>
        </Row>
      </SpaceStyled>
    </Fragment>
  );
};
export default ArchiveTreeSettingDialog;
