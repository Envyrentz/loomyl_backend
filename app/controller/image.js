const path = require('path');
const Image = require('../model/image');

exports.getAllImages = async (req, res) => {
    try {
        const rows = await Image.getAll();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getImageByUserId = async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    try {
        const rows = await Image.getByUserId(userId);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

exports.getImageById = async (req, res) => {
    const id = req.params.id;
    try {
        const rows = await Image.getById(id);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.uploadImage = async (req, res) => {
    const id = req.user.id;
    const url = req.file.filename;
    console.log(url);
    try {
        const result = await Image.insert(id,url);
        console.log(result.id);
        res.status(201).json({ id: result.id, url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateImage = async (req, res) => {
    console.log(req.file);
    const id = req.params.id;
    const url = req.file.filename;
    try {
        await Image.update(id, url);
        console.log(url, id);
        res.json({ message: 'Image updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
