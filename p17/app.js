import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection
await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    batch: String
});
const Student = mongoose.model('Student', studentSchema);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve main UI
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API: Get all students
app.get('/api/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// API: Add student
app.post('/api/students', async (req, res) => {
    const { name, email, phone, batch } = req.body;
    const student = new Student({ name, email, phone, batch });
    await student.save();
    res.json({ success: true, student });
});

// API: Edit student
app.put('/api/students/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, batch } = req.body;
    const student = await Student.findByIdAndUpdate(id, { name, email, phone, batch }, { new: true });
    res.json({ success: true, student });
});

// API: Delete student
app.delete('/api/students/:id', async (req, res) => {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Admin panel running on http://localhost:${PORT}`);
});
