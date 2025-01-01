const Saller = require("../model/saller");

const getAllSaller = async (req, res) => {
    try {
        const saller = await Saller.find();
        res.status(200).json(saller);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createSaller = async (req, res) => {
    try {
        const saller = new Saller(req.body);
        await saller.save();
        res.status(201).json(saller);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteSaller = async (req, res) => {
    try {
        const { id } = req.params;
        await Saller.findByIdAndDelete(id);
        res.status(200).json({ message: "Saller deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


 const updateSaller = async (req, res) => {
    try {
        const { id } = req.params;
        const saller = await Saller.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(saller);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getSallerById = async (req, res) => {
    try {
        const { id } = req.params;
        const saller = await Saller.findById(id);
        res.status(200).json(saller);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllSaller,
    createSaller,
    deleteSaller,
    updateSaller,
    getSallerById
}