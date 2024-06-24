const express = require("express")
const router = express.Router()
const { handleCreateNotepad, handleDeleteNotepad, handleGetNotepadByUserId , handleGetNotepadById, handleGetNotepads } = require("../controller/notepad")
const { authorize } = require("../middleware/auth")

router
    .get("/", authorize, handleGetNotepads)
    .get("/:id", authorize, handleGetNotepadById)
    .get("/userId/:id", authorize, handleGetNotepadByUserId)
    .delete("/:id", authorize, handleDeleteNotepad)
    .post("/", authorize, handleCreateNotepad)

module.exports = router