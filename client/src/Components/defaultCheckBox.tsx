import { Checkbox } from "antd";
import React from "react";
import "../App.css";
import { CheckboxItemProps } from "../interface";

export const CheckboxItem: React.FC<CheckboxItemProps> = ({
  item,
  handleCheckbox,
}) => {
  const { name, available } = item;
  return (
    <Checkbox
      checked={available}
      onChange={(e) => handleCheckbox(item._id, e.target.checked)}
    >
      {name}
    </Checkbox>
  );
};
