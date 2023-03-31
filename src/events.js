const log = document.getElementById('log');
const eventTable = document.getElementById('eventTable');

async function updateTable() {
  const events = await gatherEventData();
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
  let url = '/api/events'
  try {
    const eventsResponse =  await fetch(url);
    return await eventsResponse.json();
  } catch (error) {
    console.log(error);
  }
}

updateTable();