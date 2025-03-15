import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const appointments = [
  {
    patientId: "67cc048d6cf402988f0994c9",
    doctorId: "67cbfd4e8434d82ba6feccd6",
    appointmentDate: new Date("2025-03-12T10:00:00Z"),
    status: "Confirmed",
    consultationFee: 700
  },
  {
    patientId: "67cc048d6cf402988f0994ca",
    doctorId: "67cbfd4e8434d82ba6feccd7",
    appointmentDate: new Date("2025-03-14T14:30:00Z"),
    status: "Pending",
    consultationFee: 600
  },
  {
    patientId: "67cc048e6cf402988f0994cb",
    doctorId: "67cbfd4e8434d82ba6feccd8",
    appointmentDate: new Date("2025-03-15T09:00:00Z"),
    status: "Confirmed",
    consultationFee: 800
  },
  {
    patientId: "67cc048e6cf402988f0994cc",
    doctorId: "67cbfd4e8434d82ba6feccd9",
    appointmentDate: new Date("2025-03-16T11:45:00Z"),
    status: "Cancelled",
    consultationFee: 650
  },
  {
    patientId: "67cc048e6cf402988f0994cd",
    doctorId: "67cbfd4e8434d82ba6feccda",
    appointmentDate: new Date("2025-03-18T15:00:00Z"),
    status: "Confirmed",
    consultationFee: 500
  },
  {
    patientId: "67cc048e6cf402988f0994ce",
    doctorId: "67cbfd4e8434d82ba6feccdb",
    appointmentDate: new Date("2025-03-19T12:30:00Z"),
    status: "Pending",
    consultationFee: 450
  },
  {
    patientId: "67cc048e6cf402988f0994cf",
    doctorId: "67cbfd4e8434d82ba6feccdc",
    appointmentDate: new Date("2025-03-20T08:00:00Z"),
    status: "Confirmed",
    consultationFee: 400
  },
  {
    patientId: "67cc048e6cf402988f0994d0",
    doctorId: "67cbfd4e8434d82ba6feccdd",
    appointmentDate: new Date("2025-03-22T13:15:00Z"),
    status: "Pending",
    consultationFee: 700
  },
  {
    patientId: "67cc048e6cf402988f0994d1",
    doctorId: "67cc216720ed64ad95a98ba3",
    appointmentDate: new Date("2025-03-24T09:30:00Z"),
    status: "Confirmed",
    consultationFee: 200
  },
  {
    patientId: "67cc1e0620ed64ad95a98ba2",
    doctorId: "67cbfd4e8434d82ba6feccd6",
    appointmentDate: new Date("2025-03-25T16:00:00Z"),
    status: "Cancelled",
    consultationFee: 700
  }
];

async function main() {
  console.log("Seeding appointments...");

  for (const appointment of appointments) {
    await prisma.appointment.create({
      data: {
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,
        appointmentDate: appointment.appointmentDate,
        status: appointment.status,
        consultationFee: appointment.consultationFee,
      },
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
