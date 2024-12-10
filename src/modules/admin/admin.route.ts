import express from 'express';
import validateRequest from '../../app/middleware/validateRequest';
import { updateAdminValidationSchema } from './admin.validate';
import { AdminControllers } from './admin.controller';

const AdminRouter = express.Router();

AdminRouter.get('/', AdminControllers.getAllAdmins);

AdminRouter.get('/:id', AdminControllers.getSingleAdmin);

AdminRouter.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

AdminRouter.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = AdminRouter;
