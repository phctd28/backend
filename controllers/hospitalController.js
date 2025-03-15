import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CREATE hospital
export const createHospital = async (req, res) => {
  try {
    const {
      name,
      address,
      email,
      phone,
      website,
      description,
      specialties,
      facilities,
      images
    } = req.body;

    // Validate required fields
    if (!name || !address || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing',
        error: 'Please provide name, address, email and phone'
      });
    }

    // Check if email exists
    const existingHospital = await prisma.hospital.findUnique({
      where: { email }
    });

    if (existingHospital) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
        error: 'Please use a different email'
      });
    }

    const hospital = await prisma.hospital.create({
      data: {
        name,
        address,
        email,
        phone,
        website,
        description,
        specialties,
        facilities,
        images
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Hospital created successfully',
      data: hospital
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create hospital',
      error: error.message
    });
  }
};

// GET all hospitals
export const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await prisma.hospital.findMany({
      include: {
        doctors: {
          select: {
            id: true,
            fullname: true,
            specialization: true
          }
        },
        _count: {
          select: {
            reviews: true,
            doctors: true
          }
        }
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Hospitals fetched successfully',
      data: hospitals
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch hospitals',
      error: error.message
    });
  }
};

// GET hospital by ID
export const getHospitalById = async (req, res) => {
  try {
    const hospital = await prisma.hospital.findUnique({
      where: { id: req.params.id },
      include: {
        doctors: {
          select: {
            id: true,
            fullname: true,
            specialization: true,
            experience: true
          }
        },
        reviews: {
          include: {
            patient: {
              select: {
                fullname: true
              }
            }
          }
        }
      }
    });

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found',
        error: 'Invalid hospital ID'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Hospital fetched successfully',
      data: hospital
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch hospital',
      error: error.message
    });
  }
};

// UPDATE hospital
export const updateHospital = async (req, res) => {
  try {
    const hospital = await prisma.hospital.update({
      where: { id: req.params.id },
      data: req.body
    });

    return res.status(200).json({
      success: true,
      message: 'Hospital updated successfully',
      data: hospital
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update hospital',
      error: error.message
    });
  }
};

// DELETE hospital
export const deleteHospital = async (req, res) => {
  try {
    await prisma.hospital.delete({
      where: { id: req.params.id }
    });

    return res.status(200).json({
      success: true,
      message: 'Hospital deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete hospital',
      error: error.message
    });
  }
};