"use strict";
const studentRoster = document.getElementById("roster");
const log = document.getElementById("log");
const grade9Check = document.getElementById("grade9");
const grade10Check = document.getElementById("grade10");
const grade11Check = document.getElementById("grade11");
const grade12Check = document.getElementById("grade12");
let rowCount = 0;
let gradeLevelArray = [9, 10, 11, 12];
let currentStudents = [];
const gradeLevelHead = document.getElementById("gradeLevelHead");
let gradeLevelAsc = false;
gradeLevelHead.addEventListener("click", (event) => {
  if (!gradeLevelAsc) {
    filterByGrade("asc");
    gradeLevelAsc = true;
  } else {
    filterByGrade("desc");
    gradeLevelAsc = false;
  }
});
grade9Check.addEventListener("change", (event) => {
  updateGradeLevelArray(event, 9);
});
grade10Check.addEventListener("change", (event) => {
  updateGradeLevelArray(event, 10);
});
grade11Check.addEventListener("change", (event) => {
  updateGradeLevelArray(event, 11);
});
grade12Check.addEventListener("change", (event) => {
  updateGradeLevelArray(event, 12);
});
async function getStudents(gradeLevel) {
  let url = "/api/students";
  if (gradeLevel) {
    url += `?gradeLevel=${gradeLevel}`;
  }
  try {
    const studentResponse = await fetch(url);
    return await studentResponse.json();
  } catch (error) {
    console.log(error);
  }
}
async function updateTable() {
  let students;
  if (currentStudents.length === 0) {
    students = await gatherStudentData();
  } else {
    students = currentStudents;
  }
  for (let i = 0; i < rowCount; i++) {
    deleteRow(1);
  }
  rowCount = 0;
  for (let i = 0; i < students.length; i++) {
    const newRow = studentRoster.insertRow(i + 1);
    const newFirst = newRow.insertCell(0);
    const newLast = newRow.insertCell(1);
    const newGrade = newRow.insertCell(2);
    const newPoints = newRow.insertCell(3);
    const newID = newRow.insertCell(4);
    newFirst.innerHTML = students[i].firstName;
    newLast.innerHTML = students[i].lastName;
    newGrade.innerHTML = students[i].gradeLevel;
    newPoints.innerHTML = students[i].points;
    newID.innerHTML = students[i].id;
    rowCount++;
  }
  currentStudents = students;
}
async function deleteRow(rowIndex) {
  studentRoster.deleteRow(rowIndex);
}
async function gatherStudentData() {
  const students = [];
  for (let i = 0; i < gradeLevelArray.length; i++) {
    const temp = await getStudents(gradeLevelArray[i]);
    for (let z = 0; z < temp.length; z++) {
      students.push(temp[z]);
    }
  }
  return students;
}
updateTable();
function updateGradeLevelArray(event, gradeNumber) {
  currentStudents = [];
  if (event.target.checked) {
    gradeLevelArray.push(gradeNumber);
    updateTable();
  } else {
    const index = gradeLevelArray.indexOf(gradeNumber);
    if (index > -1) {
      gradeLevelArray.splice(index, 1);
    }
    updateTable();
  }
}
function filterByGrade(order) {
  const temp = [];
  for (let i = 0; i < currentStudents.length; i++) {
    temp.push(currentStudents[i]);
  }
  const returnList = [];
  let currentGrade;
  if (order === "asc") {
    currentGrade = 9;
  } else if (order === "desc") {
    currentGrade = 12;
  }
  for (let i = 0; i < temp.length; i++) {
    if (temp[i].gradeLevel * 1 === currentGrade) {
      returnList.push(temp[i]);
      temp.splice(i, 1);
      i = i - 1;
    }
    if (i + 1 >= temp.length) {
      if (order === "asc") {
        if (currentGrade <= 12) {
          i = -1;
        }
        currentGrade++;
      } else if (order === "desc") {
        if (currentGrade >= 9) {
          i = -1;
          currentGrade--;
        }
      }
    }
  }
  currentStudents = returnList;
  updateTable();
  for (let i = 0; i < temp.length; i++) {
    if (temp[i].gradeLevel * 1 === currentGrade) {
      returnList.push(temp[i]);
      temp.splice(i, 1);
      i = i - 1;
    }
  }
}
updateTable();
//# sourceMappingURL=students.js.map
