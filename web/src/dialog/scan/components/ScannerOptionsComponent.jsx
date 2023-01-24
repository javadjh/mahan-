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
import React from "react";
import { useState } from "react";
import { requiredForm } from "../../../config/formValidator";
const ScannerOptionsComponent = ({
  devices,
  file,
  onScannedListener,
  handleCancel,
}) => {
  const [devicesDPISupported, setDevicesDPISupported] = useState([]);
  const [width, setWidth] = useState(2480);
  const [height, setHeight] = useState(3507);
  const onDeviceSelected = (item) => {
    console.log(item);
    let itemIndex = devices.findIndex((deviceItem) => deviceItem.Id === item);
    console.log(itemIndex);
    setDevicesDPISupported(devices[itemIndex].SupportedResolutions);
  };
  const onDPIChange = (e) => {
    switch (e) {
      case 150:
        setWidth(1240);
        setHeight(1753);
        break;
      case 200:
        setWidth(1653);
        setHeight(2338);
        break;
      case 300:
        setWidth(2480);
        setHeight(3507);
        break;
      case 600:
        setWidth(4960);
        setHeight(7015);
        break;
    }
  };
  return (
    <div className="flex-second">
      <div style={{ padding: 30 }}>
        <div>انتخاب دستگاه</div>
        <Form.Item name={"deviceId"} rules={[requiredForm]}>
          <Select onChange={onDeviceSelected} style={{ width: "100%" }}>
            {devices?.map((device) => (
              <Select.Option key={device.Id} value={device.Id}>
                {device.Name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div>رزولوشن</div>
        <Form.Item name={"dpi"} rules={[requiredForm]}>
          <Select defaultValue={300} style={{ width: "100%" }}>
            {devicesDPISupported.map((dpi) => (
              <Select.Option onChange={onDPIChange} key={dpi} value={dpi}>
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
                defaultValue={width}
                value={width}
                placeholder="طول را وارد کنید..."
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={"height_pixels"}>
              <Input
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
