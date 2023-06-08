import cors from "cors";
import express from "express";
import { createServer } from "http";
import { port } from "./config";
import { endPoint } from "./constants";
import { errorHandler } from "./middlewares";
import { MongoAdapter } from "./model";
import { extensionRouter, indexRouter } from "./routers";

export class AppServer {
  app: express.Application;
  static PORT = port;

  constructor() {
    this.app = express();
  }
  async config() {
    this.middleWare();
    new MongoAdapter();
    this.routes();
  }

  static async start() {
    const appServer = new AppServer();
    const server = createServer(appServer.app);
    await appServer.config();

    server.listen(port, async () => {
      console.log(`server listening at http://localhost:${port}`);
    });
  }

  private middleWare() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes() {
    this.app.get(endPoint.index, indexRouter);
    this.app.use(endPoint.extension, extensionRouter);
    this.app.use(errorHandler);
  }
}
AppServer.start();
