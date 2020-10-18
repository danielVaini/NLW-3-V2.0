import { Router } from 'express';

import multer from 'multer';

import uploadconfig from './config/upload';
import OrphanagesControler from './controllers/orphanagesController';
import UsersController from './controllers/UsersController';

const routes = Router();
const upload = multer(uploadconfig);

routes.get('/orphanages', OrphanagesControler.index);
routes.get('/orphanages/:id', OrphanagesControler.show);
routes.post('/orphanages', upload.array('images') ,OrphanagesControler.create);
routes.post('/cadastro', UsersController.create);
routes.post('/sessions', UsersController.sessionCreate);



export default routes;