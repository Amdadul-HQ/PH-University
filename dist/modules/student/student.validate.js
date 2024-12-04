"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentZodSchema = void 0;
const zod_1 = require("zod");
// Sub-schema: Student Name
const studentValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1, 'Student First Name is Required')
        .max(10, 'Student First Name Can Not Be More Than 10 Characters')
        .refine((value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() === value, { message: 'First Name must be capitalized' }),
    middleName: zod_1.z
        .string()
        .optional(),
    lastName: zod_1.z
        .string()
        .min(1, 'Student Last Name is Required')
        .max(10, 'Student Last Name Can Not Be More Than 10 Characters'),
});
// Sub-schema: Guardian
const guardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z
        .string()
        .min(1, 'Father Name is Required')
        .max(20, 'Father Name Cannot Be More Than 20 Characters'),
    fatherOccupation: zod_1.z.string().min(1, 'Father Occupation is Required'),
    fatherContactNo: zod_1.z
        .string()
        .min(1, 'Father Contact Number is Required')
        .max(11, 'Father Contact Number Cannot Be More Than 11 Characters'),
    motherName: zod_1.z
        .string()
        .min(1, 'Mother Name is Required')
        .max(20, 'Mother Name Cannot Be More Than 20 Characters'),
    motherOccupation: zod_1.z.string().min(1, 'Mother Occupation is Required'),
    motherContactNo: zod_1.z
        .string()
        .min(1, 'Mother Contact Number is Required')
        .max(11, 'Mother Contact Number Cannot Be More Than 11 Characters'),
});
// Sub-schema: Local Guardian
const localGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, 'Local Guardian Name is Required')
        .max(20, 'Local Guardian Name Cannot Be More Than 20 Characters'),
    occupation: zod_1.z.string().min(1, 'Local Guardian Occupation is Required'),
    address: zod_1.z.string().min(1, 'Local Guardian Address is Required'),
    contactNo: zod_1.z
        .string()
        .min(1, 'Local Guardian Contact Number is Required')
        .max(11, 'Local Contact Number Cannot Be More Than 11 Characters'),
});
// Main schema: Student
const createStudentValidationSchema = zod_1.z.object({
    dateOfBirth: zod_1.z.string().min(1, 'Student Date of Birth is Required'),
    email: zod_1.z
        .string()
        .email('Invalid Email Address')
        .min(1, 'Student Email is Required'),
    contactNo: zod_1.z
        .string()
        .min(1, 'Student Contact Number is Required')
        .max(11, 'Student Contact Number Cannot Be More Than 11 Characters'),
    emergencyContactNo: zod_1.z
        .string()
        .min(1, 'Emergency Number is Required')
        .max(11, 'Emergency Contact Number Cannot Be More Than 11 Characters'),
    presentAddress: zod_1.z.string().min(1, 'Present Address Must Be Provided'),
    permanentAddress: zod_1.z.string().min(1, 'Permanent Address is Required'),
    profileImg: zod_1.z.string().optional(),
    id: zod_1.z.string().optional(),
    name: studentValidationSchema,
    localGurdian: localGuardianValidationSchema,
    guardian: guardianValidationSchema,
    gender: zod_1.z.enum(['male', 'female'], { required_error: 'Gender is Required' }),
    bloogGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'O-', 'O+', 'AB+', 'AB-'], {
        required_error: 'Blood Group is Required',
    }),
    isActive: zod_1.z.enum(['active', 'blocked']).default('active'),
});
// Export
exports.studentZodSchema = createStudentValidationSchema;
