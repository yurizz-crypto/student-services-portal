interface Student {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

function formatStudent(student: Student): string {
  return `${student.id} - ${student.name} (${student.status})`;
}

// Runtime Validation
function isStudentValid(data: unknown): boolean {
  if (typeof data !== "object" || data === null) return false;

  const student = data as Record<string, unknown>;

  if (typeof student.id !== "number") return false;
  if (typeof student.name !== "string") return false;

  return true;
}

export function getStudentStatusLabel(
  status: StudentStatus | null | undefined
): string {
  // Handle invalid or unexpected values safely, as requested in Part 14
  if (!status) {
    return "Unknown Status";
  }

  switch (status) {
    case "active":
      return "Active Student";
    case "inactive":
      return "Inactive Student";
    default:
      // Fallback for runtime safety if invalid data bypasses TypeScript
      return "Unrecognized Status";
  }
}

export type StudentStatus = "active" | "inactive";

// Test it for Part 19:
console.log(getStudentStatusLabel("active")); // Should print: Active Student
console.log(getStudentStatusLabel("inactive")); // Should print: Inactive Student

const studentResponse: ApiResponse<Student> = {
  success: true,
  data: {
    id: 101,
    name: "Yuri Salise",
    email: "yuri@gmail.com",
    status: "active",
  },
};

console.log(formatStudent(studentResponse.data)); // Format

console.log(isStudentValid({ id: 1, name: "Alice", email: "a@a.com", status: "active" }),); // Valid

console.log(isStudentValid({
    id: "wrong-id",
    name: "Bob",
    email: "b@b.com",
    status: "active",}),); // Invalid ID

console.log(isStudentValid({ id: 2, email: "c@c.com", status: "active" })); // Missing name


