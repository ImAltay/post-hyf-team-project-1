import express from 'express';
import { register , login , logout} from '../controllers/authentication'; 

const router = express.Router();


export default (router: express.Router) => {
    router.post('/register', register); 
    router.post('/login', login);
    router.post('/logout', logout); 

};

