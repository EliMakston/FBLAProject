"use strict";
const studentSubmit = document.getElementById("student-submit");
const eventSubmit = document.getElementById("event-submit");
const log = document.getElementById("log");
const studentResponse = document.getElementById("student-response");
const eventResponse = document.getElementById("event-response");
studentSubmit.addEventListener("click", async (event) => {
  event.preventDefault();
  createStudent();
});
eventSubmit.addEventListener("click", async (event) => {
  event.preventDefault();
  createEvent();
});
async function createEvent() {
  const eventName = document.getElementById("event-name").value;
  const eventPoints = document.getElementById("event-points").value;
  const response = await fetch(`/api/events/?name=${eventName}&points=${eventPoints}`, {
    method: "POST"
  });
  if (response.ok) {
    const newEvent = await response.json();
    eventResponse.innerHTML = `Successfully created an event (${newEvent.name}) worth ${newEvent.points} points- ID: ${newEvent.id}`;
  }
}
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
