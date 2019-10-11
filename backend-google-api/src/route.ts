import {APIController} from "./controller/APIController";


export class Route {
    aPIController: APIController;

    constructor(mongo) {
        this.aPIController = new APIController(mongo);
    }

    routes(app) {
        const parentPathName = '/signin';
        app.route(parentPathName)
            .post(this.aPIController.verifyToken.bind(this.aPIController));

    }
}
