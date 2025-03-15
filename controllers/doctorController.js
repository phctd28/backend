import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// CREATE a new doctor
export const createDoctor = async (req, res, next) => {
  try {
    const {address, fullname, hospital, email, gender, phone, password, 
           specialization, experience, qualification, consultationfee, profileImage} = req.body;

    // Validate required fields
    if (!fullname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing',
        error: 'Please provide fullname, email and password'
      });
    }

    // Check if email exists
    const existingDoctor = await prisma.doctor.findUnique({
      where: { email }
    });

    if (existingDoctor) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
        error: 'Please use a different email'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newDoctor = await prisma.doctor.create({ 
      data: {
        address, fullname, hospital, email, phone, profileImage,
        gender, password: hashedPassword, specialization,
        experience, qualification, consultationfee
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Doctor created successfully',
      data: newDoctor
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create doctor',
      error: error.message
    });
  }
};

// GET all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      select: {
        id: true,
        fullname: true,
        address: true,
        hospital: true,
        email: true,
        phone: true,
        gender: true,
        specialization: true,
        experience: true,
        qualification: true,
        consultationfee: true,
        profileImage: true,
        password: false
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Doctors fetched successfully',
      data: doctors
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch doctors',
      error: error.message
    });
  }
};

// GET a doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await prisma.doctor.findUnique({ 
      where: { id: req.params.id },
      select: {
        id: true,
        fullname: true,
        address: true,
        hospital: true,
        email: true,
        phone: true,
        gender: true,
        specialization: true,
        experience: true,
        qualification: true,
        consultationfee: true,
        profileImage: true,
        password: false
      }
    });
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
        error: 'Invalid doctor ID'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Doctor fetched successfully',
      data: doctor
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch doctor',
      error: error.message
    });
  }
};

// UPDATE a doctor by ID
export const updateDoctor = async (req, res) => {
  try {
    const existingDoctor = await prisma.doctor.findUnique({
      where: { id: req.params.id }
    });

    if (!existingDoctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
        error: 'Invalid doctor ID'
      });
    }

    let dataToUpdate = { ...req.body };
    
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      dataToUpdate.password = hashedPassword;
    }

    const updatedDoctor = await prisma.doctor.update({ 
      where: { id: req.params.id }, 
      data: dataToUpdate,
      select: {
        id: true,
        fullname: true,
        address: true,
        hospital: true,
        email: true,
        phone: true,
        gender: true,
        specialization: true,
        experience: true,
        qualification: true,
        consultationfee: true,
        profileImage: true,
        password: false
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Doctor updated successfully',
      data: updatedDoctor
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update doctor',
      error: error.message
    });
  }
};

// DELETE a doctor by ID
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: req.params.id }
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
        error: 'Invalid doctor ID'
      });
    }

    await prisma.doctor.delete({ 
      where: { id: req.params.id } 
    });

    return res.status(200).json({
      success: true,
      message: 'Doctor deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete doctor',
      error: error.message
    });
  }
};

// SEARCH doctors by specialization
export const searchDoctorsBySpecialization = async (req, res) => {
  try {
    const { specialization } = req.query;
    
    if (!specialization) {
      return res.status(400).json({
        success: false,
        message: 'Specialization is required',
        error: 'Please provide a specialization to search'
      });
    }

    const doctors = await prisma.doctor.findMany({
      where: { 
        specialization: { 
          contains: specialization, 
          mode: 'insensitive' 
        } 
      },
      select: {
        id: true,
        fullname: true,
        address: true,
        hospital: true,
        email: true,
        phone: true,
        gender: true,
        specialization: true,
        experience: true,
        qualification: true,
        consultationfee: true,
        profileImage: true,
        password: false
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Doctors fetched successfully',
      data: doctors
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to search doctors',
      error: error.message
    });
  }
};
