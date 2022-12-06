import React, { Fragment, useEffect, useState } from "react";
import MainLayout from "../../RootComponent/MainLayout";
import AlertDialog from "../../utility/AlertDialog";
import FormsTableComponent from "../../Form/forms/FormsTableComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteArchiveAction,
  getAllArchivesAction,
} from "../../stateManager/actions/ArchiveAction";
import InsertArchiveDialog from "../insertArchive/InsertArchiveDialog";
import { getAllFormsAction } from "../../stateManager/actions/FormAction";
import { useHistory } from "react-router";
import { lightGreenColor } from "../../app/appColor";
import CustomButton from "../../styled/components/CustomButton";
import CustomDialog from "../../styled/components/CustomDialog";
import ArchivesTableComponent from "../../components/archives/ArchivesTableComponent";
import { SpaceStyled } from "../../styled/global";
const ArchivesRootComponent = () => {
  const [isUpsertDialogShow, setIsUpsertDialogShow] = useState(false);
  const archives = useSelector((state) => state.archives);
  const dispatch = useDispatch();
  const [singleArchive, setSingleArchive] = useState({});
  const [singleId, setSingleId] = useState();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await dispatch(getAllArchivesAction());
    await dispatch(getAllFormsAction());
  };

  const deleteArchiveHandle = (id) => {
    setSingleId(id);
    // window.$("#alertDialog").modal("show");
  };

  const upsertArchiveHandle = (archive) => {
    setSingleArchive(archive);
    setIsUpsertDialogShow(true);
  };
  const deleteArchive = async (id) => {
    await dispatch(deleteArchiveAction(id));
  };
  return (
    <Fragment>
      <CustomDialog
        title={"بایگانی"}
        render={
          <InsertArchiveDialog
            singleArchive={singleArchive}
            setIsUpsertDialogShow={setIsUpsertDialogShow}
          />
        }
        actionRender={
          <CustomButton
            onClick={() => {
              setSingleArchive({});
              setIsUpsertDialogShow(true);
            }}
            color={lightGreenColor}
          >
            بایگانی
          </CustomButton>
        }
        isShow={isUpsertDialogShow}
      />
      <SpaceStyled top={20}>
        <ArchivesTableComponent
          archives={archives}
          deleteArchive={deleteArchive}
          upsertArchiveHandle={upsertArchiveHandle}
        />
      </SpaceStyled>
    </Fragment>
  );
};
export default ArchivesRootComponent;
