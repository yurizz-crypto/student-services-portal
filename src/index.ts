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

function isStudentValid(data: unknown): boolean {
  if (typeof data !== "object" || data === null) return false;

  const student = data as Record<string, unknown>;

  if (typeof student.id !== "number") return false;
  if (typeof student.name !== "string") return false;

  return true;
}

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
console.log(
  isStudentValid({ id: 1, name: "Alice", email: "a@a.com", status: "active" }),
); // Valid
console.log(
  isStudentValid({
    id: "wrong-id",
    name: "Bob",
    email: "b@b.com",
    status: "active",
  }),
); // Invalid ID
console.log(isStudentValid({ id: 2, email: "c@c.com", status: "active" })); // Missing name
