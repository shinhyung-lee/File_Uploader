const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/sign-up", (req, res) => res.render("signup", { title: "Sign up" }));

module.exports = indexRouter;