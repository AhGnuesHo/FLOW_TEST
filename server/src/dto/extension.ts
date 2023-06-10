import {
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  NotContains,
} from "class-validator";
import { ObjectId } from "mongoose";
import { IExtension } from "../model/schema";

export class ExtensionDto implements IExtension {
  @IsOptional()
  @IsMongoId()
  id: ObjectId;

  @IsOptional()
  @IsString()
  @MaxLength(20, {
    message: "최대 20자 까지 가능합니다. ",
  })
  @NotContains("js", { message: "고정 확장자에 추가하세요" })
  @NotContains("bat", { message: "고정 확장자에 추가하세요" })
  @NotContains("cmd", { message: "고정 확장자에 추가하세요" })
  @NotContains("com", { message: "고정 확장자에 추가하세요" })
  @NotContains("exe", { message: "고정 확장자에 추가하세요" })
  @NotContains("scr", { message: "고정 확장자에 추가하세요" })
  @NotContains("cpl", { message: "고정 확장자에 추가하세요" })
  name: string;
  @IsOptional()
  @IsBoolean()
  available: boolean;
}
