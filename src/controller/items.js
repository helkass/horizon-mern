const Item = require("../models/item");

// CREATE ITEM
const createItem = (req, res) => {
    const formData = req.body;

    try {
        Item.create(formData, function(err, data){
            if(err) res.status(400).json({
                status: false,
                message: err.message
            })
            res.status(201).json({
                status: true,
                message: "Item hes been created",
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

// GET ITEMS
const getAllItems = async (req, res) =>{
    const qType = req.query.type;
    try {
        let items;
        if(qType){
            items = await Item.find({
                type : {
                    $in: [qType]
                }
            })
        }else {
            items = await Item.find()
        }
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: []
        })
    }
}

// UPDATE || EDIT
const editItem = async (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    try {
        const response = await Item.findByIdAndUpdate(id, newData);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error)
    }
}

// GET BLOG BY ID
const getItemById = (req, res) => {
    const id = req.params.id

    try {
        Item.findById(id).then(data => {
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

const deleteItem = (req, res) => {
    const id = req.params.id;

    try {
        Item.findByIdAndDelete(id).then(() =>{
            res.status(200).json({
                status: true,
                message: "Item has been deleted"
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
    createItem,
    getAllItems,
    getItemById,
    deleteItem,
    editItem
}