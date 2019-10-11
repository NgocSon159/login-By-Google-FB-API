import * as cors from 'cors';
import * as express from 'express';
import {Application} from 'express';
import * as bodyParser from 'body-parser';
import config from "../config";
import * as http from "http";
import {MongoUtil} from "../common/MongoUtil";
import {Db} from "mongodb";
import {Route} from "./route";

const MongoUrl = config.MONGO.URL;
const Database = config.MONGO.DB;
const PoolSize = config.MONGO.POOL_SIZE;

const PORT = config.HTTP_PORT;

export class App {
    protected app: Application;
    public getApp(): Application {
        return this.app;
    }

    constructor(protected mongoUrl: string, protected database: string, protected poolSize: number) {
        this.app = express();
        this.config();
        const mongoUtil = new MongoUtil(mongoUrl, database, poolSize);
        mongoUtil.mongoSetup().subscribe(db => {
            console.log('Connect Done!!!');
            this.setupRoute(db);
        }, error => {
            console.log('Error Mongo: ', error);
        });
    }

    protected config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        //this.app.use(cors({credentials: true, origin: true}));
        this.app.use(cors());
        // serving static files
        this.app.use(express.static('public'));
    }
    protected setupRoute(db: Db) {
        const milkTeaRoute = new Route(db);
        milkTeaRoute.routes(this.app);
    }

}

const app = new App(MongoUrl, Database, PoolSize);
http.createServer(app.getApp()).listen(PORT, () => {
    console.log('HTTP Express server listening on port ' + PORT);
});

