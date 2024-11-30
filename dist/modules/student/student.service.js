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
exports.StudentServices = void 0;
const student_model_1 = require("./student.model");
// Student register
const createStudentInToDB = (studentData) => __awaiter(void 0, void 0, void 0, function* () {
    // Static method
    if (yield student_model_1.Student.isStudentExists(studentData.id)) {
        throw new Error('Student already exists!');
    }
    // built in static method
    const result = yield student_model_1.Student.create(studentData);
    // create an instance
    // const student = new Student(studentData);
    // st
    // checking Student Exists
    // if (await student.isStudentExists(studentData.id)){
    //   throw new Error("Student already exists")
    // }
    // const result = await student.save()
    return result;
});
// Students gell
const getAllStudentsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.find();
    return result;
});
// Get singel Student
const getSingleStudentsFromDB = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findOne({ id: studentId });
    return result;
});
exports.StudentServices = {
    createStudentInToDB,
    getAllStudentsFromDB,
    getSingleStudentsFromDB,
};
