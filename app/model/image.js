const pool = require('../../db/db')
const ApplicationError = require('../../config/errors/ApplicationError')

const getAll = async () => {
    try {
        const query = 'SELECT * FROM images';
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new ApplicationError('Error executing query', 500);
    }
}

const getByUserId = async (id) => {
    try {
        const query = `SELECT * FROM images WHERE user_id=${id}`;
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new ApplicationError('Error executing query get image by user id :', 500);
    }

}

const getById = async (id) => {
    try {
        const query = `SELECT * FROM images WHERE id=${id}`;
        const [rows] = await pool.query(query);
        return rows;

    }
    catch (error) {
        throw new ApplicationError('Error executing query get image by id :', 500);
    }
}

const insert = async (id,url) => {
    try {
        const query = `INSERT INTO images (url, user_id) VALUES ('${url}', '${id}')`;
        const [result] = await pool.query(query, [url, id]);
        if (result.affectedRows === 0) {
            throw new ApplicationError('Image creation failed', 500);
        }

        // Fetch the newly created image by ID (result.insertId)
        const [rows] = await pool.query('SELECT * FROM images WHERE id = ?', [result.insertId]);
        if (rows.length === 0) {
            throw new ApplicationError('Image not found after creation', 500);
        }
        return rows[0]; // Return the created image
    } catch (error) {
        throw new ApplicationError(`Error creating image: ${error.message}`, 500);
    }
}

const update = async (id, url) => {
    try {
        const query = `UPDATE images SET url = ? WHERE id = ?`;
        const [rows] = await pool.query(query, [url, id]);
        return rows;
    } catch (error) {
        throw new ApplicationError('Error executing query update image by id :', 500);
    }
}

module.exports = {
    getAll,
    getByUserId,
    getById,
    insert,
    update
}