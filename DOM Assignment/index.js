const studentName = document.querySelector("#sname");
const studentId = document.querySelector("#sid");
const classs = document.querySelector("#class");
const rollNumber = document.querySelector("#roll");
const email = document.querySelector("#eid");
const addButton = document.querySelector("#btn");
var letters = /^[A-Za-z]+$/;

// Load stored data from localStorage when the page is loaded
window.addEventListener("load", loadData);

addButton.addEventListener("click", display);

function display() {
    // Check if any of the fields are empty
    if (studentName.value === '' || studentId.value === '' || classs.value === '' || rollNumber.value === '' || email.value === '') {
        alert("Please fill the form");
        return;
    }

    // Validate studentName and class fields to only contain letters
    if (!letters.test(studentName.value) || !letters.test(classs.value)) {
        alert("Use only characters for studentname and class");
        return;
    }

    const studentData = {
        name: studentName.value,
        id: studentId.value,
        class: classs.value,
        roll: rollNumber.value,
        email: email.value
    };

    
    storeData(studentData);


    datatoDOM(studentData);


    clearFields();
}

//  student data in localStorage
function storeData(student) {
    let students = JSON.parse(localStorage.getItem('students')) || []; // []=> to ensure if there is no student data,it returns an empty array
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
}

// load data from localStorage
function loadData() {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.forEach(student => {
        datatoDOM(student);
    });
}

//  add  student to the DOM
function datatoDOM(student) {
    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("div");


    const names = document.createElement("p");
    names.innerHTML = student.name;
    names.classList.add("names");
    detailsDiv.appendChild(names);

    
    const ids = document.createElement("p");
    ids.innerHTML = student.id;
    ids.classList.add("ids");
    detailsDiv.appendChild(ids);

    
    const classes = document.createElement("p");
    classes.innerHTML = student.class;
    classes.classList.add("classes");
    detailsDiv.appendChild(classes);


    const rollnos = document.createElement("p");
    rollnos.innerHTML = student.roll;
    rollnos.classList.add("rollnos");
    detailsDiv.appendChild(rollnos);

    
    const emailids = document.createElement("p");
    emailids.innerHTML = student.email;
    emailids.classList.add("emails");
    detailsDiv.appendChild(emailids);

    // Edit button
    const resetButton = document.createElement("button");
    resetButton.textContent = "Edit";
    resetButton.classList.add("reset");

    resetButton.addEventListener("click", () => {
        const nameElements = document.getElementsByClassName("names");
        const idElements = document.getElementsByClassName("ids");
        const classElements = document.getElementsByClassName("classes");
        const rollnoElements = document.getElementsByClassName("rollnos");
        const emailElements = document.getElementsByClassName("emails");

        changetoInput(nameElements);
        changetoInput(idElements);
        changetoInput(classElements);
        changetoInput(rollnoElements);
        changetoInput(emailElements);

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        detailsDiv.appendChild(saveButton);

        saveButton.addEventListener("click", () => {
            changetoText(nameElements);
            changetoText(idElements);
            changetoText(classElements);
            changetoText(rollnoElements);
            changetoText(emailElements);

            saveButton.remove(); // Remove the save button after saving the data

            // Update localStorage 
            updateData();
        });
    });
    detailsDiv.appendChild(resetButton);

    // Delete button 
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => {
        detailsDiv.remove();
        deleteData(student.id);
    });
    detailsDiv.appendChild(deleteButton);

    document.querySelector(".div2").appendChild(detailsDiv);
}

//  clear input fields
function clearFields() {
    document.querySelectorAll('input').forEach(input => input.value = '');
}


//  delete student data from localStorage
function deleteData(id) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students = students.filter(student => student.id !== id);
    localStorage.setItem('students', JSON.stringify(students));
}

// update localStorage after editing data
function updateData() {
    let students = [];
    const nameElements = document.querySelectorAll(".names");
    const idElements = document.querySelectorAll(".ids");
    const classElements = document.querySelectorAll(".classes");
    const rollnoElements = document.querySelectorAll(".rollnos");
    const emailElements = document.querySelectorAll(".emails");

    for (let i = 0; i < nameElements.length; i++) {
        const student = {
            name: nameElements[i].innerHTML,
            id: idElements[i].innerHTML,
            class: classElements[i].innerHTML,
            roll: rollnoElements[i].innerHTML,
            email: emailElements[i].innerHTML
        };
        students.push(student);
    }

    localStorage.setItem('students', JSON.stringify(students));
}

// para into input
function changetoInput(elements) {
    for (let element of elements) {
        const input = document.createElement("input");
        input.value = element.innerHTML;
        input.className = element.className; 
        element.parentNode.replaceChild(input, element);
    }
}

// input to text
function changetoText(inputs) {
    for (let input of inputs) {
        const text = document.createElement("p");
        text.innerHTML = input.value;
        text.className = input.className; 
        input.parentNode.replaceChild(text, input);
    }
}







