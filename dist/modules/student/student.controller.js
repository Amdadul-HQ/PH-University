"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentControllers = void 0;
const student_service_1 = require("./student.service");
const student_validate_1 = require("./student.validate");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { student } = req.body;
        const zodValidation = student_validate_1.studentZodSchema.safeParse(student);
        if (!zodValidation.success) {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: zodValidation.error.format(),
            });
        }
        // will call service func to send this data
        const result = yield student_service_1.StudentServices.createStudentInToDB(student);
        // send response
        res.status(201).json({
            success: true,
            message: 'Student is created succesfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            // error: error,
        });
    }
});
// Get All student
const getAllStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.StudentServices.getAllStudentsFromDB();
        // send response
        res.status(200).json({
            success: true,
            message: 'All Students Data',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error,
        });
    }
});
// Get Singel Student
const getSingelStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield student_service_1.StudentServices.getSingleStudentsFromDB(studentId);
        res.status(200).json({
            success: true,
            message: 'single Student data',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error
        });
    }
});
exports.StudentControllers = {
    createStudent,
    getAllStudent,
    getSingelStudent,
};
