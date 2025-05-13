import dbConnect from '../db';
import User from '../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await dbConnect();

  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    await User.create({ username, email, password: hashed });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, message: 'User may already exist' });
  }
}
