import { ObjectId } from "mongoose";
import {
  defaultModel,
  DefaultModelType,
  extensionModel,
  ExtensionModelType,
} from "../model";
import { IDefaultExtension, IExtension } from "../model/schema";
export interface IExtensionService {
  getDefaultExtension(): Promise<IDefaultExtension[]>;
  setDefaultExtension(id: ObjectId, current: boolean): Promise<IExtension>;
  setCustomExtension(extension: string): Promise<IExtension>;
  getCustomExtension(): Promise<IExtension[]>;
  delExtension(id: ObjectId, name: string): Promise<boolean>;
}

export class ExtensionService implements IExtensionService {
  constructor(
    private extensionModel: ExtensionModelType,
    private defaultModel: DefaultModelType
  ) {}

  public async getDefaultExtension(): Promise<IDefaultExtension[]> {
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
    const [{ id, name }] = await this.extensionModel.create([
      {
        name: extension,
      },
    ]);
    return { id, name };
  }

  public async getCustomExtension(): Promise<IExtension[]> {
    return await this.extensionModel.find({});
  }

  public async delExtension(id: ObjectId, name: string): Promise<boolean> {
    const { deletedCount } = await this.extensionModel.deleteOne({
      _id: id,
      name,
    });

    return deletedCount === 1;
  }
}

export const extensionService = new ExtensionService(
  extensionModel,
  defaultModel
);
