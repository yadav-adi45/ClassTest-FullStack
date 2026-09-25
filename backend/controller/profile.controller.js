import pool from "../config/db.js";


export const createProfile = async (req,res)=>{
    try{
        const {name,email,phone,address,age}=req.body;
        if (!name || !email || !phone || !address || !Number.isInteger(Number(age))) {
            return res.status(400).json({ message: "All profile fields are required" });
        }
        const result = await pool.query(
            "INSERT INTO profile (id,name,email,phone,address,age) VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM profile),$1,$2,$3,$4,$5) RETURNING *",[name,email,phone,address,age]
        )
        return res.json({
            "success": true,
            "message": "Profile successfully created",
            "profile": result.rows[0]
        })

    }catch(error){
        console.error("Could not create profile", error)
        if (error.code === "23505") {
            return res.status(409).json({ message: "A profile with this email already exists" });
        }
        res.status(500).json({ message: "Could not create profile" })
    }
}

export const getProfiles = async (req,res)=>{
    try {
        const result = await pool.query("SELECT * FROM profile ORDER BY id");
        res.json(result.rows);
    } catch (error) {
        console.error("Could not get profiles", error)
        res.status(500).json({ message: "could not get profiles" });
    }
}

export const getProfile = async (req,res)=>{
    try {
        const id = Number(req.params.id);
        const result = await pool.query("SELECT * FROM profile WHERE id = $1",[id]);
        if(result.rows.length===0){
            return res.status(404).json({
                message: "profile not found"
            })
        }
        res.json({
            "success": true
            ,"profile": result.rows[0]
        });

    } catch (error) {
        console.error("Could not get profile", error)
        res.status(500).json({ message: "could not get profile" });
    }
}

export const updateProfile = async (req,res)=>{
    try{
        const {name,email,phone,address,age} = req.body;
        const id = Number(req.params.id);
        if (!name || !email || !phone || !address || !Number.isInteger(Number(age))) {
            return res.status(400).json({ message: "All profile fields are required" });
        }
        const result = await pool.query(
            "UPDATE profile SET name=$1,email=$2,phone=$3,address=$4,age=$5,updatedAt=CURRENT_DATE WHERE id = $6 RETURNING *",[name,email,phone,address,age,id]
        )
        if(result.rows.length===0){
            return res.status(404).json({
                message: "profile not found"
            })
        }
        res.json({
            "success": true,
            "message": "Updated Successfully",
            "profile": result.rows[0]
        })

    }catch(error){
        console.error("Could not update profile", error)
        if (error.code === "23505") {
            return res.status(409).json({ message: "A profile with this email already exists" });
        }
        res.status(500).json({ message: "Could not update profile" })
    }
}
