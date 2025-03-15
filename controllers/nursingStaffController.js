import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Create new nursing staff
export const createNursingStaff = async (req, res) => {
  try {
    const {
      fullname,
      registrationNumber,
      email,
      phone,
      password,
      gender,
      dateOfBirth,
      profileImage,
      qualification,
      specialization,
      experience,
      currentEmployment,
      languages,
      address
    } = req.body;

    // Validate required fields
    if (!fullname || !email || !password || !registrationNumber) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing',
        error: 'Please provide fullname, email, password and registration number'
      });
    }

    // Check if email or registration number exists
    const existingStaff = await prisma.nursingStaff.findFirst({
      where: {
        OR: [
          { email },
          { registrationNumber },
          { phone }
        ]
      }
    });

    if (existingStaff) {
      return res.status(409).json({
        success: false,
        message: 'Staff already exists',
        error: 'Email, phone or registration number already registered'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStaff = await prisma.nursingStaff.create({
      data: {
        fullname,
        registrationNumber,
        email,
        phone,
        password: hashedPassword,
        gender,
        dateOfBirth: new Date(dateOfBirth),
        profileImage,
        qualification,
        specialization,
        experience,
        currentEmployment,
        languages,
        address
      }
    });

    // Remove password from response
    const { password: _, ...staffData } = newStaff;

    return res.status(201).json({
      success: true,
      message: 'Nursing staff created successfully',
      data: staffData
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create nursing staff',
      error: error.message
    });
  }
};

// Get all nursing staff
export const getAllNursingStaff = async (req, res) => {
  try {
    const { specialization, experience } = req.query;
    
    let whereClause = {};
    
    if (specialization) {
      whereClause.specialization = { has: specialization };
    }
    
    if (experience) {
      whereClause.experience = { gte: parseInt(experience) };
    }

    const staff = await prisma.nursingStaff.findMany({
      where: whereClause,
      select: {
        id: true,
        fullname: true,
        registrationNumber: true,
        email: true,
        phone: true,
        gender: true,
        specialization: true,
        experience: true,
        currentEmployment: true,
        password: false
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Nursing staff fetched successfully',
      data: staff
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch nursing staff',
      error: error.message
    });
  }
};

// Get nursing staff by ID
export const getNursingStaffById = async (req, res) => {
  try {
    const staff = await prisma.nursingStaff.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        fullname: true,
        registrationNumber: true,
        email: true,
        phone: true,
        gender: true,
        dateOfBirth: true,
        profileImage: true,
        qualification: true,
        specialization: true,
        experience: true,
        currentEmployment: true,
        languages: true,
        address: true,
        password: false
      }
    });

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Nursing staff not found',
        error: 'Invalid staff ID'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Nursing staff fetched successfully',
      data: staff
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch nursing staff',
      error: error.message
    });
  }
};

// Update nursing staff
export const updateNursingStaff = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    // If password is being updated, hash it
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const staff = await prisma.nursingStaff.update({
      where: { id: req.params.id },
      data: updateData,
      select: {
        id: true,
        fullname: true,
        registrationNumber: true,
        email: true,
        phone: true,
        gender: true,
        dateOfBirth: true,
        profileImage: true,
        qualification: true,
        specialization: true,
        experience: true,
        currentEmployment: true,
        languages: true,
        address: true,
        password: false
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Nursing staff updated successfully',
      data: staff
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update nursing staff',
      error: error.message
    });
  }
};

// Delete nursing staff
export const deleteNursingStaff = async (req, res) => {
  try {
    await prisma.nursingStaff.delete({
      where: { id: req.params.id }
    });

    return res.status(200).json({
      success: true,
      message: 'Nursing staff deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete nursing staff',
      error: error.message
    });
  }
};