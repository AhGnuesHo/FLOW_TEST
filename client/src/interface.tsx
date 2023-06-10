export interface Extension {
  _id: string;
  name: string;
  available: boolean;
}
export interface CustomCardProps {
  customData: Extension[];
  deleteExtension: (extensionId: string, name: string) => void;
}

export interface CheckboxItemProps {
  item: Extension;
  handleCheckbox: (id: string, checked: boolean) => void;
}
