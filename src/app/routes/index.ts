import { Router } from "express";
import { StudentRouters } from "../../modules/student/student.route";
import { UserRoutes } from "../../modules/user/user.route";
import { AcademicSemesterRoutes } from "../../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../../modules/academicFaculty/academicFaculty.route";

const router = Router();


const moduleRoutes = [
    {
        path:'/user',
        route:UserRoutes
    },
    {
        path:'/students',
        route:StudentRouters
    },
    {
        path:'/academic-semester',
        route:AcademicSemesterRoutes
    },
    {
        path:'/academic-faculty',
        route:AcademicFacultyRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path,route.route))


export default router