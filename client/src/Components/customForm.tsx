import { Button, Card, Form, Input, Space, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { Extension } from "../interface";

export const CustomForm: React.FC = () => {
  const [customData, setCustomData] = useState<Extension[]>([]);
  const [newExtension, setNewExtension] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/extension`);
        setCustomData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const deleteExtension = async (extensionId: string, name: string) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/extension/del`, {
        id: extensionId,
        name,
      });
      setCustomData((prevData) =>
        prevData.filter((item) => item._id !== extensionId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddExtension = async () => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/api/extension/add`, {
        name: newExtension,
      });
      const addedExtension = response.data;
      setCustomData((prevData) => [...prevData, addedExtension]);
      setNewExtension("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddExtension();
    }
  };

  return (
    <Form.Item className="input" label="커스텀 확장자">
      <div style={{ display: "flex" }}>
        <Input
          style={{ marginRight: "10px" }}
          value={newExtension}
          onChange={(e) => setNewExtension(e.target.value)}
          onPressEnter={handleInputKeyPress}
        />
        <Button type="primary" onClick={handleAddExtension}>
          + 추가
        </Button>
      </div>

      <Card className="customInput">
        <Space size={[0, 8]} wrap>
          {customData.map((item: Extension) => (
            <Tag
              key={item._id}
              closable
              onClose={() => deleteExtension(item._id, item.name)}
            >
              {item.name}
            </Tag>
          ))}
        </Space>
      </Card>
    </Form.Item>
  );
};
