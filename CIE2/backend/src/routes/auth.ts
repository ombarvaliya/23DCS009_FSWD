import { Router } from 'express';
import { users, User, UserType } from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SECRET } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.post('/signup', async (req, res) => {
  const { name, email, password, userType } = req.body;
  if (!name || !email || !password || !userType) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    userType: userType as UserType,
  };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, email: user.email, userType: user.userType }, SECRET, { expiresIn: '1h' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, userType: user.userType } });
});

export default router;
