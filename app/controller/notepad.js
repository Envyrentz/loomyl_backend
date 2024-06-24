const Notepad = require('../model/notepad');

exports.handleGetNotepads = async (req, res) => {
    try {
        const data = await Notepad.getNotepads();
        res.status(200).json({
            status: "SUCCESS GET NOTEPADS",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            status: "FAIL GET NOTEPADS",
            message: error.message,
        });
    }
}

exports.handleGetNotepadById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Notepad.getNotepadById(id);
        res.status(200).json({
            status: "SUCCESS GET NOTEPAD BY ID",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            status: "FAIL GET NOTEPAD BY ID",
            message: error.message,
        });
    }
}

exports.handleGetNotepadByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Notepad.getNotepadByUserId(id);
        res.status(200).json({
            status: "SUCCESS GET NOTEPAD BY USER ID",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            status: "FAIL GET NOTEPAD BY USER ID",
            message: error.message,
        });
    }

}

exports.handleDeleteNotepad = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Notepad.deleteNotepad(id);
        res.status(200).json({
            status: "SUCCESS DELETE NOTEPAD",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            status: "FAIL DELETE NOTEPAD",
            message: error.message,
        });
    }
}

exports.handleCreateNotepad = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { title, content } = req.body;
        const data = await Notepad.createNotepad(user_id, title, content);
        res.status(200).json({
            status: "SUCCESS CREATE NOTEPAD",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            status: "FAIL CREATE NOTEPAD",
            message: error.message,
        });
    }
}
