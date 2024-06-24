const Comunity = require('../model/comunity');

exports.handleGetComunities = async (req, res) => {
    try {
        const data = await Comunity.getComunities();
        res.status(200).json({
            status: "SUCCESS GET COMUNITIES",
            data: data,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: "FAIL",
            message: error.message,
        });
    }
}

exports.handleGetComunityById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Comunity.getComunityById(id);
        res.status(200).json({
            status: "SUCCESS GET COMUNITY BY ID",
            data,
        });
    } catch (error) {
        res.status(500).json({
            status: "FAIL",
            message: error.message,
        });
    }
}

exports.handleDeleteComunity = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Comunity.deleteComunity(id);
        res.status(200).json({
            status: "SUCCESS DELETE COMUNITY",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            status: "FAIL",
            message: error.message,
        });
    }
}

exports.handleCreateComunity = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { content } = req.body;
        console.log(content, user_id);
        const data = await Comunity.createComunity(user_id, content);
        res.status(200).json({
            status: "SUCCESS CREATE COMUNITY",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            status: "FAIL",
            message: error.message,
        });
    }
}
