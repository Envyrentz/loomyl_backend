const pool = require('../../db/db')
const ApplicationError = require('../../config/errors/ApplicationError')

const getNotepads = async () => {
    try {
        const query = 'SELECT * FROM notepad';
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new ApplicationError('Error executing query', 500);
    }
}

const getNotepadById = async (id) => {
    try{
        const query = `SELECT * FROM notepad WHERE id=${id}`;
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new ApplicationError('Error executing query get notepad by id :', 500);
    }
}

const getNotepadByUserId = async (user_id) => {
    try{
        const query = `SELECT * FROM notepad WHERE user_id=${user_id}`;
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new ApplicationError('Error executing query get notepad by user id :', 500);
    }

}

const deleteNotepad = async (id) => {
    try{
        const query = `DELETE FROM notepad WHERE id=${id}`;
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new ApplicationError('Error executing query delete notepad by id :', 500);
    }
}

const createNotepad = async (user_id, title, content) => {
    try{
        const query = `INSERT INTO notepad (title, content, user_id) VALUES ('${title}', '${content}', '${user_id}')`;
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new ApplicationError('Error executing query create notepad :', 500);
    }
}

module.exports = {
    getNotepads,
    getNotepadById,
    getNotepadByUserId,
    deleteNotepad,
    createNotepad
}