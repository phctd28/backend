import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Login controller for both doctors and patients
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate input
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        error: 'Please provide email, password and role'
      });
    }

    // Check role and get user
    let user;
    if (role.toLowerCase() === 'doctor') {
      user = await prisma.doctor.findUnique({ where: { email } });
    } else if (role.toLowerCase() === 'patient') {
      user = await prisma.patient.findUnique({ where: { email } });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid role',
        error: 'Role must be either doctor or patient'
      });
    }

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: 'Invalid email or password'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        error: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: role.toLowerCase() },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Remove password from response
    const { password: _, ...userData } = user;

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { token, user: userData }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};

// Register controller - role-based registration
export const register = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({
        success: false,
        message: 'Role is required',
        error: 'Please specify role (doctor/patient)'
      });
    }

    if (role.toLowerCase() === 'doctor') {
      return await createDoctor(req, res);
    } else if (role.toLowerCase() === 'patient') {
      return await createPatient(req, res);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid role',
        error: 'Role must be either doctor or patient'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};