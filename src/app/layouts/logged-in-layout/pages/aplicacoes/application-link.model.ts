import { Application } from "../../../../core/model/usuario.model";

export class ApplicationLink {
    id?: number = 0;
    name?: string = '';
    url?: string = '';
    description?: string = '';
    icon: string = '';
    order: number = 0;
    active: boolean = false;
    
    constructor(application: Application) {
        this.id = application.id;
        this.name = application.name;
        this.url = application.appPath;
        this.description = application.description;
        this.icon = application.icon;
    }
}