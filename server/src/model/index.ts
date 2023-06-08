import { Model, model } from "mongoose";
import { DefaultSchema, ExtensionSchema, IExtension } from "./schema";
export * from "./mongoAdapter";

interface ModelIdentifierInterface {
  extension: string;
  default: string;
}
export const modelIdentifier: ModelIdentifierInterface = {
  extension: "extension",
  default: "default",
};

export const extensionModel = model<IExtension>(
  modelIdentifier.extension,
  ExtensionSchema
);
export const defaultModel = model<IExtension>(
  modelIdentifier.default,
  DefaultSchema
);
export type ExtensionModelType = Model<IExtension>;

export type DefaultModelType = Model<IExtension>;
