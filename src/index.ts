/**
 * ============================================================================
 * UNIVERSITY STUDENT SERVICES PORTAL
 * ============================================================================
 *
 * This file serves as the core demonstration and entry point for the
 * Student Services Portal. It showcases essential TypeScript concepts:
 * 1. Type Aliases & Union Types
 * 2. Interfaces & Object Models
 * 3. Generics (Reusable Wrappers)
 * 4. Safe Conditional Handling & Exhaustive Checks
 * 5. Runtime Validation / Type Guards for Unknown Data
 * ============================================================================
 */

// ============================================================================
// PART 1: TYPE DEFINITIONS & BLUEPRINTS
// ============================================================================

/**
 * Type Alias: StudentStatus
 * Defines the allowed status states for any student in the portal.
 * Using a union ('active' | 'inactive') restricts values to only valid statuses.
 */
export type StudentStatus = "active" | "inactive";

/**
 * Interface: Student
 * The blueprint for a student record entity in the system.
 */
export interface Student {
  id: number;
  name: string;
  email: string;
  status: StudentStatus;
}

/**
 * Generic Interface: ApiResponse<T>
 * A standard, reusable response wrapper for API endpoints.
 * The generic parameter `<T>` allows the wrapper to carry any payload type
 * (e.g., a single Student, a list of Students, a Course, etc.).
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// ============================================================================
// PART 2: HELPER & FORMATTING FUNCTIONS
// ============================================================================

/**
 * Formats a student object into a user-friendly display string.
 *
 * @param student - The student object to format
 * @returns A formatted string representation (e.g., "101 - Yuri Salise (active)")
 */
export function formatStudent(student: Student): string {
  return `${student.id} - ${student.name} (${student.status})`;
}

/**
 * Converts a StudentStatus value into a human-readable descriptive label.
 * Includes defensive handling for null, undefined, or unexpected values.
 *
 * @param status - The student status or possible null/undefined value
 * @returns A human-readable status string
 */
export function getStudentStatusLabel(
  status: StudentStatus | null | undefined
): string {
  // Guard Clause: Safely handle null, undefined, or empty string values
  if (!status) {
    return "Unknown Status";
  }

  // Switch statement for exhaustive evaluation of union values
  switch (status) {
    case "active":
      return "Active Student";
    case "inactive":
      return "Inactive Student";
    default:
      // Fallback in case invalid runtime data bypasses static type checks
      return "Unrecognized Status";
  }
}

// ============================================================================
// PART 3: RUNTIME VALIDATION (TYPE GUARDS)
// ============================================================================

/**
 * Runtime Type Guard: Validates whether unknown incoming data conforms
 * to the minimum required structure of a Student.
 *
 * TypeScript types exist only at compile-time. When data is received from
 * external sources (APIs, forms, JSON files), runtime validation ensures
 * the data is safe to use.
 *
 * @param data - Any unknown input data
 * @returns True if data has valid id (number) and name (string), false otherwise
 */
export function isStudentValid(data: unknown): boolean {
  // Step 1: Ensure data is a non-null object
  if (typeof data !== "object" || data === null) {
    return false;
  }

  // Cast data to a record dictionary for safe property inspection
  const student = data as Record<string, unknown>;

  // Step 2: Validate essential fields and their types
  if (typeof student.id !== "number") {
    return false;
  }

  if (typeof student.name !== "string") {
    return false;
  }

  // Additional check: verify email and status if present
  if (
    typeof student.email !== "undefined" &&
    typeof student.email !== "string"
  ) {
    return false;
  }

  return true;
}

// ============================================================================
// PART 4: DEMONSTRATION & TEST EXECUTION
// ============================================================================

console.log("==================================================");
console.log("🎓 UNIVERSITY STUDENT SERVICES PORTAL DEMO");
console.log("==================================================\n");

// --- Test 1: Student Status Formatter ---
console.log("--- 1. Testing getStudentStatusLabel ---");
console.log("Status 'active':   ->", getStudentStatusLabel("active"));
console.log("Status 'inactive': ->", getStudentStatusLabel("inactive"));
console.log("Status null:       ->", getStudentStatusLabel(null));
console.log("Status undefined:  ->", getStudentStatusLabel(undefined));
console.log();

// --- Test 2: Generic API Response & Formatter ---
console.log("--- 2. Testing ApiResponse<T> & formatStudent ---");
const sampleStudentResponse: ApiResponse<Student> = {
  success: true,
  data: {
    id: 101,
    name: "Yuri Salise",
    email: "yuri@gmail.com",
    status: "active",
  },
};

console.log("API Success Status:", sampleStudentResponse.success);
console.log("Formatted Student: ", formatStudent(sampleStudentResponse.data));
console.log();

// --- Test 3: Runtime Validation for Unknown Data ---
console.log("--- 3. Testing isStudentValid (Runtime Validation) ---");

// Valid payload
const validData = {
  id: 1,
  name: "Alice Johnson",
  email: "alice@example.com",
  status: "active",
};
console.log(
  "Valid student payload:  ",
  isStudentValid(validData),
  " (Expected: true)"
);

// Invalid payload: id is a string instead of a number
const invalidIdData = {
  id: "wrong-id-format",
  name: "Bob Smith",
  email: "bob@example.com",
  status: "active",
};
console.log(
  "Invalid ID payload:     ",
  isStudentValid(invalidIdData),
  "(Expected: false)"
);

// Invalid payload: name property is missing
const missingNameData = {
  id: 2,
  email: "charlie@example.com",
  status: "active",
};
console.log(
  "Missing name payload:   ",
  isStudentValid(missingNameData),
  "(Expected: false)"
);

// Invalid payload: non-object primitive
console.log(
  "Invalid primitive input:",
  isStudentValid("random string"),
  "(Expected: false)"
);

console.log("\n==================================================");
console.log("✅ All checks completed successfully.");
console.log("==================================================");