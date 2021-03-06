//Routes
import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import CheckinController from './app/controllers/CheckinController';
import RegistrationController from './app/controllers/RegistrationController';
import HelpOrderController from './app/controllers/HelpOrderController';
import HelpOrderControllerAdm from './app/controllers/HelpOrderControllerAdm';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.post('/students/:id/help-orders', HelpOrderController.store);
routes.get('/students/:id/help-orders', HelpOrderController.find);

routes.use(authMiddleware);

routes.get('/students/help-orders', HelpOrderControllerAdm.index);
routes.put('/students/help-orders/:id/answer', HelpOrderControllerAdm.update);
routes.get('/students/:id', StudentController.find);
routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.get('/plans/:id', PlanController.find);
routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/registrations', RegistrationController.index);
routes.post('/registrations', RegistrationController.store);

export default routes;
