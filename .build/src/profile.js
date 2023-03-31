"use strict";
url = new URL(window.location.href);
const path = url.pathname;
let studentData;
const log = document.getElementById("log");
const nameHeading = document.getElementById("name-heading");
const gradeHeading = document.getElementById("grade-heading");
const pointsHeading = document.getElementById("points-heading");
const eventTable = document.getElementById("event-table");
populatePage();
async function getStudentData() {
  let id = "";
  for (let i = path.length - 1; i >= 0; i--) {
    if (path[i] === "/") {
      break;
    }
    id += path[i];
  }
  const response = await fetch(`/api/students/${id}`);
  if (response.ok) {
    studentData = await response.json();
  }
}
async function populatePage() {
  await getStudentData();
  nameHeading.innerHTML = `${studentData.firstName} ${studentData.lastName}`;
  gradeHeading.innerHTML = `Grade ${studentData.gradeLevel}`;
  pointsHeading.innerHTML = `Points: ${studentData.points}`;
  updateTable();
}
async function updateTable() {
  const eventsAttended = studentData.events;
  const allEvents = await gatherEventData();
  const events = [];
  for (let i = 0; i < eventsAttended.length; i++) {
    for (let z = 0; z < allEvents.length; z++) {
      if (eventsAttended[i] === allEvents[z].id) {
        events.push(allEvents[z]);
      }
    }
  }
  for (let i = 0; i < events.length; i++) {
    const newRow = eventTable.insertRow(i + 1);
    const newName = newRow.insertCell(0);
    const newPoints = newRow.insertCell(1);
    const newID = newRow.insertCell(2);
    newName.innerHTML = events[i].name;
    newPoints.innerHTML = events[i].points;
    newID.innerHTML = events[i].id;
  }
}
async function gatherEventData() {
  let url2 = "/api/events";
  try {
    const eventsResponse = await fetch(url2);
    return await eventsResponse.json();
  } catch (error) {
    console.log(error);
  }
}
//# sourceMappingURL=profile.js.map
