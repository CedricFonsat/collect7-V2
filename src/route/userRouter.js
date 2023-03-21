import { Router } from "express";

const userRouter = Router();


// userRouter.get("/shop", async (req, res) => {
//   try {

//     res.render("pages/shop.twig");
//   } catch (error) {
//     res.send(error);
//   }
// });

userRouter.get("/account", async (req, res) => {
  try {

    res.render("user/account.html.twig");
  } catch (error) {
    res.send(error);
  }
});




export default userRouter;
