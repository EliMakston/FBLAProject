"use strict";
const studentSubmit = document.getElementById("student-submit");
const log = document.getElementById("log");
const studentResponse = document.getElementById("student-response");
studentSubmit.addEventListener("click", async (event) => {
  event.preventDefault();
  createStudent();
});
async function createStudent() {
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const gradeLevel = document.getElementById("grade-level").value;
  const response = await fetch(`/api/students/?firstName=${firstName}&lastName=${lastName}&gradeLevel=${gradeLevel}`, {
    method: "POST"
  });
  if (response.ok) {
    const newStudent = await response.json();
    studentResponse.innerHTML = `Successfully created a student (${newStudent.firstName} ${newStudent.lastName} - ID: ${newStudent.id})`;
  }
}
//# sourceMappingURL=options.js.map
