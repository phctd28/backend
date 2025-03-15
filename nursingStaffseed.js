import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);

  const nursingStaff = [
    {
      fullname: "Dr. Priya Sharma",
      registrationNumber: "RN2024001",
      email: "priya.sharma@hospital.com",
      phone: "9876543210",
      password: hashedPassword,
      gender: "Female",
      dateOfBirth: new Date("1990-05-15"),
      profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
      specialization: ["ICU", "Emergency Care"],
      experience: 8,
      currentEmployment: "Apollo Hospitals - ICU - Senior Nurse",
      languages: ["Hindi", "English", "Bengali"],
      address: "123 Park Street, New Delhi, Delhi, 110001"
    },
    {
      fullname: "Rajesh Kumar",
      registrationNumber: "RN2024002",
      email: "rajesh.kumar@hospital.com",
      phone: "9876543211",
      password: hashedPassword,
      gender: "Male",
      dateOfBirth: new Date("1988-08-20"),
      profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
      specialization: ["Pediatric", "NICU"],
      experience: 10,
      currentEmployment: "Fortis Healthcare - Pediatrics - Head Nurse",
      languages: ["Hindi", "English", "Marathi"],
      address: "456 Marine Drive, Mumbai, Maharashtra, 400001"
    },
    {
      fullname: "Anjali Menon",
      registrationNumber: "RN2024003",
      email: "anjali.menon@hospital.com",
      phone: "9876543212",
      password: hashedPassword,
      gender: "Female",
      dateOfBirth: new Date("1992-03-10"),
      profileImage: "https://randomuser.me/api/portraits/women/3.jpg",
      specialization: ["Cardiac Care", "Critical Care"],
      experience: 6,
      currentEmployment: "Narayana Health - Cardiac ICU - Staff Nurse",
      languages: ["Malayalam", "English", "Tamil"],
      address: "789 MG Road, Bangalore, Karnataka, 560001"
    },
    {
      fullname: "Sunita Patel",
      registrationNumber: "RN2024004",
      email: "sunita.patel@hospital.com",
      phone: "9876543213",
      password: hashedPassword,
      gender: "Female",
      dateOfBirth: new Date("1991-11-25"),
      profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
      specialization: ["Oncology", "Palliative Care"],
      experience: 9,
      currentEmployment: "Max Healthcare - Oncology - Charge Nurse",
      languages: ["Hindi", "English", "Gujarati"],
      address: "567 Civil Lines, Jaipur, Rajasthan, 302001"
    },
    {
      fullname: "Arjun Singh",
      registrationNumber: "RN2024005",
      email: "arjun.singh@hospital.com",
      phone: "9876543214",
      password: hashedPassword,
      gender: "Male",
      dateOfBirth: new Date("1993-07-12"),
      profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
      specialization: ["Mental Health", "Psychiatric Care"],
      experience: 5,
      currentEmployment: "Medanta Hospital - Psychiatry - Senior Staff Nurse",
      languages: ["Hindi", "English", "Punjabi"],
      address: "234 Model Town, Chandigarh, Punjab, 160001"
    },
    {
      fullname: "Lakshmi Venkatesh",
      registrationNumber: "RN2024006",
      email: "lakshmi.v@hospital.com",
      phone: "9876543215",
      password: hashedPassword,
      gender: "Female",
      dateOfBirth: new Date("1989-09-30"),
      profileImage: "https://randomuser.me/api/portraits/women/6.jpg",
      specialization: ["Surgical Care", "Operation Theater"],
      experience: 11,
      currentEmployment: "Manipal Hospitals - Surgery - OT In-charge",
      languages: ["Kannada", "English", "Telugu"],
      address: "890 Koramangala, Bangalore, Karnataka, 560034"
    },
    {
      fullname: "Mohammed Rafi",
      registrationNumber: "RN2024007",
      email: "mohammed.rafi@hospital.com",
      phone: "9876543216",
      password: hashedPassword,
      gender: "Male",
      dateOfBirth: new Date("1994-02-18"),
      profileImage: "https://randomuser.me/api/portraits/men/7.jpg",
      specialization: ["Emergency Care", "Trauma"],
      experience: 6,
      currentEmployment: "KIMS Hospital - Emergency - Emergency Nurse",
      languages: ["Malayalam", "English", "Arabic"],
      address: "123 Marine Drive, Kochi, Kerala, 682001"
    }
  ];

  for (const staff of nursingStaff) {
    await prisma.nursingStaff.create({
      data: staff
    });
  }

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
