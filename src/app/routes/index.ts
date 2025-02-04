import { Router } from 'express';
import { StudentRouters } from '../../modules/student/student.route';
import { UserRoutes } from '../../modules/user/user.route';
import { AcademicSemesterRoutes } from '../../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../../modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../../modules/faculty/faculty.route';
import { AdminRoutes } from '../../modules/admin/admin.route';
import { CourseRouters } from '../../modules/course/course.route';
import { SemesterRegistrationRoutes } from '../../modules/semesterRegistration/semesterRegistration.route';
import { OfferedCourseRoutes } from '../../modules/offeredCourse/offeredCourse.route';
import { AuthRoutes } from '../../modules/auth/auth.route';
import { EnrolledCourseRoutes } from '../../modules/enrollCourse/enrollCourse.route';

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
  {
    path: '/offered-courses',
    route: OfferedCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/enrolled-course',
    route: EnrolledCourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
