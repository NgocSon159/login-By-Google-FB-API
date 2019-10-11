import {Observable} from "rxjs";
import {
    Collection,
    Db,
    DeleteWriteOpResultObject,
    FindAndModifyWriteOpResultObject,
    InsertOneWriteOpResult,
    MongoClient
} from "mongodb";
import {fromPromise} from "rxjs/internal-compatibility";

export class MongoUtil {
    constructor(private url: string, private databaseName: string, private poolSize: number) {

    }

    public mongoSetup(): Observable<Db> {
        return fromPromise(this.createConnection(this.url, this.databaseName, 'admin', this.poolSize));
    }

    public createConnection(uri: string, dbName: string, authSource = 'admin', poolSize = 5): Promise<Db> {
        return new Promise<Db>((resolve, reject) => {
            MongoClient.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                authSource,
                poolSize
            }, (err, client: MongoClient) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Connected successfully to MongoDB serverTest');
                    const db: Db = client.db(dbName);
                    resolve(db);
                }
            });
        });
    }

    public static rxInsert<T>(collection: Collection, object: any): Observable<T> {
        return fromPromise(new Promise<T>(((resolve, reject) => {
            collection.insertOne(object, (err, result: InsertOneWriteOpResult<any>) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result.ops[0]);
            });
        })));
    }

    public static rxUpdate<T>(collection: Collection, query: any, object: any): Observable<T> {
        return fromPromise(new Promise<T>(((resolve, reject) => {
            collection.findOneAndUpdate(query, {$set: object}, {returnOriginal: false}, (err, result: FindAndModifyWriteOpResultObject) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result.value);
            });
        })));
    }

    public static rxFindOne<T>(collection: Collection, query: any): Observable<T> {
        return fromPromise(new Promise<T>((resolve, reject) => {
            collection
                .findOne(query, (err, item: T) => {
                    if (err !== null) {
                        return reject(err);
                    }
                    return resolve(item);
                });
        }));
    }
}
