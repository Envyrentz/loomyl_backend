const pool = require('../../db/db')
const ApplicationError = require('../../config/errors/ApplicationError')


const getCommentByComunityId = async (id) => {
    try {
        const query = `SELECT comment.id As comment_id, comment.content, comment.created_at, comment.updated_at, users.id AS user_id, users.username, users.email FROM comment LEFT JOIN users ON comment.user_id = users.id WHERE comunity_id=${id}`
        // const query = `SELECT * FROM comment WHERE comunity_id=${id}`;
        const [rows] = await pool.query(query);
        const transformedRows = rows.map(row => ({
            id: row.id,
            content: row.content,
            created_at: row.created_at,
            updated_at: row.updated_at,
            user: {
                id: row.user_id,
                username: row.username,
                email: row.email
            }
        }));
        return rows;
    } catch (error) {
        throw new ApplicationError('Error executing query get comment by comunity id :', 500);
    }
}

const createComment = async (user_id, content, comunity_id) => {
    try {
        console.log(user_id, content, comunity_id);
        const commentQuery = `INSERT INTO comment (content, user_id, comunity_id) VALUES (?, ?,?)`;
        const [commentResult] = await pool.query(commentQuery, [content ,user_id,comunity_id]);

        const commentId = commentResult.insertId;

        const comunityCommentQuery = `INSERT INTO comunity_comment (comunity_id, comment_id) VALUES (?, ?)`;
        await pool.query(comunityCommentQuery, [comunity_id, commentId]);

        return commentResult;
    } catch (error) {
        throw new ApplicationError(`Error executing query create comment : ${error}`, 500);
    }
}

const deleteComment = async (id) => {
    try {
        const deleteCommentQuery = `DELETE FROM comment WHERE id = ?`;
        const [deleteResult] = await pool.query(deleteCommentQuery, [id]);

        const deleteComunityCommentQuery = `DELETE FROM comunity_comment WHERE comment_id = ?`;
        await pool.query(deleteComunityCommentQuery, [id]);

        return deleteResult;
    } catch (error) {
        throw new ApplicationError('Error executing query delete comment by id :', 500);
    }
}


const getCommentById = async (id) => {
    try {
        const query = `SELECT * FROM comment WHERE id=${id}`;
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new ApplicationError('Error executing query get comment by id :', 500);
    }
}

const getComments = async () => {
    try {
        const query = `SELECT * FROM comment`;
        const [rows] = await pool.query(query);
        return rows;
    }
    catch (error) {
        throw new ApplicationError('Error executing query get comments :', 500);
    }
}



module.exports = {
    getComments,
    getCommentByComunityId,
    getCommentById,
    createComment,
    deleteComment
}