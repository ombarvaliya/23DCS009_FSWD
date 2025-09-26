import { Router } from 'express';
import { users } from '../models/user';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/users', authenticateToken, (req: AuthRequest, res) => {
  res.json(users.map(u => ({ id: u.id, name: u.name, email: u.email, userType: u.userType })));
});

export default router;
