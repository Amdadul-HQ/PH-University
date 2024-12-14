import { Schema, z } from "zod";

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
        preRequisiteCoureses:z.array(PreRquisiteCourseValidationSchema),
    })
})
export 