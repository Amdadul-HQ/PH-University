import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRouters } from './modules/student/student.route';
import { UserRoutes } from './modules/user/user.route';
import globalErrorHander from './app/middleware/globalErrorHander';
import notFound from './app/middleware/notFound';
const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRouters);

// user routes
app.use('/api/v1/user',UserRoutes)

const getAController = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', getAController);

app.use(globalErrorHander);



// Not Found
app.use(notFound)



export default app;
