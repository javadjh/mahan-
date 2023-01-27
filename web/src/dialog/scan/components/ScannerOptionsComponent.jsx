import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Radio,
  Row,
  Select,
  Slider,
} from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { requiredForm } from "../../../config/formValidator";
const ScannerOptionsComponent = ({
  devices,
  file,
  onScannedListener,
  handleCancel,
  form,
}) => {
  const [devicesDPISupported, setDevicesDPISupported] = useState([
    150, 200, 300, 600,
  ]);
  const [dpi, setDpi] = useState(300);
  const [width, setWidth] = useState(2480);
  const [height, setHeight] = useState(3507);
  // const onDeviceSelected = (item) => {
  //   console.log(item);
  //   let itemIndex = devices.findIndex((deviceItem) => deviceItem.Id === item);
  //   console.log(itemIndex);
  //   setDevicesDPISupported(devices[itemIndex].SupportedResolutions);
  // };
  useEffect(() => {
    form.setFieldValue("dpi", dpi || 300);
  }, [dpi]);
  const onDPIChange = (e) => {
    console.log(e);
    setDpi(Number(e.toString()));
    switch (Number(e.toString())) {
      case 150:
        form.setFieldValue("width_pixels", 1240);
        form.setFieldValue("height_pixels", 1753);
        setWidth(1240);
        setHeight(1753);
        break;
      case 200:
        form.setFieldValue("width_pixels", 1653);
        form.setFieldValue("height_pixels", 2338);
        setWidth(1653);
        setHeight(2338);
        break;
      case 300:
        form.setFieldValue("width_pixels", 2480);
        form.setFieldValue("height_pixels", 3507);
        setWidth(2480);
        setHeight(3507);
        break;
      case 600:
        form.setFieldValue("width_pixels", 4960);
        form.setFieldValue("height_pixels", 7015);
        setWidth(4960);
        setHeight(7015);
        break;
    }
  };
  // onChange={onDeviceSelected}
  return (
    <div className="flex-second">
      <div style={{ padding: 30 }}>
        <div>انتخاب دستگاه</div>
        <Form.Item name={"deviceId"} rules={[requiredForm]}>
          <Select style={{ width: "100%" }}>
            {devices?.map((device) => (
              <Select.Option key={device.Id} value={device.Id}>
                {device.Name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div>رزولوشن</div>
        <Form.Item name={"dpi"} rules={[requiredForm]}>
          <Select
            onChange={onDPIChange}
            value={dpi}
            defaultValue={dpi}
            style={{ width: "100%" }}
          >
            {devicesDPISupported.map((dpi) => (
              <Select.Option key={dpi} value={dpi}>
                {dpi}dpi
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <label>ابعاد</label>
        <Row>
          <Col span={12}>
            <Form.Item name={"width_pixels"}>
              <Input
                disabled
                defaultValue={width}
                value={width}
                placeholder="طول را وارد کنید..."
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={"height_pixels"}>
              <Input
                disabled
                defaultValue={height}
                value={height}
                placeholder="عرض را وارد کنید..."
              />
            </Form.Item>
          </Col>
        </Row>
        <label>brightness</label>
        <Form.Item name={"brightnessPercents"}>
          <Slider defaultValue={0.5} max={1} step={0.01} />
        </Form.Item>
        <label>contrast</label>
        <Form.Item name={"contrastPercents"}>
          <Slider defaultValue={0.5} max={1} step={0.01} />
        </Form.Item>
        <Form.Item name={"colorMode"}>
          <Radio.Group defaultValue={1}>
            <Radio value={1}>رنگی</Radio>
            <Radio value={0}>سیاه سفید</Radio>
          </Radio.Group>
        </Form.Item>
        <div style={{ marginTop: 50 }}>
          <Row>
            <Col span={11}>
              <Button htmlType="submit" block>
                اسکن
              </Button>
            </Col>
            <Col hidden={!file} span={12} offset={1}>
              <Button
                onClick={() => {
                  onScannedListener(file);
                  handleCancel();
                }}
                block
                type="primary"
              >
                ارسال
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default ScannerOptionsComponent;
