import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent =async (req:Request,res:Response) =>{
    
    try{
        const {student} = req.body;
        // will call service func to send this data
        const result = await StudentServices.createStudentInToDB(student);

        // send response
        res.status(201).json({
            success:true,
            message:"Student is created succesfully",
            data:result
        })
    }
    catch(error){
        console.log(error);
    }
}

// Get All student
const getAllStudent = async(req:Request,res:Response) =>{

    try{
        const result = await StudentServices.getAllStudentsFromDB();

        // send response
        res.status(200).json({
            success:true,
            message:"All Students Data",
            data:result
        })
    }
    catch(error){
        console.log(error);
    }
}

export const StudentControllers = {
    createStudent,
    getAllStudent
}