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
    if (await this.isExist(extension)) {
      throw new Error("이미 차단된 확장자입니다.");
    }
    const [{ id, name }] = await this.extensionModel.create([
      {
        name: extension,
      },
    ]);
    const count = await this.countExtension();
    if (count > 200) {
      throw new Error("확장자는 최대 200개까지 추가가 가능합니다. ");
    }
    return { id, name, count };
  }

  public async getCustomExtension(): Promise<IExtension[]> {
    return await this.extensionModel.find({});
  }

  public async delExtension(id: ObjectId, name: string): Promise<boolean> {
    console.log(id, name);
    const { deletedCount } = await this.extensionModel.deleteOne({
      _id: id,
      name,
    });
    console.log(deletedCount);
    return deletedCount === 1;
  }

  private async isExist(extension: string): Promise<boolean> {
    const result = await this.extensionModel.findOne({ name: extension });
    return result !== null;
  }

  private async countExtension(): Promise<number> {
    return await this.extensionModel.count({});
  }
}

export const extensionService = new ExtensionService(
  extensionModel,
  defaultModel
);
