import { Router } from "express";
import 'dotenv/config'

const visitorRouter = Router();


visitorRouter.get("/", async (req, res) => {
    try {
      // let cardsCount = await cardModel.find(req.body).count();
      // let collectionsCount = await collectionModel.find(req.body).count();
      // let bestUsers = await userModel.find(req.body).limit(8);
      // let bestCollections = await collectionModel.find(req.body).limit(3);
      // let bestCards = await cardModel.find(req.body).limit(1);
      // let cardDiscovery = await cardModel.find(req.body).limit(3);
  
      res.render("site/index.html.twig",{
        // cardsCount: cardsCount,
        // collectionsCount: collectionsCount,
        // bestUsers: bestUsers,
        // cardDiscovery: cardDiscovery,
        // bestCollections: bestCollections,
        // bestCards: bestCards
      });
    } catch (error) {
      res.send(error);
    }
  });

  visitorRouter.get("/login", async (req, res) => {
    try {
      res.render("auth/login.html.twig");
    } catch (error) {
      res.send(error);
    }
  });  

  visitorRouter.get("/register", async (req, res) => {
    try {
      res.render("auth/register.html.twig");
    } catch (error) {
      res.send(error);
    }
  });  

  export default visitorRouter;