const pool = require('../../db/db')
const ApplicationError = require('../../config/errors/ApplicationError')


const getComunities = async () => {
    try {
        const query = `
            SELECT 
                comunity.id AS comunity_id, 
                comunity.content, 
                comunity.created_at, 
                comunity.updated_at, 
                users.id AS user_id, 
                users.username, 
                users.email
            FROM comunity
            LEFT JOIN users ON comunity.user_id = users.id
        `;
        const [rows] = await pool.query(query);
        // Transform rows to include user details as a nested object
        const transformedRows = rows.map(row => ({
            id: row.comunity_id,
            content: row.content,
            created_at: row.created_at,
            updated_at: row.updated_at,
            user: {
                id: row.user_id,
                username: row.username,
                email: row.email
            }
        }));

        return transformedRows;
    } catch (error) {
        throw new ApplicationError('Error executing query', 500);
    }
}
const getComunityById = async (id) => {
    try {
        const query = `
            SELECT 
                comunity.id AS comunity_id, 
                comunity.content, 
                comunity.created_at, 
                comunity.updated_at, 
                users.id AS user_id, 
                users.username, 
                users.email
            FROM comunity 
            LEFT JOIN users ON comunity.user_id = users.id
            WHERE comunity.id = ?
        `;
        const [rows] = await pool.query(query, [id]);
        // Transform rows to include user details as a nested object
        const transformedRows = rows.map(row => ({
            id: row.community_id,
            content: row.content,
            created_at: row.created_at,
            updated_at: row.updated_at,
            user: {
                id: row.user_id,
                username: row.username,
                email: row.email
            }
        }));

        return transformedRows;
    } catch (error) {
        throw new ApplicationError('Error executing query get community by id :', 500);
    }
}


const deleteComunity = async (id) => {
    try {
        const query = `DELETE FROM comunity WHERE id=${id}`;
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new ApplicationError('Error executing query delete comunity by id :', 500);
    }
}

const updateComunity = async (id, content) => {
    try {
        const query = `UPDATE comunity SET content='${content}' WHERE id=${id}`;
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new ApplicationError('Error executing query update comunity by id :', 500);
    }
}

const createComunity = async (user_id, content) => {
    try {
        const query = `INSERT INTO comunity (user_id, content) VALUES ('${user_id}', '${content}')`;
        const [result] = await pool.query(query);
        console.log('result', result);
        const insertId = result.insertId;
        console.log('insertId', insertId);
        const selectQuery = `SELECT * FROM comunity WHERE id = ?`;
        const [rows] = await pool.query(selectQuery, insertId);

        return rows[0];
    } catch (error) {
        throw new ApplicationError('Error executing query create comunity :', 500);
    }
}

module.exports = {
    getComunities,
    getComunityById,
    deleteComunity,
    updateComunity,
    createComunity
}