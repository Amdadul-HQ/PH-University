"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRouters = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const StudentRouter = express_1.default.Router();
// Student Create
StudentRouter.post('/create-student', student_controller_1.StudentControllers.createStudent);
// Get All Students
StudentRouter.get('/get-all-students', student_controller_1.StudentControllers.getAllStudent);
// Get Single Students
StudentRouter.get('/:studentId', student_controller_1.StudentControllers.getSingelStudent);
exports.StudentRouters = StudentRouter;
