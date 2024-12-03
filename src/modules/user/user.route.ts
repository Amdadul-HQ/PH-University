import express from 'express';

const UserRoute = express.Router();

UserRoute.post('/create-student',UserController)