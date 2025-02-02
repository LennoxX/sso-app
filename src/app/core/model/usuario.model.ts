import { BaseResourceModel } from "./base-resource.model";

export class Application extends BaseResourceModel {
  constructor(
    public name?: string,
    public appPath?: string,
    public description?: string,
    public createdAt?: Date,
    public icon: string = '',
  ) {
    super();
  }

  static fromJson(jsonData: any): Application {
    return Object.assign(new Application(), jsonData);
  }
}
