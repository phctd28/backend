import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const seedDoctors = async () => {
  try {
    console.log("Seeding doctors...");

    const doctors = [
      {
        fullname: "Dr. Aakash Mehta",
        specialization: "Cardiologist",
        email: "aakash.mehta@example.com",
        registrationNumber: "MH12345",
        phone: "9876543210",
        password: await bcrypt.hash("securepass123", 10),
        gender: "Male",
        profileImage: "https://example.com/image1.jpg",
        description: "very good doctor",
        experience: 12,
        availability: ["Monday", "Wednesday", "Friday"],
        consultationfee: 800,
        address: "12th Road, Andheri, Mumbai, Maharashtra, 400053, India",
      },
      {
        fullname: "Dr. Priya Sharma",
        specialization: "Neurologist",
        email: "priya.sharma@example.com",
        registrationNumber: "MH12345",
        phone: "9876543211",
        password: await bcrypt.hash("strongpassword", 10),
        gender: "Female",
        profileImage: "https://example.com/image2.jpg",
        description: "very good doctor",
        experience: 15,
        availability: ["Tuesday", "Thursday", "Saturday"],
        consultationfee: 1200,
        address: "Safdarjung Enclave, New Delhi, Delhi, 110029, India",
      },
      {
        fullname: "Dr. Ramesh Iyer",
        specialization: "Orthopedic Surgeon",
        email: "ramesh.iyer@example.com",
        registrationNumber: "MH12345",
        phone: "9876543212",
        password: await bcrypt.hash("pediatrics123", 10),
        gender: "Male",
        profileImage: "https://example.com/image3.jpg",
        description: "very good doctor",
        experience: 20,
        availability: ["Monday", "Thursday"],
        consultationfee: 1000,
        address: "MG Road, Bangalore, Karnataka, 560001, India",
      },
      {
        fullname: "Dr. Sneha Kapoor",
        specialization: "Pediatrician",
        email: "sneha.kapoor@example.com",
        registrationNumber: "MH12345",
        phone: "9876543213",
        password: await bcrypt.hash("pediatrics123", 10),
        gender: "Female",
        profileImage: "https://example.com/image4.jpg",
        description: "very good doctor",
        experience: 10,
        availability: ["Monday", "Wednesday", "Friday"],
        consultationfee: 600,
        address: "Sector 43, Gurgaon, Haryana, 122001, India",
      },
      {
        fullname: "Dr. Vikram Rao",
        specialization: "Dermatologist",
        email: "vikram.rao@example.com",
        registrationNumber: "MH12345",
        phone: "9876543214",
        password: await bcrypt.hash("dermapass", 10),
        gender: "Male",
        profileImage: "https://example.com/image5.jpg",
        description: "very good doctor",
        experience: 8,
        availability: ["Tuesday", "Thursday"],
        consultationfee: 700,
        address: "Banjara Hills, Hyderabad, Telangana, 500034, India",
      },
      {
        fullname: "Dr. Ananya Roy",
        specialization: "Gynecologist",
        email: "ananya.roy@example.com",
        registrationNumber: "MH12345",
        phone: "9876543215",
        password: await bcrypt.hash("gynepass", 10),
        gender: "Female",
        profileImage: "https://example.com/image6.jpg",
        description: "very good doctor",
        experience: 14,
        availability: ["Monday", "Wednesday", "Friday"],
        consultationfee: 900,
        address: "Katpadi Road, Vellore, Tamil Nadu, 632004, India",
      },
      {
        fullname: "Dr. Suresh Verma",
        specialization: "Oncologist",
        email: "suresh.verma@example.com",
        registrationNumber: "MH12345",
        phone: "9876543216",
        password: await bcrypt.hash("oncopass", 10),
        gender: "Male",
        profileImage: "https://example.com/image7.jpg",
        description: "very good doctor",
        experience: 18,
        availability: ["Tuesday", "Thursday", "Saturday"],
        consultationfee: 1500,
        address: "Parel, Mumbai, Maharashtra, 400012, India",
      },
      {
        fullname: "Dr. Kavita Joshi",
        specialization: "Psychiatrist",
        email: "kavita.joshi@example.com",
        registrationNumber: "MH12345",
        phone: "9876543217",
        password: await bcrypt.hash("psychpass", 10),
        gender: "Female",
        profileImage: "https://example.com/image8.jpg",
        description: "very good doctor",
        experience: 11,
        availability: ["Monday", "Thursday"],
        consultationfee: 850,
        address: "Hosur Road, Bangalore, Karnataka, 560029, India",
      },
      {
        fullname: "Dr. Arjun Desai",
        specialization: "ENT Specialist",
        email: "arjun.desai@example.com",
        registrationNumber: "MH12345",
        phone: "9876543218",
        password: await bcrypt.hash("entpass", 10),
        gender: "Male",
        profileImage: "https://example.com/image9.jpg",
        description: "very good doctor",
        experience: 9,
        availability: ["Wednesday", "Friday"],
        consultationfee: 750,
        address: "Pedder Road, Mumbai, Maharashtra, 400026, India",
      },
      {
        fullname: "Dr. Neha Gupta",
        specialization: "Endocrinologist",
        email: "neha.gupta@example.com",
        registrationNumber: "MH12345",
        phone: "9876543219",
        password: await bcrypt.hash("endo123", 10),
        gender: "Female",
        profileImage: "https://example.com/image10.jpg",
        description: "very good doctor",
        experience: 13,
        availability: ["Monday", "Thursday"],
        consultationfee: 950,
        address: "Sector 38, Gurgaon, Haryana, 122001, India",
      },
    ];

    // Insert doctors into the database
    await prisma.doctor.createMany({ data: doctors });

    console.log("Seeding completed successfully!");
    await prisma.$disconnect();
  } catch (error) {
    console.error("Error seeding data:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

// Run the seed function
seedDoctors();
