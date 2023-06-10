import { Card, Result, Space, Tag } from "antd";
import { CustomCardProps, Extension } from "../interface";

export const CustomCard: React.FC<CustomCardProps> = ({
  customData,
  deleteExtension,
}) => {
  return (
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
  );
};
