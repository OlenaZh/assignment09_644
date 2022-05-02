
//SET STORSGE
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
}
//GET STORAGE 
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}
// CREATE AN ARRAY OF EMPLOYEES (1)
let arrEmployees = [
    [12345678, "Kate Moss", 1234, "kate@moss.com", "Director"],
    [12345679, "John Moss", 2222, "john@moss.com", "CTO"],
    [12345699, "Sam Moss", 3333, "sam@moss.com", "COO"],
    [12345688, "Pete Moss", 4444, "pete@moss.com", "CFO"],
    [12345677, "Ralf Moss", 5555, "ralf@moss.com", "Sales"],

];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
if (localStorage.getObj('employees') != null) {
arrEmployees = localStorage.getObj('employees');
}
/*if (localStorage.getItem('employees') !== null) {
    arrEmployees = JSON.parse(localStorage.getItem('employees'));
}*/

// GET DOM ELEMENTS (3)
let form        = document.getElementById('addForm');
let empTable    = document.getElementById('employees');
let empCount    = document.getElementById('empCount');

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS (2)
buildGrid(arrEmployees);

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault();

    // GET THE VALUES FROM THE TEXT BOXES
    let empID    = parseInt(document.getElementById('id').value);
    let empName  = document.getElementById('name').value;
    let empExt   = parseInt(document.getElementById('extension').value);
    let empEmail = document.getElementById('email').value;
    let empDept  = document.getElementById('department').value;
    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    let arrNewEmployee = [empID, empName, empExt, empEmail, empDept];
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    arrEmployees.push(arrNewEmployee);
    // BUILD THE GRID
    buildGrid(arrEmployees);
    // RESET THE FORM
    document.getElementById('addForm').reset();
    // SET FOCUS BACK TO THE ID TEXT BOX
    document.getElementById('id').focus();

});

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            // CONFIRM THE DELETE
            if (confirm('Do you want to delete this employee?')) {
        // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
        let rowIndex = e.target.parentNode.parentNode.rowIndex;
        // CALL DELETEROW() METHOD TO DELETE SPECIFIC ROW IN THE TABLE
        empTable.deleteRow(rowIndex);
        // REMOVE EMPLOYEE FROM ARRAY
        arrEmployees.splice(rowIndex - 1, 1);
        // BUILD THE GRID
        buildGrid(arrEmployees);
    }
}   

});

// BUILD THE EMPLOYEES GRID
function buildGrid(arrEmployees) {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION (4)
    empTable.lastElementChild.remove();
    // REBUILD THE TBODY FROM SCRATCH (5)
    let tbody = document.createElement('tbody');
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE (6) Build new table
    for (let employee of arrEmployees) {
        tbody.innerHTML +=
        `
        <tr>
            <td>${employee[0]}</td>
            <td>${employee[1]}</td>
            <td>${employee[2]}</td>
            <td><a href="mail to:${employee[3]}">${employee[3]}</a></td>
            <td>${employee[4]}</td>
            <td><button class="btn btn-sm btn-danger delete">X</button></td>
        </tr>
        `
    }
    // BIND THE TBODY TO THE EMPLOYEE TABLE (7)
    empTable.appendChild(tbody);

    // UPDATE EMPLOYEE COUNT
    empCount.value = `(${arrEmployees.length})`;

    // STORE THE ARRAY IN STORAGE
    localStorage.setObj('employees', arrEmployees);
    /*localStorage.setItem('employees', JSON.stringify(arrEmployees));*/
};