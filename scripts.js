document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const studentsTable = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];

    function loadStudents() {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        students.forEach(student => addStudentToTable(student));
    }

    function addStudentToTable(student) {
        const row = studentsTable.insertRow();
        row.setAttribute('data-id', student.studentId);

        const cell1 = row.insertCell(0);
        cell1.textContent = student.studentName;

        const cell2 = row.insertCell(1);
        cell2.textContent = student.studentId;

        const cell3 = row.insertCell(2);
        cell3.textContent = student.emailId;

        const cell4 = row.insertCell(3);
        cell4.textContent = student.contactNo;

        const cell5 = row.insertCell(4);
        cell5.className = 'actions';
        cell5.innerHTML = `
            <button class="edit" onclick="editStudent('${student.studentId}')">Edit</button>
            <button class="delete" onclick="deleteStudent('${student.studentId}')">Delete</button>
        `;
    }

    function saveStudent(student) {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
    }

    function updateStudent(student) {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const index = students.findIndex(s => s.studentId === student.studentId);
        if (index !== -1) {
            students[index] = student;
            localStorage.setItem('students', JSON.stringify(students));
        }
    }

    function deleteStudentFromStorage(studentId) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students = students.filter(student => student.studentId !== studentId);
        localStorage.setItem('students', JSON.stringify(students));
    }

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const studentName = document.getElementById('studentName').value;
        const studentId = document.getElementById('studentId').value;
        const emailId = document.getElementById('emailId').value;
        const contactNo = document.getElementById('contactNo').value;

        const student = { studentName, studentId, emailId, contactNo };

        if (studentId && studentName && emailId && contactNo) {
            addStudentToTable(student);
            saveStudent(student);
            registrationForm.reset();
        } else {
            alert('Please fill in all fields');
        }
    });

    window.editStudent = (studentId) => {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const student = students.find(student => student.studentId === studentId);
        if (student) {
            document.getElementById('studentName').value = student.studentName;
            document.getElementById('studentId').value = student.studentId;
            document.getElementById('emailId').value = student.emailId;
            document.getElementById('contactNo').value = student.contactNo;
            
            deleteStudent(studentId);
        }
    };

    window.deleteStudent = (studentId) => {
        const row = document.querySelector(`[data-id='${studentId}']`);
        row.parentNode.removeChild(row);
        deleteStudentFromStorage(studentId);
    };

    loadStudents();
});
