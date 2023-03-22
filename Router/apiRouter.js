const router = require("express").Router();

const middleware = require("../Middleware/apiMiddleware")

const { signUp, login, profile } = require("../Controller/apiController")

router.post("/signup", signUp)

router.post("/login",login)

router.get("/profile", middleware, profile )

module.exports = router;