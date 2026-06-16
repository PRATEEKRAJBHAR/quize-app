let question=document.getElementById("option-6")
let option1=document.getElementById("option-1")
let option2=document.getElementById("option-2")
let option3=document.getElementById("option-3")
let option4=document.getElementById("option-4")
let currectans=document.getElementById("option-5")

function updateQuestion(){
    // alert("jai shree ram")
    let obj={
        question:question.value,
        option1:option1.value,
        option2:option2.value,
        option3:option3.value,
        option4:option4.value,
        currectans:currectans.value
    }
let exist_quiz=JSON.parse(localStorage.getItem("quiz"))||[]
exist_quiz.push(obj)
    localStorage.setItem("quiz",JSON.stringify(exist_quiz))
    // console.log(exist_quiz,"exist quiz");
}
updateQuestion()
// DisplayData()
// display here
function DisplayData(){
    let exist_quiz=JSON.parse(localStorage.getItem("quiz"))||[]
    // let quezlist=document.
    let questionsOnly=document.getElementById("tablebody");
    questionsOnly.innerHTML="";
// console.log(exist_quiz);
// row.setAttribute("data-index",index)
exist_quiz.forEach((ele,index)=>{
    // console.log(ele,index);
    let row=document.createElement("tr");
    row.id = `row-${index}`; // Assign an id to the row
console.log(row.id);
row.innerHTML=`
<td>${index+1}</td>

<td>${ele.question}</td>
<td>${ele.option1}</td>
<td>${ele.option2}</td>
<td>${ele.option3}</td>
<td>${ele.option4}</td>
<td>${ele.currectans}</td>
<td>
<button onclick="deleteBtn(${index})">delete</button>

<button onclick="editBtn(${index})">edit</button>




`
questionsOnly.appendChild(row)
})
}
DisplayData()

function deleteBtn(index) {
    let exist_quiz = JSON.parse(localStorage.getItem("quiz")) || [];


    exist_quiz.splice(index, 1); 
    localStorage.setItem("quiz", JSON.stringify(exist_quiz));

    // alert("Question deleted successfully!");
    
    DisplayData(); 
}
// edit button


// Function to edit a question
function editBtn(index) {
    let exist_quiz = JSON.parse(localStorage.getItem("quiz")) || [];
    let ele = exist_quiz[index];

    // Select the row and replace it with editable input fields
    let row = document.getElementById(`row-${index}`);
    row.innerHTML = `
        <td>${index + 1}</td>
        <td><input type="text" id="edit-question-${index}" value="${ele.question}"></td>
        <td><input type="text" id="edit-option1-${index}" value="${ele.option1}"></td>
        <td><input type="text" id="edit-option2-${index}" value="${ele.option2}"></td>
        <td><input type="text" id="edit-option3-${index}" value="${ele.option3}"></td>
        <td><input type="text" id="edit-option4-${index}" value="${ele.option4}"></td>
        <td><input type="text" id="edit-correctans-${index}" value="${ele.currectans}"></td>
        <td>
            <button onclick="update(${index})">Update</button>
            <button onclick="DisplayData()">Cancel</button>
        </td>
    `;
}

function update(index) {
    let exist_quiz = JSON.parse(localStorage.getItem("quiz")) || [];

    // Get updated values from input fields
    exist_quiz[index] = {
        question: document.getElementById(`edit-question-${index}`).value,
        option1: document.getElementById(`edit-option1-${index}`).value,
        option2: document.getElementById(`edit-option2-${index}`).value,
        option3: document.getElementById(`edit-option3-${index}`).value,
        option4: document.getElementById(`edit-option4-${index}`).value,
        currectans: document.getElementById(`edit-correctans-${index}`).value
    };

    localStorage.setItem("quiz", JSON.stringify(exist_quiz));
    DisplayData();
}
