import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedHospitals = async () => {
  try {
    console.log("Seeding hospitals...");

    const hospitals = [
      {
        name: "Apollo Hospitals",
        address: "Plot No 1, Film Nagar, Hyderabad, Telangana 500096",
        email: "apollo@healthcare.com",
        phone: ["+91-40-23556789", "+91-40-23557890"],
        website: "www.apollohospitals.com",
        description: "Multi-specialty healthcare provider with state-of-the-art facilities",
        specialties: ["Cardiology", "Neurology", "Orthopedics", "Oncology"],
        facilities: ["24/7 Emergency", "ICU", "Pharmacy", "Laboratory"],
        images: [
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
          "https://images.unsplash.com/photo-1538108149393-fbbd81895907",
          "https://images.unsplash.com/photo-1516549655169-df83a0774514"
        ],
        rating: 4.5
      },
      {
        name: "Fortis Healthcare",
        address: "Mulund Goregaon Link Road, Mumbai, Maharashtra 400078",
        email: "fortis@healthcare.com", 
        phone: ["+91-22-25647890", "+91-22-25648901"],
        website: "www.fortishealthcare.com",
        description: "Leading integrated healthcare delivery service provider",
        specialties: ["Cardiology", "Gastroenterology", "Neurosurgery"],
        facilities: ["Emergency Care", "Blood Bank", "Dialysis Center"],
        images: [
          "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
          "https://images.unsplash.com/photo-1516549655169-df83a0774514"
        ],
        rating: 4.3
      },
      {
        name: "Medanta Hospital",
        address: "CH Baktawar Singh Road, Gurugram, Haryana 122001",
        email: "medanta@healthcare.com",
        phone: ["+91-124-4141414", "+91-124-4142424"],
        website: "www.medanta.org",
        description: "Super-specialty medical institute powered by technology",
        specialties: ["Liver Transplant", "Cardiac Sciences", "Neurosciences"],
        facilities: ["Robot-assisted Surgery", "Rehabilitation", "Telemedicine"],
        images: [
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
          "https://images.unsplash.com/photo-1516549655169-df83a0774514",
          "https://images.unsplash.com/photo-1538108149393-fbbd81895907"
        ],
        rating: 4.7
      },
      {
        name: "Max Healthcare",
        address: "Press Enclave Road, New Delhi, Delhi 110017",
        email: "max@healthcare.com",
        phone: ["+91-11-26515050", "+91-11-26515151"],
        website: "www.maxhealthcare.in",
        description: "Comprehensive, seamless and integrated healthcare services",
        specialties: ["Cancer Care", "Orthopedics", "Pediatrics"],
        facilities: ["MRI", "CT Scan", "Nuclear Medicine"],
        images: [
          "https://images.unsplash.com/photo-1516549655169-df83a0774514",
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
          "https://images.unsplash.com/photo-1538108149393-fbbd81895907"
        ],
        rating: 4.4
      },
      {
        name: "Manipal Hospitals",
        address: "HAL Airport Road, Bangalore, Karnataka 560017",
        email: "manipal@healthcare.com",
        phone: ["+91-80-25023456", "+91-80-25024567"],
        website: "www.manipalhospitals.com",
        description: "World-class healthcare services with cutting-edge technology",
        specialties: ["Transplants", "Robotics Surgery", "Cardiac Care"],
        facilities: ["Advanced Lab", "Ambulance", "Cafeteria"],
        images: [
          "https://images.unsplash.com/photo-1538108149393-fbbd81895907",
          "https://images.unsplash.com/photo-1516549655169-df83a0774514",
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d"
        ],
        rating: 4.6
      },
      {
        name: "Narayana Health",
        address: "Bommasandra Industrial Area, Bangalore, Karnataka 560099",
        email: "narayana@healthcare.com",
        phone: ["+91-80-27832345", "+91-80-27833456"],
        website: "www.narayanahealth.org",
        description: "High quality, affordable healthcare services",
        specialties: ["Heart Surgery", "Bone Marrow Transplant", "Nephrology"],
        facilities: ["Digital X-Ray", "Pharmacy", "Physiotherapy"],
        images: [
          "https://images.unsplash.com/photo-1516549655169-df83a0774514",
          "https://images.unsplash.com/photo-1538108149393-fbbd81895907",
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d"
        ],
        rating: 4.5
      },
      {
        name: "Kokilaben Hospital",
        address: "Rao Saheb Road, Mumbai, Maharashtra 400053",
        email: "kokilaben@healthcare.com",
        phone: ["+91-22-30980123", "+91-22-30981234"],
        website: "www.kokilabenhospital.com",
        description: "Advanced tertiary care facility",
        specialties: ["Oncology", "Neurology", "Cardiology"],
        facilities: ["3T MRI", "PET CT", "Linear Accelerator"],
        images: [
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
          "https://images.unsplash.com/photo-1516549655169-df83a0774514",
          "https://images.unsplash.com/photo-1538108149393-fbbd81895907"
        ],
        rating: 4.8
      },
      {
        name: "AIIMS Delhi",
        address: "Ansari Nagar East, New Delhi, Delhi 110029",
        email: "aiims@healthcare.gov.in",
        phone: ["+91-11-26588500", "+91-11-26588700"],
        website: "www.aiims.edu",
        description: "Premier government medical institution",
        specialties: ["General Medicine", "Surgery", "Research"],
        facilities: ["Teaching Hospital", "Research Labs", "Trauma Center"],
        images: [
          "https://images.unsplash.com/photo-1538108149393-fbbd81895907",
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
          "https://images.unsplash.com/photo-1516549655169-df83a0774514"
        ],
        rating: 4.2
      },
      {
        name: "Ruby Hall Clinic",
        address: "Sassoon Road, Pune, Maharashtra 411001",
        email: "ruby@healthcare.com",
        phone: ["+91-20-26163391", "+91-20-26163392"],
        website: "www.rubyhall.com",
        description: "Multi-specialty hospital with excellent patient care",
        specialties: ["Transplants", "Cardiology", "Orthopedics"],
        facilities: ["Blood Bank", "Cathlab", "NICU"],
        images: [
          "https://images.unsplash.com/photo-1516549655169-df83a0774514",
          "https://images.unsplash.com/photo-1538108149393-fbbd81895907",
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d"
        ],
        rating: 4.3
      },
      {
        name: "Care Hospitals",
        address: "Road No 1, Banjara Hills, Hyderabad, Telangana 500034",
        email: "care@healthcare.com",
        phone: ["+91-40-30418392", "+91-40-30418393"],
        website: "www.carehospitals.com",
        description: "Comprehensive healthcare services provider",
        specialties: ["Emergency Care", "Critical Care", "Pediatrics"],
        facilities: ["Modern OT", "ICU", "Pharmacy"],
        images: [
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
          "https://images.unsplash.com/photo-1516549655169-df83a0774514",
          "https://images.unsplash.com/photo-1538108149393-fbbd81895907"
        ],
        rating: 4.4
      }
    ];

    for (const hospital of hospitals) {
      await prisma.hospital.create({
        data: hospital
      });
    }

    console.log("Hospitals seeded successfully!");
    await prisma.$disconnect();
  } catch (error) {
    console.error("Error seeding hospitals:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

seedHospitals();