import express from "express";

const authRoutes = express.Router();
authRoutes.post("/register", (req, res) => {console.log(req.body)
    res.status(200).json({message:"Registered"})
});

export default authRoutes
