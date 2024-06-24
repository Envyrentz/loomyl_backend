const Comment = require('../model/comment');

exports.handleGetComments = async (req, res) => {
    try {
        const data = await Comment.getComments();
        res.status(200).json({
            status: "SUCCESS GET COMMENTS",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            status: "GET COMMENTS FAILED",
            message: error.message,
        })
    }
}

exports.handleGetCommentByCommunityId = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Comment.getCommentByComunityId(id);
        res.status(200).json({
            status: "SUCCESS GET COMMENT BY COMMUNITY ID",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            status: "FAIL GET COMMENT BY COMMUNITY ID",
            message: error.message,
        });
    }
}


exports.handleGetCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Comment.getCommentById(id);
        res.status(200).json({
            status: "SUCCESS GET COMMENT BY ID",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            status: "FAIL GET COMMENT BY ID",
            message: error.message,
        });
    }
}

exports.handleDeleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Comment.deleteComment(id);
        res.status(200).json({
            status: "SUCCESS DELETE COMMENT",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            status: "DELETE COMMENT FAILED",
            message: error.message,
        });
    }
}

exports.handleCreateComment = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { content, comunity_id } = req.body;
        console.log(req.body);
        const data = await Comment.createComment(user_id, content, comunity_id);
        res.status(200).json({
            status: "SUCCESS CREATE COMMENT",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            status: "CREATE COMMENT FAILED",
            message: error.message,
        });
    }
}