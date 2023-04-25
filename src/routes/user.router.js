import { Router } from "express";
import UserManager from "../dao/userManager.js";

const router = Router();
const userManager = new UserManager();

const users = [{ email: "adminCoder@coder.com", password: "adminCod3r123" }];

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
    req.session["email"] = email;
    req.session["isAdmin"] = true;
    res.redirect("/products");
  } else {
    const user = await userManager.getUser(req.body);
    if (user) {
      // Si el objeto de usuario existe, las credenciales son válidas
      req.session["email"] = email;
      req.session["logged"] = true;
      req.session["isAdmin"] = false;
      res.redirect("/products");
    } else {
      res.send("Usuario no existe o contraseña incorrecta");
    }
  }
});

router.post("/register", async (req, res) => {
  const user = userManager.addUser(req.body);
  res.redirect("/");
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

export default router;
