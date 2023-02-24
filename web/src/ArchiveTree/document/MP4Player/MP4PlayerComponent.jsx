import { Col, Divider, Image, Input, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import {
  darkBlueColor,
  greenBlueColor,
  lightGreenColor,
  orangeColor,
  redColor,
} from "../../../app/appColor";
import { FRONT_IP } from "../../../config/ip";
import CustomButton from "../../../styled/components/CustomButton";
import CustomInput from "../../../styled/components/CustomInput";
import CustomPopConfirm from "../../../styled/components/CustomPopConfirm";
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
  console.log(doc?.videoFlags);
  const columns = [
    {
      title: "زمان بندی",
      key: "listen",
      render: (item) => (
        <span
          onClick={() => {
            setProgress(item.startSecond);
            setFlagProgress(item.startSecond);
            player.seekTo(item.startSecond);
            setPlaying(true);
            setEndPlay({
              enable: true,
              end: item.endSecond,
            });
          }}
        >
          <CustomButton>برو به این زمان</CustomButton>
        </span>
      ),
    },
    {
      title: "انجام دهنده تگ",
      key: "creator",
      render: (item) => (
        <span>{item?.creator ? item.creator.userName : ""}</span>
      ),
    },
    {
      title: "زمان شروع",
      key: "startSecond",
      dataIndex: "startSecond",
      render: (startSecond) => <span>{fancyTimeFormat(startSecond)}</span>,
    },
    {
      title: "زمان پایان",
      key: "endSecond",
      dataIndex: "endSecond",
      render: (endSecond) => <span>{fancyTimeFormat(endSecond)}</span>,
    },
    {
      title: "تووضیحات",
      key: "description",
      dataIndex: "description",
    },

    {
      title: "عملیات",
      key: "action",
      width: "20%",
      render: (item) => (
        <>
          <CustomPopConfirm
            onDelete={() => {
              deleteFlagHandle(item._id);
            }}
            render={<CustomButton color={redColor}>حذف تگ</CustomButton>}
          />
        </>
      ),
    },
  ];
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
        <Divider orientation="right">ثبت برش ویدیو و توضیحات</Divider>
        <Row>
          <Col span={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SpaceStyled bottom={10} top={-15} horizontal={5}>
                <CustomButton
                  icon={
                    <Image
                      preview={false}
                      style={{ marginTop: -5 }}
                      src={FRONT_IP + "/assets/icons/clock-ic.png"}
                    />
                  }
                  onClick={() => {
                    if (progress <= endSecond || endSecond === 0)
                      setStartSecond(progress);
                  }}
                  color={startSecond > 0 ? darkBlueColor : greenBlueColor}
                >
                  زمان شروع {fancyTimeFormat(startSecond)}
                </CustomButton>
              </SpaceStyled>
              <SpaceStyled bottom={10} top={-15} horizontal={5}>
                <CustomButton
                  icon={
                    <Image
                      preview={false}
                      style={{ marginTop: -5 }}
                      src={FRONT_IP + "/assets/icons/clock-ic.png"}
                    />
                  }
                  onClick={() => {
                    if (progress >= startSecond) setEndSecond(progress);
                  }}
                  color={endSecond > 0 ? darkBlueColor : orangeColor}
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
                  <SpaceStyled bottom={10} top={-15} horizontal={5}>
                    <Input
                      onChange={(e) => {
                        setFlatDescription(e.target.value);
                      }}
                      placeholder={
                        "توضیحات تگ ویدیو ( برای مثال :‌ بخش آموزش بارگزاری اسناد بین المللی)"
                      }
                    />
                  </SpaceStyled>
                </Col>
                <Col span={7}>
                  <SpaceStyled top={-35} horizontal={5}>
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
                      ثبت تگ
                    </CustomButton>
                  </SpaceStyled>
                </Col>
              </Row>
            </Col>
          ) : null}
        </Row>
        <Divider orientation="right">اطلاعات برش های ثبت شده</Divider>
        <Table
          rowClassName={(record, index) =>
            progress >= record.startSecond && progress <= record.endSecond
              ? "table-row-dark"
              : "table-row-light"
          }
          columns={columns}
          dataSource={doc?.videoFlags}
          pagination={false}
        />
      </div>
    </>
  );
};
export default MP4PlayerComponent;
