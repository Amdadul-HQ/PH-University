import { z } from 'zod';

// Sub-schema: Student Name
const studentValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, 'Student First Name is Required')
    .max(10, 'Student First Name Can Not Be More Than 10 Characters')
    .refine(
      (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() === value,
      { message: 'First Name must be capitalized' },
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, 'Student Last Name is Required')
    .max(10, 'Student Last Name Can Not Be More Than 10 Characters'),
});

// Sub-schema: Guardian
const guardianValidationSchema = z.object({
  fatherName: z
    .string()
    .min(1, 'Father Name is Required')
    .max(20, 'Father Name Cannot Be More Than 20 Characters'),
  fatherOccupation: z.string().min(1, 'Father Occupation is Required'),
  fatherContactNo: z
    .string()
    .min(1, 'Father Contact Number is Required')
    .max(11, 'Father Contact Number Cannot Be More Than 11 Characters'),
  motherName: z
    .string()
    .min(1, 'Mother Name is Required')
    .max(20, 'Mother Name Cannot Be More Than 20 Characters'),
  motherOccupation: z.string().min(1, 'Mother Occupation is Required'),
  motherContactNo: z
    .string()
    .min(1, 'Mother Contact Number is Required')
    .max(11, 'Mother Contact Number Cannot Be More Than 11 Characters'),
});

// Sub-schema: Local Guardian
const localGuardianValidationSchema = z.object({
  name: z
    .string()
    .min(1, 'Local Guardian Name is Required')
    .max(20, 'Local Guardian Name Cannot Be More Than 20 Characters'),
  occupation: z.string().min(1, 'Local Guardian Occupation is Required'),
  address: z.string().min(1, 'Local Guardian Address is Required'),
  contactNo: z
    .string()
    .min(1, 'Local Guardian Contact Number is Required')
    .max(11, 'Local Contact Number Cannot Be More Than 11 Characters'),
});

// Main schema: Student
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Invalid Email Address')
        .min(1, 'Student Email is Required'),
      contactNo: z
        .string()
        .min(1, 'Student Contact Number is Required')
        .max(11, 'Student Contact Number Cannot Be More Than 11 Characters'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency Number is Required')
        .max(11, 'Emergency Contact Number Cannot Be More Than 11 Characters'),
      admissionSemester:z.string(),
      presentAddress: z.string().min(1, 'Present Address Must Be Provided'),
      permanentAddress: z.string().min(1, 'Permanent Address is Required'),
      profileImg: z.string().optional(),
      name: studentValidationSchema,
      localGurdian: localGuardianValidationSchema,
      guardian: guardianValidationSchema,
      gender: z.enum(['male', 'female'], {
        required_error: 'Gender is Required',
      }),
      bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O-', 'O+', 'AB+', 'AB-'], {
        required_error: 'Blood Group is Required',
      }),
    }),
  }),
});

// Export
export const studentZodSchema = { createStudentValidationSchema };
