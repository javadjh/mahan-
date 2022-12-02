import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { fancyTimeFormat } from "../../../utility/timeUtility";

const MP4PlayerComponent = ({ url, deleteFlagHandle, addNewFlagHandle }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startSecond, setStartSecond] = useState(0);
  const [endSecond, setEndSecond] = useState(0);
  const [flagProgress, setFlagProgress] = useState(0);
  const [player, setPlayer] = useState();
  const [flatDescription, setFlatDescription] = useState("");
  const [endPlay, setEndPlay] = useState({
    enable: false,
    end: 0,
  });
  const [isMute, setIsMute] = useState(false);
  const singleDocumentState = useSelector((state) => state.document.document);

  const playerRef = (playerRef) => {
    setPlayer(playerRef);
  };
  useEffect(() => {
    if (flagProgress > 0) {
      handleSeekTo(flagProgress);
    }
  }, [flagProgress]);
  const handleSeekTo = () => {
    // this.setState({ seeking: false })
    player.seekTo(flagProgress);
  };
  return (
    <>
      <div>
        <div className={"row mx-2"}>
          <i
            className={"mdi mdi-play custom-cursor"}
            style={{ fontSize: 20 }}
            onClick={() => {
              setPlaying(true);
            }}
          />
          <i
            className={"mdi mdi-pause mx-1 custom-cursor"}
            style={{ fontSize: 20 }}
            onClick={() => {
              setPlaying(false);
            }}
          />
          <i
            className={"mdi mdi-volume-mute mx-1 custom-cursor"}
            style={{ fontSize: 20 }}
            onClick={() => {
              setIsMute(true);
            }}
          />
          <i
            className={"mdi mdi-volume-high mx-1 custom-cursor"}
            style={{ fontSize: 20 }}
            onClick={() => {
              setIsMute(false);
            }}
          />
        </div>
        <ReactPlayer
          width={"100%"}
          ref={playerRef}
          muted={isMute}
          url={url}
          playing={playing}
          controls={true}
          onProgress={(e) => {
            setProgress(e.playedSeconds);
            if (
              endPlay.enable &&
              endPlay.end.toFixed(0) === e.playedSeconds.toFixed(0)
            ) {
              setPlaying(false);
              setEndPlay({
                enable: false,
                end: 0,
              });
            }
          }}
        />
        <div className={"row"}>
          <div className={"col-lg-6"}>
            <div
              className={"my-2 mx-4"}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span
                onClick={() => {
                  if (progress <= endSecond || endSecond === 0)
                    setStartSecond(progress);
                }}
                className={`custom-cursor mx-5 btn btn-${
                  startSecond > 0 ? "success" : "dark"
                }`}
              >
                زمان شروع {fancyTimeFormat(startSecond)}
              </span>
              <span
                onClick={() => {
                  if (progress >= startSecond) setEndSecond(progress);
                }}
                className={`custom-cursor mx-5 btn btn-${
                  endSecond > 0 ? "success" : "dark"
                }`}
              >
                زمان پایان {fancyTimeFormat(endSecond)}
              </span>
            </div>
          </div>
          {startSecond > 0 && endSecond > 0 ? (
            <div className={"col-lg-6 mt-2"}>
              <div className={"row mx-1"}>
                <input
                  className={"form-control col-lg-10"}
                  onChange={(e) => {
                    setFlatDescription(e.target.value);
                  }}
                  placeholder={"توضیحات"}
                />
                <div className={"col-lg-2"}>
                  <button
                    className={"btn btn-success btn-block"}
                    onClick={async () => {
                      addNewFlagHandle(
                        startSecond,
                        endSecond,
                        flatDescription
                      ).then((isSuccess) => {
                        if (isSuccess) {
                          setFlatDescription("");

                          setProgress(0);
                          setStartSecond(0);
                          setEndSecond(0);
                          setFlagProgress(0);
                        }
                      });
                    }}
                  >
                    ثبت
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="table-rep-plugin">
          <div
            className="table-responsive mb-0"
            data-pattern="priority-columns"
          >
            <table id="tech-companies-1" className="table table-striped">
              <thead>
                <tr>
                  <th>شماره</th>
                  <th data-priority="1">شروع</th>
                  <th data-priority="6">پایان</th>
                  <th data-priority="6">توضیحات</th>
                  <th data-priority="6">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {singleDocumentState?.videoFlags?.map((f, index) => (
                  <tr
                    style={
                      progress >= f.startSecond && progress <= f.endSecond
                        ? { backgroundColor: "#65af43", color: "white" }
                        : {}
                    }
                  >
                    <th>{index + 1}</th>
                    <td>
                      <span
                        style={{ color: "royalblue", cursor: "pointer" }}
                        onClick={() => {
                          setProgress(f.startSecond);
                          setFlagProgress(f.startSecond);
                          player.seekTo(f.startSecond);
                          setPlaying(true);
                          setEndPlay({
                            enable: true,
                            end: f.endSecond,
                          });
                        }}
                      >
                        <i className={"mdi mdi-play"} />
                        {fancyTimeFormat(f.startSecond)}
                      </span>
                    </td>
                    <td>{fancyTimeFormat(f.endSecond)}</td>
                    <td>{f.description}</td>
                    <td>
                      <i
                        onClick={() => {
                          deleteFlagHandle(f._id);
                        }}
                        className={"mdi mdi-close-circle-outline mx-2 mt-2"}
                        style={{
                          color: `${
                            progress > f.startSecond && progress < f.endSecond
                              ? "white"
                              : "red"
                          }`,
                          fontSize: 14,
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default MP4PlayerComponent;
