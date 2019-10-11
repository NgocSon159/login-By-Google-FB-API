import {Request, Response} from 'express'
import {AccountGoogle} from "../model/AccountGoogle";

const fetch = require("node-fetch");
import {Db} from "mongodb";
import {MongoUtil} from "../../common/MongoUtil";
import {Observable} from "rxjs";
import {AccountFacebook} from "../model/AccountFacebook";

export class APIController {
    db: Db;

    constructor(db1: Db) {
        this.db = db1;
    }

    verifyToken(req: Request, res: Response) {
        const obj = req.body;
        let acc = {};
        if (obj['typeACC'] === 'Facebook') {
            fetch(`https://graph.facebook.com/me?access_token=${obj['tokenId']}`)
                .then(res1 => res1.json())
                .then(data => {
                    if (data.hasOwnProperty("error")) {
                        return res.status(500).json(data);
                    }
                    acc = {
                        name: data.name,
                        userId: data.id
                    };
                    this.checkUserExist(acc['userId']).subscribe(result => {
                        if (!result) {
                            MongoUtil.rxInsert(this.db.collection('account'), acc).subscribe(result => {
                                return res.status(200).json(result);
                            })
                        } else {
                            MongoUtil.rxUpdate(this.db.collection('account'), {userId: acc['userId']}, acc).subscribe(result => {
                                return res.status(200).json(result);
                            })
                        }
                    })
                })

        } else {
            fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${obj['tokenId']}`)
                .then(res1 => res1.json())
                .then(data => {
                    if (data.hasOwnProperty("error")) {
                        return res.status(500).json(data);
                    }
                    acc = {
                        domain: data.iss,
                        email: data.email,
                        locale: data.locale,
                        name: data.name,
                        userId: data.sub
                    };
                    this.checkUserExist(acc['userId']).subscribe(result => {
                        if (!result) {
                            MongoUtil.rxInsert(this.db.collection('account'), acc).subscribe(result => {
                                return res.status(200).json(result);
                            })
                        } else {
                            MongoUtil.rxUpdate(this.db.collection('account'), {userId: acc['userId']}, acc).subscribe(result => {
                                return res.status(200).json(result);
                            })
                        }
                    })
                })
                .catch(error => {
                    return res.status(500).json(error);
                })
        }
    }

    checkUserExist(userId1: string): Observable<any> {
        return MongoUtil.rxFindOne(this.db.collection('account'), {userId: userId1});
    }

}
