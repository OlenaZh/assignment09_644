
//SET STORSGE
/*Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
}
//GET STORAGE 
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}*/
// CREATE AN ARRAY OF EMPLOYEES
let arrEmployees = [
    
    [12345678, "John Deer", 1234, "john@deer.com", "Director"]
    [12345679, "Ann Choo", 4567, "ann@choo.com", "CEO"]
    [12345699, "Ju May", 9876, "ju@may.com", "CTO"]
    [12345688, "J Cook", 2467, "j@cook.com", "QA"]
    [12348765, "May Smith", 0912, "may@smith.com", "HR"]
]

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
/*if (localStorage.getObj('employees') != null) {
arrEmployees = localStorage.getObj('employees');
}*/
if (localStorage.getItem('employees') !== null) {
    arrEmployees = JSON.parse(localStorage.getItem('employees'));
}

// GET DOM ELEMENTS
let form        = document.querySelector('#addForm');
let empTable    = document.querySelector('#employees');
let empCount    = document.querySelector('#empCount');

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid(arrEmployees);

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault();

    // GET THE VALUES FROM THE TEXT BOXES
    let empID    = parseInt(document.querySelector('#id').value);
    let empName  = document.querySelector('#name').value;
    let empExt   = parseInt(document.querySelector('#extension').value);
    let empEmail = document.querySelector('#email').value;
    let empDept  = document.querySelector('#department').value;
    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    let arrNewEmployee = [empID, empName, empExt, empEmail, empDept];
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    arrEmployees.push(arrNewEmployee);
    // BUILD THE GRID
    buildGrid(arrEmployees);
    // RESET THE FORM
    document.querySelector('#addForm').reset();
    // SET FOCUS BACK TO THE ID TEXT BOX
    document.querySelector('#id').focus();

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
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.lastElementChild.remove();
    // REBUILD THE TBODY FROM SCRATCH
    let tbody = document.createElement('tbody');
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for (let employee of arrEmployees) {
        tbody.innerHTML +=
        `
        <tr>
            <td>${employee[0]}</td>}
            <td>${employee[1]}</td>}
            <td>${employee[2]}</td>}
            <td><a href="mail to:${employee[3]}">${employee[3]}</a></td>
        </tr>
        `
    }
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbody);

    // UPDATE EMPLOYEE COUNT
    empCount.value = `(${arrEmployees.length})`;

    // STORE THE ARRAY IN STORAGE
    /*localStorage.setObj('employees', arrEmployees);*/
    localStorage.setItem('employees', JSON.stringify(arrEmployees));
};