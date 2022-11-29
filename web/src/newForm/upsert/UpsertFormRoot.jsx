import React, { Fragment } from "react";
import FormContextProvider from "../../context/form/FormContextProvider";
import MergeBlocks from "./MergeBlocks";

const UpsertFormRoot = ({ match, history }) => {
  return (
    <FormContextProvider match={match} history={history}>
      <Fragment>
        <MergeBlocks />
      </Fragment>
    </FormContextProvider>
  );
};
export default UpsertFormRoot;
