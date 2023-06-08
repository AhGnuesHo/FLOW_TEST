import { ObjectId } from "mongoose";
import {
  defaultModel,
  DefaultModelType,
  extensionModel,
  ExtensionModelType,
} from "../model";
import { IExtension } from "../model/schema";
export interface IExtensionService {
  getDefaultExtension(): Promise<IExtension[]>;
  setCustomExtension(extension: string): Promise<IExtension>;
  getCustomExtension(): Promise<IExtension[]>;
}

export class ExtensionService implements IExtensionService {
  constructor(
    private extensionModel: ExtensionModelType,
    private defaultModel: DefaultModelType
  ) {}

  public async getDefaultExtension(): Promise<IExtension[]> {
    return await this.defaultModel.find({});
  }

  public async setDefaultExtension(
    id: ObjectId,
    current: boolean
  ): Promise<IExtension> {
    const result = await this.defaultModel.findByIdAndUpdate(
      { _id: id },
      { available: !current }
    );
    return result;
  }
  public async setCustomExtension(extension: string): Promise<IExtension> {
    const [{ id, name, available }] = await this.extensionModel.create([
      {
        name: extension,
      },
    ]);
    return { id, name, available };
  }

  public async getCustomExtension(): Promise<IExtension[]> {
    return await this.extensionModel.find({});
  }
}

export const extensionService = new ExtensionService(
  extensionModel,
  defaultModel
);
