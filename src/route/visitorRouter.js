import { Router } from "express";
import 'dotenv/config'
import userController from "../controller/userController.js";
import collectionModel from "../model/collectionModel.js";
import userModel from "../model/userModel.js";
import cardModel from "../model/cardModel.js";

const visitorRouter = Router();


/* HOME */

visitorRouter.get("/", async (req, res) => {
  try {
    let cardsCount = await cardModel.find(req.body).count();
    let collectionsCount = await collectionModel.find(req.body).count();
    let bestUser = await userModel.find(req.body).limit(8);
    let cardDiscovery = await cardModel.find(req.body).limit(3);
    let collections = await collectionModel.find(req.body).limit(3);
    let bestCard = await cardModel.find(req.body).limit(1);
    res.render("site/index.html.twig", {
      cardsCount: cardsCount,
      collectionsCount: collectionsCount,
      bestUser: bestUser,
      cardDiscovery: cardDiscovery,
      collections: collections,
      bestCard: bestCard
    });
  } catch (error) {
    res.send(error);
  }
});


/* REGISTRATION */

visitorRouter.get("/register", async (req, res) => {
  try {
    res.render("auth/register.html.twig");
  } catch (error) {
    res.send(error);
  }
});



visitorRouter.post("/register", async (req, res) => {
  try {
    await userController.setRegistration(req, res);
    res.redirect("/");
    console.log("welcome to the magic haricot");
  } catch (error) {
    res.send(error);
  }
});


/* CONNEXION */

visitorRouter.get("/login", async (req, res) => {
  try {
    res.render("auth/login.html.twig");
  } catch (error) {
    res.send(error);
  }
});


visitorRouter.post("/login", async (req, res) => {
  try {
    let user = await userController.setLogin(req, res)
    if (user) {
      req.session.user = user._id
      console.log("jack is connected");
      res.redirect("/account");
    } else {
      res.status(500)
      res.json(`<p class="form_error"> Vous n'etes pas connecté </p>`)
    }
  }
  catch (error) {
    console.log(error);
    res.send(error);
  }
});


/* LOGOUT */

visitorRouter.get('/logout', function (req, res) {
  req.session.destroy()
  res.redirect('/');
});


/* LOSTPASSWORD TEMPORAIRE */



/* USERMANUAL */



/* CONTACT */



export default visitorRouter;