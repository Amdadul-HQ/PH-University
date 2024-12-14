import { z } from "zod";

const PreRquisiteCourseValidationSchema = z.object({
    course:z.string(),
    isDeleted:z.boolean().optional()
})


const createCourseValidationSchema = z.object({
    body:z.object({
        title:z.string(),
        prefix:z.string(),
        code:z.number(),
        credits: z.number(),
        preRequisiteCoureses:z.array(PreRquisiteCourseValidationSchema).optional(),
        isDeleted:z.boolean().optional()
    })
})


const updatePreRquisiteCourseValidationSchema = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCoureses: z.array(updatePreRquisiteCourseValidationSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const  CourseValidation = {
    createCourseValidationSchema,
    PreRquisiteCourseValidationSchema,
    updateCourseValidationSchema
}