import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const seedPatients = async () => {
  try {
    console.log("Seeding patients...");

    const patients = [
      {
        fullname: "Rajesh Kumar",
        age: 35,
        gender: "Male",
        email: "rajesh.kumar@example.com",
        phone: "9876500010",
        password: await bcrypt.hash("patientpass1", 10),
        profileImage: "https://example.com/image1.jpg",
        bloodGroup: "O+",
        address: "MG Road, Mumbai, Maharashtra, 400001, India",
        medicalHistory: ["Diabetes", "Hypertension"],
      },
      {
        fullname: "Sneha Patil",
        age: 28,
        gender: "Female",
        email: "sneha.patil@example.com",
        phone: "9876500011",
        password: await bcrypt.hash("patientpass2", 10),
        profileImage: "https://example.com/image2.jpg",
        bloodGroup: "A+",
        address: "Connaught Place, New Delhi, Delhi, 110001, India",
        medicalHistory: ["Asthma"],
      },
      {
        fullname: "Amit Desai",
        age: 40,
        gender: "Male",
        email: "amit.desai@example.com",
        phone: "9876500012",
        password: await bcrypt.hash("patientpass3", 10),
        profileImage: "https://example.com/image3.jpg",
        bloodGroup: "B+",
        address: "Jayanagar, Bangalore, Karnataka, 560041, India",
        medicalHistory: ["High Cholesterol"],
      },
      {
        fullname: "Pooja Sharma",
        age: 33,
        gender: "Female",
        email: "pooja.sharma@example.com",
        phone: "9876500013",
        password: await bcrypt.hash("patientpass4", 10),
        profileImage: "https://example.com/image4.jpg",
        bloodGroup: "AB-",
        address: "Salt Lake, Kolkata, West Bengal, 700091, India",
        medicalHistory: ["Migraine"],
      },
      {
        fullname: "Vikram Choudhary",
        age: 50,
        gender: "Male",
        email: "vikram.choudhary@example.com",
        phone: "9876500014",
        password: await bcrypt.hash("patientpass5", 10),
        profileImage: "https://example.com/image5.jpg",
        bloodGroup: "O-",
        address: "Gariahat, Kolkata, West Bengal, 700029, India",
        medicalHistory: ["Heart Disease"],
      },
      {
        fullname: "Ananya Reddy",
        age: 27,
        gender: "Female",
        email: "ananya.reddy@example.com",
        phone: "9876500015",
        password: await bcrypt.hash("patientpass6", 10),
        profileImage: "https://example.com/image6.jpg",
        bloodGroup: "B-",
        address: "Jubilee Hills, Hyderabad, Telangana, 500033, India",
        medicalHistory: ["PCOS"],
      },
      {
        fullname: "Suresh Iyer",
        age: 45,
        gender: "Male",
        email: "suresh.iyer@example.com",
        phone: "9876500016",
        password: await bcrypt.hash("patientpass7", 10),
        profileImage: "https://example.com/image7.jpg",
        bloodGroup: "A-",
        address: "Anna Nagar, Chennai, Tamil Nadu, 600040, India",
        medicalHistory: ["Arthritis"],
      },
      {
        fullname: "Meena Agarwal",
        age: 30,
        gender: "Female",
        email: "meena.agarwal@example.com",
        phone: "9876500017",
        password: await bcrypt.hash("patientpass8", 10),
        profileImage: "https://example.com/image8.jpg",
        bloodGroup: "AB+",
        address: "Sector 44, Gurgaon, Haryana, 122003, India",
        medicalHistory: ["Thyroid Issues"],
      },
      {
        fullname: "Prakash Rao",
        age: 55,
        gender: "Male",
        email: "prakash.rao@example.com",
        phone: "9876500018",
        password: await bcrypt.hash("patientpass9", 10),
        profileImage: "https://example.com/image9.jpg",
        bloodGroup: "O+",
        address: "Church Street, Bangalore, Karnataka, 560001, India",
        medicalHistory: ["Kidney Stone"],
      },
      {
        fullname: "Neha Bajaj",
        age: 38,
        gender: "Female",
        email: "neha.bajaj@example.com",
        phone: "9876500019",
        password: await bcrypt.hash("patientpass10", 10),
        profileImage: "https://example.com/image10.jpg",
        bloodGroup: "B+",
        address: "Pimpri, Pune, Maharashtra, 411018, India",
        medicalHistory: ["Diabetes", "Obesity"],
      },
    ];

    // Insert patients into the database
    await prisma.patient.createMany({ data: patients });

    console.log("Seeding completed successfully!");
    await prisma.$disconnect();
  } catch (error) {
    console.error("Error seeding data:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

// Run the seed function
seedPatients();
