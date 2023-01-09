const Gallery = require("../models/gallery");

// GET ALL GALLERIES
const getAllGalleries = async (req, res) =>{
    try {
        await Gallery.find().then(response => {
            res.status(200).json(response)
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: []
        })
    }
}

// CREATE
const createGallery = (req, res) => {
    const formData = req.body;

    try {
        Gallery.create(formData, function(err, data){
            if(err) res.status(400).json({
                status: false,
                message: err.message
            })

            res.status(201).json({
                status: true,
                message: "Gallery has been created",
                data: data
            })
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: []
        })
    }
}

// GET BLOG BY ID
const getGalleryById = (req, res) => {
    const id = req.params.id

    try {
        Gallery.findById(id).then(data => {
            res.status(200).json(data)
        }).catch(err => {
            res.status(404).json({
                status: false,
                message: err.message
            })
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            data: []
        })
    }
}

const deleteGallery = (req, res) => {
    const id = req.params.id;

    try {
        Gallery.findByIdAndDelete(id).then(() =>{
            res.status(200).json({
                status: true,
                message: "Gallery has been deleted"
            })
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            mesage: error.message,
            data: []
        })
    }
}
module.exports = {
    getAllGalleries,
    createGallery,
    getGalleryById,
    deleteGallery
}