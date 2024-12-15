import { Router } from "express";
import { StudentRouters } from "../../modules/student/student.route";
import { UserRoutes } from "../../modules/user/user.route";
import { AcademicSemesterRoutes } from "../../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../../modules/academicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../../modules/faculty/faculty.route";
import { AdminRoutes } from "../../modules/admin/admin.route";
import { CourseRouters } from "../../modules/course/course.route";
import { SemesterRegistrationRoutes } from "../../modules/semesterRegistration/semesterRegistration.route";

const router = Router();


const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRouters,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/courses',
    route: CourseRouters,
  },
  {
    path: '/semester-registrations',
    route: SemesterRegistrationRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path,route.route))


export default router