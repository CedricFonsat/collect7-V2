import collectionModel from "../models/collectionModel.js";

export class collectionController {
    static async setAddCollection(req) {
        req.body.imageCollection = req.file.filename;
        let collection = new collectionModel(req.body)
        await collection.save()
    }
}

export default collectionController