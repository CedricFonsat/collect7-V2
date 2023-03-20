import { Router } from "express";
import 'dotenv/config'

const visitorRouter = Router();


visitorRouter.get("/", async (req, res) => {
    try {
      res.render("base.html.twig");
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

  export default visitorRouter;