import { Form } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";
import { API_BASE_URL } from "../config";
import { Extension } from "../interface";
import { defaultFetchData } from "../Services";
import { CheckboxItem } from "./defaultCheckBox";

export const DefaultForm: React.FC = () => {
  const [checkboxData, setCheckboxData] = useState<Extension[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const data = await defaultFetchData();
        setCheckboxData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);

        setLoading(false);
      }
    };
    fetchDataAndSetState();
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
      {loading ? (
        <div>Loading...</div>
      ) : (
        checkboxData.map((item: Extension) => (
          <CheckboxItem
            key={item._id}
            item={item}
            handleCheckbox={handleCheckbox}
          />
        ))
      )}
    </Form.Item>
  );
};
