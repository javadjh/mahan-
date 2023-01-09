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
const ScannerOptionsComponent = ({ devices, file, onScannedListener }) => {
  const [devicesDPISupported, setDevicesDPISupported] = useState([]);
  const onDeviceSelected = (item) => {
    setDevicesDPISupported(item.SupportedResolutions);
  };
  return (
    <div className="flex-second">
      <div style={{ padding: 30 }}>
        <div>انتخاب دستگاه</div>
        <Form.Item name={"deviceId"}>
          <Select onChange={onDeviceSelected} style={{ width: "100%" }}>
            {devices.map((device) => (
              <Select.Option key={device.Id} value={device.Id}>
                {device.Name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div>رزولوشن</div>
        <Form.Item name={"dpi"}>
          <Select style={{ width: "100%" }}>
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
              <Input placeholder="طول را وارد کنید..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={"height_pixels"}>
              <Input placeholder="عرض را وارد کنید..." />
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
          <Radio.Group>
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
