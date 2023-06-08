import { Checkbox, Form } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";
import { API_BASE_URL } from "../config";
import { Extension } from "../interface";

export const DefaultForm: React.FC = () => {
  const [checkboxData, setCheckboxData] = useState<Extension[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/extension/default`
        );
        setCheckboxData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleCheckbox = async (id: string, checked: boolean) => {
    try {
      await axios.post(`${API_BASE_URL}/api/extension/default/change`, {
        id,
        available: !checked,
      });

      const updatedCheckboxData = checkboxData.map((item) => {
        if (item._id === id) {
          return { ...item, available: checked };
        }
        return item;
      });
      setCheckboxData(updatedCheckboxData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form.Item label="고정 확장자">
      {checkboxData.map((item: Extension) => (
        <Checkbox
          key={item._id}
          checked={item.available}
          onChange={(e) => handleCheckbox(item._id, e.target.checked)}
        >
          {item.name}
        </Checkbox>
      ))}
    </Form.Item>
  );
};
