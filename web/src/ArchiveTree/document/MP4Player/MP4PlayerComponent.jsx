import { Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { darkBlueColor, lightGreenColor } from "../../../app/appColor";
import CustomButton from "../../../styled/components/CustomButton";
import { SpaceStyled } from "../../../styled/global";
import { fancyTimeFormat } from "../../../utility/timeUtility";

const MP4PlayerComponent = ({
  url,
  deleteFlagHandle,
  addNewFlagHandle,
  doc,
}) => {
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
        <Row>
          <Col span={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SpaceStyled vertical={10} horizontal={5}>
                <CustomButton
                  onClick={() => {
                    if (progress <= endSecond || endSecond === 0)
                      setStartSecond(progress);
                  }}
                  color={startSecond > 0 ? darkBlueColor : lightGreenColor}
                >
                  زمان شروع {fancyTimeFormat(startSecond)}
                </CustomButton>
              </SpaceStyled>
              <SpaceStyled vertical={10} horizontal={5}>
                <CustomButton
                  onClick={() => {
                    if (progress >= startSecond) setEndSecond(progress);
                  }}
                  color={endSecond > 0 ? darkBlueColor : lightGreenColor}
                >
                  زمان پایان {fancyTimeFormat(endSecond)}
                </CustomButton>
              </SpaceStyled>
            </div>
          </Col>
          {startSecond > 0 && endSecond > 0 ? (
            <Col span={12}>
              <Row justify="center" align="middle">
                <Col span={17}>
                  <SpaceStyled vertical={10} horizontal={5}>
                    <Input
                      onChange={(e) => {
                        setFlatDescription(e.target.value);
                      }}
                      placeholder={"توضیحات"}
                    />
                  </SpaceStyled>
                </Col>
                <Col span={7}>
                  <SpaceStyled vertical={10} horizontal={5}>
                    <CustomButton
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
                    </CustomButton>
                  </SpaceStyled>
                </Col>
              </Row>
            </Col>
          ) : null}
        </Row>

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
                {doc?.videoFlags?.map((f, index) => (
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
