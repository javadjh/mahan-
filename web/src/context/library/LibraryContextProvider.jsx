import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LibraryContext } from "../../Library/LibraryContext";
import { getArchiveFilesArchive } from "../../stateManager/actions/FileAction";

const LibraryContextProvider = () => {
  const dispatch = useDispatch();
  const [archivesFileSearchValue, setArchivesFileSearchValue] = useState("");
  useEffect(() => {
    getArchivesFile();
  }, [archivesFileSearchValue]);

  const getArchivesFile = async () => {
    await dispatch(
      getArchiveFilesArchive({
        archiveId: archive,
        searchValue: archivesFileSearchValue,
      })
    );
  };
  return (
    <LibraryContext.Provider
      value={{ setArchivesFileSearchValue }}
    ></LibraryContext.Provider>
  );
};
export default LibraryContextProvider;
