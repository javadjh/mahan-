export const ArchiveTreesDataReducer = (
  state = {
    mainParent: undefined,
    mainTree: undefined,
    archiveTrees: [],
    files: {},
    fileFilter: {
      pageId: 1,
      eachPerPage: 12,
      searchValue: "",
    },
    routes: [
      {
        label: "شاخه ی اصلی",
      },
    ],
    documents: {},
  },
  action
) => {
  switch (action.type) {
    case "INIT_ARCHIVE_TREES_DATA":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
