import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Book new appointment
export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, description, status = 'pending' } = req.body;
    const patientId = req.user.id; // From auth middleware

    // Validate required fields
    if (!doctorId || !appointmentDate) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing',
        error: 'Please provide doctorId and appointmentDate'
      });
    }

    // Check if doctor exists
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId }
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
        error: 'Invalid doctor ID'
      });
    }

    // Check for existing appointment at same time
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        doctorId,
        appointmentDate,
        NOT: { status: 'cancelled' }
      }
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: 'Time slot not available',
        error: 'Please select a different time'
      });
    }

    const appointment = await prisma.appointment.create({
      data: {
        doctorId,
        patientId,
        appointmentDate: new Date(appointmentDate),
        description,
        status
      },
      include: {
        doctor: {
          select: {
            fullname: true,
            specialization: true,
            email: true,
            phone: true
          }
        },
        patient: {
          select: {
            fullname: true,
            email: true,
            phone: true
          }
        }
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: appointment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to book appointment',
      error: error.message
    });
  }
};

// Get appointment details
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: req.params.id },
      include: {
        doctor: {
          select: {
            fullname: true,
            specialization: true,
            email: true,
            phone: true
          }
        },
        patient: {
          select: {
            fullname: true,
            email: true,
            phone: true
          }
        }
      }
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
        error: 'Invalid appointment ID'
      });
    }

    // Check if user has permission to view this appointment
    if (req.user.role === 'patient' && appointment.patientId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
        error: 'You can only view your own appointments'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Appointment fetched successfully',
      data: appointment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch appointment',
      error: error.message
    });
  }
};

// Get user appointments (doctor or patient)
export const getUserAppointments = async (req, res) => {
  try {
    const { role, id } = req.user;
    const { status } = req.query;

    let where = {};
    if (role === 'doctor') {
      where.doctorId = id;
    } else {
      where.patientId = id;
    }

    if (status) {
      where.status = status;
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        doctor: {
          select: {
            fullname: true,
            specialization: true,
            email: true,
            phone: true
          }
        },
        patient: {
          select: {
            fullname: true,
            email: true,
            phone: true
          }
        }
      },
      orderBy: {
        appointmentDate: 'desc'
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Appointments fetched successfully',
      data: appointments
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments',
      error: error.message
    });
  }
};

// Update appointment status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
        error: 'Status must be pending, confirmed, cancelled, or completed'
      });
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status },
      include: {
        doctor: {
          select: {
            fullname: true,
            specialization: true,
            email: true,
            phone: true
          }
        },
        patient: {
          select: {
            fullname: true,
            email: true,
            phone: true
          }
        }
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Appointment status updated successfully',
      data: appointment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update appointment status',
      error: error.message
    });
  }
};