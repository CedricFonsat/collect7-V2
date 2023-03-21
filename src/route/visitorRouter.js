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
    res.render("pages/landing.twig", {
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

visitorRouter.get("/registration", async (res) => {
  try {
    res.render("pages/authentication/registration.twig");
  } catch (error) {
    res.send(error);
  }
});

visitorRouter.post("/registration", async (req, res) => {
  try {
    await userController.setRegistration(req, res);
    res.redirect("/home");
    console.log("your connected patrick");
  } catch (error) {
    res.send(error);
  }
});


/* CONNEXION */

visitorRouter.get("/connection", async (res) => {
  try {
    res.render("pages/authentication/login.twig");
  } catch (error) {
    res.send(error);
  }
});

visitorRouter.post("/connection", async (req, res) => {
  try {
    let user = await userController.setLogin(req, res)
    if (user) {
      req.session.user = user._id
      console.log("jack is connected");
      res.redirect("/home");
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

visitorRouter.get("/lostPassword", async (res) => {
  try {
    res.render("pages/lostPassword.twig");
  } catch (err) {
    res.send(err);
  }
});


/* USERMANUAL */

visitorRouter.get("/userManual", async (res) => {
  try {
    res.render("pages/userManual.twig")
  } catch (error) {
    res.send(error);
  }
});


/* CONTACT */

visitorRouter.get("/contact", async (res) => {
  try {
    res.render("pages/contact.twig")
  } catch (error) {
    res.send(error);
  }
});
visitorRouter.get("/gcu", async (res) => {
  try {
    res.render("pages/gcu.twig")
  } catch (error) {
    res.send(error);
  }
});
visitorRouter.get("/privacyPolicy", async (res) => {
  try {
    res.render("pages/privacyPolicy.twig")
  } catch (error) {
    res.send(error);
  }
});


export default visitorRouter;