const pool = require('../db/db');

const createUserTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    const [results,] = await pool.query(query);
    return results;
}

const createNotepadTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS notepad (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content VARCHAR(255) NOT NULL,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    const [results,] = await pool.query(query);
    return results;
}

const createComunityTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS comunity (
            id INT AUTO_INCREMENT PRIMARY KEY,
            content VARCHAR(255) NOT NULL,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    const [results,] = await pool.query(query);
    return results;
}

const createCommentTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS comment (
            id INT AUTO_INCREMENT PRIMARY KEY,
            content VARCHAR(255) NOT NULL,
            user_id INT,
            comunity_id INT,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (comunity_id) REFERENCES Comunity(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`;
    const [results,] = await pool.query(query);
    return results;
}

const createUserCommentTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS comunity_comment (
            comunity_id INT,
            comment_id INT,
            PRIMARY KEY (comunity_id, comment_id),
            FOREIGN KEY (comunity_id) REFERENCES comunity(id) ON DELETE CASCADE,
            FOREIGN KEY (comment_id) REFERENCES comment(id) ON DELETE CASCADE        
        )`;
    const [results,] = await pool.query(query);
    return results;
}

const createImageTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS images (
            id INT AUTO_INCREMENT PRIMARY KEY,
            url VARCHAR(255) NOT NULL,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    const [results,] = await pool.query(query)
    return results;
}

const migrateTables = async () => {
    try {
        await createUserTable();
        await createNotepadTable();
        await createComunityTable();
        await createCommentTable();
        await createUserCommentTable();
        await createImageTable();
        console.log('All tables migrated successfully.');
    } catch (error) {
        console.error('Error migrating tables:', error);
    }
}

migrateTables();
