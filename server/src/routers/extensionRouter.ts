import { Router } from "express";
import { extensionController } from "../controllers";
import { ExtensionDto } from "../dto";
import { DtoValidatorMiddleware } from "../middlewares";
import { asyncHandler } from "../utils";

export const extensionRouter = Router();
extensionRouter.get(
  "/default",
  asyncHandler(extensionController.getDefaultExtension)
);
extensionRouter.post(
  "/default/change",
  DtoValidatorMiddleware(ExtensionDto),
  asyncHandler(extensionController.setDefaultExtension)
);
extensionRouter.get("/", asyncHandler(extensionController.getCustomExtension));
extensionRouter.patch(
  "/add",
  DtoValidatorMiddleware(ExtensionDto),
  asyncHandler(extensionController.setExtension)
);
extensionRouter.patch(
  "/del",
  DtoValidatorMiddleware(ExtensionDto),
  asyncHandler(extensionController.delExtension)
);
