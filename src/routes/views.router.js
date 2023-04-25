import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  if (req.session.logged) {
    res.redirect("products");
  } else {
    res.render("login", { title: "Inicia session para ver los productos" });
  }
});

router.get("/register", (req, res) => {
  res.render("register", { title: "pagina" });
});

router.get("/products", (req, res) => {
  if (!req.session.email) {
    res.redirect("/");
  } else {
    res.render("products", {user:req.session.email});
  }
});


export default router;
