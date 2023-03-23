const router = require("express").Router();

const middleware = require("../Middleware/authMiddleware")

const { signUp, login, profile } = require("../Controller/authController")

router.post("/signup", signUp)

router.post("/login",login)

router.get("/profile", middleware, profile )

module.exports = router;