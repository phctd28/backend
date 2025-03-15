import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// CREATE a new patient
export const createPatient = async (req, res, next) => {
  try {
    const { 
      fullname, age, gender, email, phone, password,
      profileImage, bloodGroup, address, medicalHistory 
    } = req.body;

    // Validate required fields
    if (!fullname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing',
        error: 'Please provide fullname, email and password'
      });
    }

    // Check if email exists
    const existingPatient = await prisma.patient.findUnique({
      where: { email }
    });

    if (existingPatient) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
        error: 'Please use a different email'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newPatient = await prisma.patient.create({
      data: {
        fullname, age, gender, email, phone,
        password: hashedPassword, profileImage,
        bloodGroup, address, medicalHistory
      }
    });

    // Remove password from response
    const { password: _, ...patientData } = newPatient;
    return res.status(201).json({
      success: true,
      message: 'Patient created successfully',
      data: patientData
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create patient',
      error: error.message
    });
  }
};

// GET all patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await prisma.patient.findMany({
      select: {
        id: true,
        fullname: true,
        age: true,
        gender: true,
        email: true,
        phone: true,
        profileImage: true,
        bloodGroup: true,
        address: true,
        medicalHistory: true,
        password: false
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Patients fetched successfully',
      data: patients
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch patients',
      error: error.message
    });
  }
};

// GET a patient by ID
export const getPatientById = async (req, res) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        fullname: true,
        age: true,
        gender: true,
        email: true,
        phone: true,
        profileImage: true,
        bloodGroup: true,
        address: true,
        medicalHistory: true,
        password: false
      }
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
        error: 'Invalid patient ID'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Patient fetched successfully',
      data: patient
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch patient',
      error: error.message
    });
  }
};

// UPDATE a patient by ID
export const updatePatient = async (req, res) => {
  try {
    const existingPatient = await prisma.patient.findUnique({
      where: { id: req.params.id }
    });

    if (!existingPatient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
        error: 'Invalid patient ID'
      });
    }

    let dataToUpdate = { ...req.body };
    
    // Handle password update
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      dataToUpdate.password = hashedPassword;
    }

    // Handle email update
    if (req.body.email && req.body.email !== existingPatient.email) {
      const emailExists = await prisma.patient.findUnique({
        where: { email: req.body.email }
      });
      if (emailExists) {
        return res.status(409).json({
          success: false,
          message: 'Email already in use',
          error: 'Please use a different email'
        });
      }
    }

    const updatedPatient = await prisma.patient.update({
      where: { id: req.params.id },
      data: dataToUpdate,
      select: {
        id: true,
        fullname: true,
        age: true,
        gender: true,
        email: true,
        phone: true,
        profileImage: true,
        bloodGroup: true,
        address: true,
        medicalHistory: true,
        password: false
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Patient updated successfully',
      data: updatedPatient
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update patient',
      error: error.message
    });
  }
};

// DELETE a patient by ID
export const deletePatient = async (req, res) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: req.params.id }
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
        error: 'Invalid patient ID'
      });
    }

    await prisma.patient.delete({ where: { id: req.params.id } });
    return res.status(200).json({
      success: true,
      message: 'Patient deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete patient',
      error: error.message
    });
  }
};

// SEARCH patients by medical condition
export const searchPatientsByCondition = async (req, res) => {
  try {
    const { condition } = req.query;
    
    if (!condition) {
      return res.status(400).json({
        success: false,
        message: 'Condition is required',
        error: 'Please provide a medical condition to search'
      });
    }

    const patients = await prisma.patient.findMany({
      where: { medicalHistory: { has: condition } },
      select: {
        id: true,
        fullname: true,
        age: true,
        gender: true,
        email: true,
        phone: true,
        profileImage: true,
        bloodGroup: true,
        address: true,
        medicalHistory: true,
        password: false
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Patients fetched successfully',
      data: patients
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to search patients',
      error: error.message
    });
  }
};
