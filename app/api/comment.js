const express = require("express")
const router = express.Router()
const { handleCreateComment, handleDeleteComment, handleGetCommentByCommunityId, handleGetCommentById } = require("../controller/comment")
const { authorize } = require("../middleware/auth")

router
    .get("/comunity/:id", authorize, handleGetCommentByCommunityId)
    .get("/:id", authorize, handleGetCommentById)
    .post("/", authorize, handleCreateComment)
    .delete("/:id", authorize, handleDeleteComment)

module.exports = router