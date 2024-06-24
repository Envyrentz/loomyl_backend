const express = require("express")
const router = express.Router()
const { getUserById, getUsers, updateUserPassword, getUserByToken, updateUsername, updateUserEmail } = require("../controller/user")
const { authorize } = require("../middleware/auth")

// router
router
    .get("/", authorize, getUsers)
    .get("/userByToken", authorize, getUserByToken)
    .get("/:id", authorize, getUserById)
    .put("/updatePassword", authorize, updateUserPassword)
    .put("/updateUsername", authorize, updateUsername)
    .put("/updateEmail", authorize, updateUserEmail)
// router.get("/user",authorize, getUser)

module.exports = router