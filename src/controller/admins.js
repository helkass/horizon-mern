const Admin = require("../models/admin");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const createAdmin = async (req, res)=> {
    
    if(!req.body) return res.status(400).json({message: "form data not allowed!"})

    const validate = await Admin.findOne({email: req.body.email})

    const newAdmin = new Admin({
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET
          ).toString(),
    })

    // chechking already email from db
    if(validate) return res.status(400).json({message: "email already exist!"})
    
    try {
        const saved = await newAdmin.save();
        res.status(200).json({
            status: true,
            message: "register success",
            data: saved
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: []
        })
    }
           
}

// GET ALL ADMIN
const getAllAdmins = async (req, res)=> {
    try {
        const response = await Admin.find();
        res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: []
        })
    }
}

// LOGIN
const loginAdmin = async (req, res) => {
    try {
      const admin = await Admin.findOne({ email: req.body.email });
  
      !admin && res.status(401).json({ error: "email already exist!" });
  
      // hashing
      const hashedPassword = CryptoJS.AES.decrypt(
        admin.password,
        process.env.SECRET
      );
  
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      const inputPassword = req.body.password;
  
      // compare password
      originalPassword != inputPassword && res.status(401).json("Wrong Password");

      const accessToken = jwt.sign(
        {
          id: admin._id,
        },
        process.env.SECRET,
        { expiresIn: "1d" }
      );
  
      const { password, ...others } = admin._doc;
      res.status(200).json({ ...others, accessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  }

const deleteAdmin = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await Admin.findByIdAndDelete(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
}
module.exports = {
    createAdmin,
    getAllAdmins,
    loginAdmin,
    deleteAdmin
}