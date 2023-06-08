import {
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { ObjectId } from "mongoose";
import { IExtension } from "../model/schema";

export class ExtensionDto implements IExtension {
  @IsOptional()
  @IsMongoId()
  id: ObjectId;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  name: string;

  @IsOptional()
  @IsBoolean()
  available: boolean;
}
