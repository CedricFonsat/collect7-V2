import { Router } from "express";
import collectionController from "../controllers/collectionController.js";
import userController from "../controllers/userController.js"
import collectionModel from "../models/collectionModel.js";
import userModel from "../models/userModel.js"
import cardController from "../controllers/cardController.js"
import { uploadCard, uploadCollections } from "../dependencies/multer.js"
import cardModel from "../models/cardModel.js";

const adminRouter = Router();


adminRouter.get("/dashboard", async (req, res) => {
    try {
        let collection = await collectionModel.find(req.body);
        let users = await userModel.find(req.body);
        let usersCount = await userModel.find(req.body).count();
        let collectionCount = await collectionModel.find(req.body).count();
        let cardCount = await cardModel.find(req.body).count();
        res.render("admin/dashboard.twig", {
            collection: collection,
            users: users,
            usersCount: usersCount,
            collectionCount: collectionCount,
            cardCount: cardCount
        });
    } catch (error) {
        res.send(error);
    }
});


/* USER */

adminRouter.get("/dashboardUser", async (req, res) => {
    try {
        let users = await userModel.find(req.body);
        res.render("admin/layer/dashboardUser.twig", {
            users: users,
        });
    } catch (error) {
        res.send(error);
    }
});

adminRouter.post("/dashboardUser", async (req, res) => {
    try {
        await userController.setRegistration(req, res)
        res.redirect("/dashboardUser");
    } catch (error) {
        res.send(error);
    }
});


/* COLLECTION */

adminRouter.get("/dashboardCollection", async (req, res) => {
    try {
        let collections = await collectionModel.find(req.body);
        res.render("admin/layer/dashboardCollection.twig", {
            collections: collections
        })
    } catch (error) {
        res.send(error);
    }
});

adminRouter.get("/dashboardCollection/:id", async (req, res) => {
    try {
        await collectionModel.deleteOne({ _id: req.params.id });
        res.redirect("/dashboardCollection");
    } catch (error) {
        res.send(error);
    }
});

adminRouter.post("/dashboardCollectionAdd", uploadCollections.single('imageCollection')
    , async (req, res) => {
        try {
            await collectionController.setAddCollection(req, res);
            res.redirect("/dashboardCollection");
            console.log("add collection");
        } catch (error) {
            res.send(error);
        }
    });

adminRouter.get("/dashboardCollectionUpdate/:id", async (req, res) => {
    try {
        let collections = await collectionModel.findOne({ _id: req.params.id }, req.body);
        res.render("admin/layer/dashboardCollectionUpdate.twig", {
            collection: collections
        })
    } catch (error) {
        res.send(error);
    }
});

adminRouter.post("/dashboardCollectionUpdate/:id", uploadCollections.single('imageCollection'), async (req, res) => {
    try {
        if (req.file) {
            req.body.imageCollection = req.file.filename;
        }
        await collectionModel.updateOne({ _id: req.params.id }, req.body);
        res.redirect('/dashboardCollection')
    } catch (error) {
        res.send(error);
    }
});


/* CARD */

adminRouter.get("/dashboardCard", async (res) => {
    try {
        let collections = await collectionModel.find();
        let cards = await cardModel.find();
        res.render("admin/layer/dashboardCard.twig", {
            collections: collections,
            cards: cards
        });
    } catch (error) {
        res.send(error);
    }
});

adminRouter.get("/dashboardCard/:id", async (req, res) => {
    try {
        await cardModel.deleteOne({ _id: req.params.id });
        res.redirect("/dashboardCard");
    } catch (error) {
        res.send(error);
    }
});

adminRouter.post("/dashboardCard", uploadCard.single('imageCard'), async (req, res) => {
    try {
        await cardController.setAddCard(req, res);
        res.redirect("/dashboardCard");
        console.log("card successful");
    } catch (error) {
        res.send(error);
    }
});

adminRouter.get("/dashboardCardUpdate/:id", async (req, res) => {
    try {
        let collections = await collectionModel.find(req.body);
        let cards = await cardModel.findOne({ _id: req.params.id }, req.body);
        res.render("admin/layer/dashboardCardUpdate.twig", {
            card: cards,
            collections: collections
        })
    } catch (error) {
        res.send(error);
    }
});

adminRouter.post("/dashboardCardUpdate/:id", uploadCard.single('imageCard'), async (req, res) => {
    try {
        if (req.file) {
            req.body.imageCard = req.file.filename;
        }
        await cardModel.updateOne({ _id: req.params.id }, req.body);
        res.redirect('/dashboardCard')
    } catch (error) {
        res.send(error);
    }
});