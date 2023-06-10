import { Button, Card, Form, Input, message, Result, Space, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { Extension } from "../interface";

export const CustomForm: React.FC = () => {
  const [customData, setCustomData] = useState<Extension[]>([]);
  const [newExtension, setNewExtension] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();

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
  }, [customData]);

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
    } catch (error: any) {
      messageApi.open({
        type: "warning",
        content: error?.response?.data?.message,
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });
      setNewExtension("");
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
  const isAddButtonDisabled = newExtension.trim() === "";
  return (
    <Form.Item className="input" label="커스텀 확장자">
      <div style={{ display: "flex" }}>
        <Input
          style={{ marginRight: "10px" }}
          value={newExtension}
          maxLength={20}
          onChange={(e) => setNewExtension(e.target.value)}
          onPressEnter={handleInputKeyPress}
        />
        <Button
          type="primary"
          onClick={handleAddExtension}
          disabled={isAddButtonDisabled}
        >
          + 추가
        </Button>
        {contextHolder}
      </div>

      <Card className="customInput">
        {customData.length > 0 ? (
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
        ) : (
          <Result title="차단하고 싶은 확장자를 추가하세요." />
        )}
      </Card>
    </Form.Item>
  );
};
