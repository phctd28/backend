import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const appointments = [
    {
      doctorId: "67cd4bd5e48413d6a3e20b74",
      patientId: "67cd4b2af5f7d134c9ef6fd1",
      appointmentDate: new Date("2025-03-15T10:00:00Z"),
      description: "Routine heart checkup.",
      status: "confirmed",
    },
    {
      doctorId: "67cd4bd5e48413d6a3e20b75",
      patientId: "67cd4b2af5f7d134c9ef6fd2",
      appointmentDate: new Date("2025-03-16T11:30:00Z"),
      description: "Neurology consultation.",
      status: "pending",
    },
    {
      doctorId: "67cd4bd5e48413d6a3e20b76",
      patientId: "67cd4b2af5f7d134c9ef6fd3",
      appointmentDate: new Date("2025-03-17T09:45:00Z"),
      description: "Orthopedic follow-up.",
      status: "confirmed",
    },
    {
      doctorId: "67cd4bd5e48413d6a3e20b77",
      patientId: "67cd4b2af5f7d134c9ef6fd4",
      appointmentDate: new Date("2025-03-18T14:00:00Z"),
      description: "Pediatric checkup.",
      status: "cancelled",
    },
    {
      doctorId: "67cd4bd5e48413d6a3e20b78",
      patientId: "67cd4b2af5f7d134c9ef6fd5",
      appointmentDate: new Date("2025-03-19T16:00:00Z"),
      description: "Skin allergy consultation.",
      status: "pending",
    },
    {
      doctorId: "67cd4bd5e48413d6a3e20b79",
      patientId: "67cd4b2af5f7d134c9ef6fd6",
      appointmentDate: new Date("2025-03-20T12:15:00Z"),
      description: "Routine gynecology checkup.",
      status: "confirmed",
    },
    {
      doctorId: "67cd4bd5e48413d6a3e20b7a",
      patientId: "67cd4b2af5f7d134c9ef6fd7",
      appointmentDate: new Date("2025-03-21T08:30:00Z"),
      description: "Oncology consultation.",
      status: "pending",
    },
    {
      doctorId: "67cd4bd5e48413d6a3e20b7b",
      patientId: "67cd4b2af5f7d134c9ef6fd8",
      appointmentDate: new Date("2025-03-22T10:45:00Z"),
      description: "Psychiatry session.",
      status: "confirmed",
    },
    {
      doctorId: "67cd4bd5e48413d6a3e20b7c",
      patientId: "67cd4b2af5f7d134c9ef6fd9",
      appointmentDate: new Date("2025-03-23T15:00:00Z"),
      description: "ENT checkup.",
      status: "pending",
    },
    {
      doctorId: "67cd4bd5e48413d6a3e20b7d",
      patientId: "67cd4b2af5f7d134c9ef6fda",
      appointmentDate: new Date("2025-03-24T13:30:00Z"),
      description: "Endocrinology consultation.",
      status: "confirmed",
    },
  ];

  await prisma.appointment.createMany({
    data: appointments,
  });

  console.log("Appointments seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
