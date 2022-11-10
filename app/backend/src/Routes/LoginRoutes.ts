import { Router } from 'express';
import LoginController from '../Controllers/LoginController';
import TokenMiddleware from '../Middleware/TokenMiddleware';

const router = Router();
const Login = new LoginController();

router.post('/', async (req, res) => Login.login(req, res));
router.get('/validate', TokenMiddleware, async (req, res) => Login.getRole(req, res));

export default router;
