import { Button, Form, Input } from "antd";
import React from "react";

const { TextArea } = Input;

export const InputForm: React.FC = () => (
  <Form.Item className="input" label="커스텀 확장자">
    <div style={{ display: "flex", alignItems: "center" }}>
      <Input style={{ marginRight: "10px" }} />
      <Button type="primary">추가</Button>
    </div>

    <TextArea className="customInput" rows={4} />
  </Form.Item>
);
