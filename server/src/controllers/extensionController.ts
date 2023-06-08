import { ExtensionService, extensionService } from "../services";
import { AsyncRequestHandler } from "../utils";

interface IExtensionController {
  getDefaultExtension: AsyncRequestHandler;
  setExtension: AsyncRequestHandler;
  getCustomExtension: AsyncRequestHandler;
}

export class ExtensionController implements IExtensionController {
  constructor(private extensionService: ExtensionService) {}

  public getDefaultExtension: AsyncRequestHandler = async (req, res) => {
    const result = await this.extensionService.getDefaultExtension();
    res.status(200).json(result);
  };

  public setDefaultExtension: AsyncRequestHandler = async (req, res) => {
    const { id, available } = req.body;
    const result = await this.extensionService.setDefaultExtension(
      id,
      available
    );
    res.status(200).json(result);
  };
  public setExtension: AsyncRequestHandler = async (req, res) => {
    const result = await this.extensionService.setCustomExtension(
      req.body.name
    );
    res.status(200).json(result);
  };

  public getCustomExtension: AsyncRequestHandler = async (req, res) => {
    const result = await this.extensionService.getCustomExtension();
    res.status(200).json(result);
  };
}

export const extensionController = new ExtensionController(extensionService);
