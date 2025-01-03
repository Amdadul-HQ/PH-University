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
exports.Student = void 0;
const mongoose_1 = require("mongoose");
// sub sechema
const studentValidationSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'Student First Name Is Required'],
        maxlength: [10, 'Student First Name Can Not More Than 10 Characters'],
        trim: true,
        validate: {
            validator: function (value) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1).toLocaleLowerCase();
                return firstNameStr === value;
            },
            message: '{VALUE} is not in capitalize'
        },
    },
    middleName: {
        type: String,
        maxlength: [10, 'Student Middle Name Can Not More Than 10 Characters'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Student Last Name Is Required'],
        maxlength: [10, 'Student Last Name Can Not More Than 10 Characters'],
        trim: true,
    },
});
const guardianValidationSchema = new mongoose_1.Schema({
    fatherName: {
        type: String,
        required: [true, 'Father Name is Required'],
        maxlength: [20, 'Father Name Not more than 20 characters'],
        trim: true,
    },
    fatherOccupation: {
        type: String,
        required: [true, 'Father Occupation is Required'],
        trim: true,
    },
    fatherContactNo: {
        type: String,
        required: [true, 'Father Contact Number is Required'],
        maxlength: [11, 'Father Contact Number Can not more then 11 Number'],
        trim: true,
    },
    motherName: {
        type: String,
        required: [true, 'Mother Name is Required'],
        maxlength: [20, 'Mother Name Not more than 20 characters'],
        trim: true,
    },
    motherOccupation: {
        type: String,
        required: [true, 'Mother Occupation is Required'],
        trim: true,
    },
    motherContactNo: {
        type: String,
        required: [true, 'Mother Contact Number is Required'],
        maxlength: [11, 'Mother Contact Number Can not more then 11 Number'],
        trim: true,
    },
});
//sub schema
const localGurdianSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Local Gurdian Name Is Required'],
        maxlength: [20, 'Local Name Not more than 20 characters'],
        trim: true,
    },
    occupation: {
        type: String,
        required: [true, 'Local Guridan Occupation Is Required'],
        trim: true,
    },
    address: {
        type: String,
        required: [true, 'Local Guridan Address Is Rquired'],
        trim: true,
    },
    contactNo: {
        type: String,
        required: [true, 'Local Guridan Number Is Reqired'],
        maxlength: [11, 'Local Contact Number Can not more then 11 Number'],
        trim: true,
    },
});
// Schema
const createStudentValidationSchema = new mongoose_1.Schema({
    dateOfBirth: {
        type: String,
        required: [true, 'Student Date of Birth Is Required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Student Email Is Required'],
        trim: true,
    },
    contactNo: {
        type: String,
        required: [true, 'Student Contact Number Is Required'],
        maxlength: [11, 'Student Contact Number Can not more then 11 Number'],
        trim: true,
    },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency Number Is Required'],
        maxlength: [11, 'Emergency Contact Number Can not more then 11 Number'],
        trim: true,
    },
    presentAddress: {
        type: String,
        required: [true, 'Present Address Must be Needed'],
        trim: true,
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent Address Is Required'],
        trim: true,
    },
    profileImg: {
        type: String,
    },
    id: {
        type: String,
    },
    name: {
        type: studentValidationSchema,
        required: [true, 'Student Name Must be Inputed'],
    },
    localGurdian: {
        type: localGurdianSchema,
        required: [true, 'Local Guridan Information need to be Inputed'],
    },
    guardian: {
        type: guardianValidationSchema,
        required: [true, 'Guardian Information need to be Inputed'],
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: '{VALUE} This Gender Does not Exist',
        },
        required: [true, 'Gender Need To Be Inputed'],
    },
    bloogGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'O-', 'O+', 'AB+', 'AB-'],
            message: '{VALUE} This is no valid blood group',
        },
        required: [true, 'Blood Group Needed'],
    },
    isActive: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
});
// createing a statice method
createStudentValidationSchema.statics.isStudentExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingStudent = yield exports.Student.findOne({ id });
        return existingStudent;
    });
};
// Checking Student exist
// createStudentValidationSchema.methods.isStudentExists = async function (id:string) {
//   const existingStudent = await Student.findOne({id})
//   return existingStudent;
// }
// Mdel
exports.Student = (0, mongoose_1.model)('Student', createStudentValidationSchema);
