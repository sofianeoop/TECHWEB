var rows = 0;
var total_points = 0;

// Function to insert a row into the table
function doInsertRowTable(num, name, firstName, points) {
    const table = document.getElementsByTagName("table")[0];
    const tbody = table.querySelector("tbody");
    const row = document.createElement("tr");
    row.setAttribute("class", "row");

    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    col1.innerText = num;
    col2.innerText = name;
    col3.innerText = firstName;
    col4.innerText = points;

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    col5.append(checkbox);

    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_checkbox");

    row.append(col1);
    row.append(col2);
    row.append(col3);
    row.append(col4);
    row.append(col5);

    tbody.append(row);
}

const persons = [];

// Function to insert data
function doInsert(name, firstName, points) {
    rows++;
    const num = rows;
    total_points += points;
    doInsertRowTable(num, name, firstName, points);
    updateSummary();
}

// Function to log the table in the console
function ConsoleTable() {
    console.table(persons);
}

// Function to update the summary
function updateSummary() {
    document.getElementById("p1").innerText = rows + " row(s)";
    document.getElementById("p3").innerText = "Total point(s) = " + total_points;
}

// Function to handle new data entry
function doNewData() {
    const inputName = document.getElementById("form_nom");
    const inputFirstName = document.getElementById("form_prenom");
    const inputPoints = document.getElementById("form_points");

    const name = inputName.value;
    const firstName = inputFirstName.value;
    const points = parseInt(inputPoints.value);

    if (name === "" || firstName === "" || Number.isNaN(points)) {
        window.alert("Incomplete form! Please fill in all fields.");
    } else {
        doInsert(name, firstName, points);
    }

    persons.push({ name: name, firstName: firstName, points: points });

    inputName.value = "";
    inputFirstName.value = "";
    inputPoints.value = "";
}

// Function to delete selected rows
function deleteRow() {
    const table = document.getElementsByTagName("table")[0];
    let rowsDeleted = 0;

    for (let i = table.rows.length - 1; i > 0; i--) {
        const row = table.rows[i];
        const checkbox = row.cells[4].querySelector('input[type="checkbox"]');
        if (checkbox && checkbox.checked) {
            const points = parseInt(row.cells[3].innerText);
            total_points -= points;
            table.deleteRow(i);
            rowsDeleted++;
        }
    }

    if (rowsDeleted === 0) {
        alert("Please select a row to delete.");
        return;
    }

    rows -= rowsDeleted;
    for (let i = 1; i < table.rows.length; i++) {
        table.rows[i].cells[0].innerText = i;
    }

    persons.length = 0;
    for (let i = 1; i < table.rows.length; i++) {
        const row = table.rows[i];
        const name = row.cells[1].innerText;
        const firstName = row.cells[2].innerText;
        const points = parseInt(row.cells[3].innerText);
        persons.push({ name, firstName, points });
    }
    updateSummary();
}

