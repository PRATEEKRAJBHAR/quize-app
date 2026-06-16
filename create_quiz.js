let create_quiz = document.getElementById("option-7");
let timer = document.getElementById("option-8");
let question = document.getElementById("option-6");
let option1 = document.getElementById("option-1");
let option2 = document.getElementById("option-2");
let option3 = document.getElementById("option-3");
let option4 = document.getElementById("option-4");
let option5 = document.getElementById("option-5");
let questionContainer=document.getElementById("questionContainer")
let questionsavebtn=document.getElementById("save-btn");
let questionupdatebtn=document.getElementById("update-btn");
questionupdatebtn.style.display="none";
let weightage=document.getElementById("weightage");
let type=document.getElementById("type");
let select=document.getElementById("select");

let obj = {
    create_quiz: "",
    timer: "",
    type:"",
    selecte:"",
    questions: []
};

document.getElementById("save-btn").addEventListener("click", (e) => {
    e.preventDefault();

    if (question.value == "" || option1.value == "" || option2.value == "" || option3.value == "" || option4.value == "" || option5.value == "" ||weightage.value=="") {
        alert("All input fields are mandatory");
        return;
    }

    // If it's the first question for this quiz, initialize the quiz details
    if (obj.create_quiz === "" && obj.timer === ""&&obj.type==""&&obj.selecte=="") {
        // if (obj.create_quiz === "") {

        obj.create_quiz = create_quiz.value;
        obj.timer = timer.value;
        obj.type=type.value;
        obj.selecte=select.value;
    }


    let questionObj = {
        que: question.value,
        option1: option1.value,
        option2: option2.value,
        option3: option3.value,
        option4: option4.value,
        currectans: option5.value,
        weightage:weightage.value,
        // type:type.value
    };
    if(option1.value!==option5.value&&option2.value!==option5.value&&option3.value!==option5.value&&option4.value!==option5.value){
        alert("currect answers is not match one of the four options")
        return;
    }
    // Ensure all options are unique
    let optionsSet = new Set([option1.value, option2.value, option3.value, option4.value]);
    // console.log(optionsSet.size,"optionset");
    if (optionsSet.size !== 4) {
        alert("Each option must be unique. Please enter different options.");
        return;
    }
    
//when i edit then create new quetins so i write this code
if (editIndex !== null) {
  // console.log(obj.questions[editIndex],"editindex");
  // Update the existing question instead of adding a new one
  obj.questions[editIndex] = questionObj;
  editIndex = null; // Reset edit mode
} else {
  // Add as a new question if not editing
  obj.questions.push(questionObj);
}       
 displayAllQuestions()

    
// console.log(option1.value,"bhairav baba");
// console.log(option5.value,"barfani baba");

// console.log(obj.create_quiz,"ram ram");
   
   
    // console.log(obj,"shree ram");


    question.value = "";
    option1.value = "";
    option2.value = "";
    option3.value = "";
    option4.value = "";
    option5.value = "";
    weightage.value="";
    // type.value="";
});


// display all quetion

// Function to display all questions with options
// Function to display all questions using your HTML template
function displayAllQuestions() {
    // Build the HTML string by looping through your questions array
    let questionsHTML = "";
    obj.questions.forEach((q, index) => {
      questionsHTML += `
        <div class="background">
          <div id="quetions">
            <h2>Question No.${index + 1} ) ${q.que}</h2>
          </div>
          <div id="options">
            <li>&nbsp; ${q.option1}</li>
            <li>&nbsp;${ q.option2}</li>
            <li>&nbsp;${ q.option3}</li>
            <li>&nbsp;${ q.option4}</li>
          </div>
          <div id="currectanswer">
            <p id="ans">Correct answer: ${q.currectans}</p>
          </div>
          <div id="weightages">
            <p id="weight">Weightage: ${q.weightage}</p>
          </div>
        <!--  <div id="types">
            <p id="typess">Types: ${q.type}</p>
          </div>-->
          <div class="icons">
            <i class="fa-solid fa-trash" onclick="deleteQuestion(${index})"></i>
            <i class="fa-solid fa-pen-to-square" onclick="editQuestion(${index})"></i>
          </div>
        </div>
      `;
    });
  
    // Replace the content of the container with the built HTML string
    questionContainer.innerHTML = questionsHTML;
  }
  
  // Function to delete a question by index
  function deleteQuestion(index) {
    // Remove the question from the array
    obj.questions.splice(index, 1);
    // Refresh the display
    displayAllQuestions();
  }
  
  // Function to edit a question by index
  let editIndex = null;
 
    function editQuestion(index) {
      questionsavebtn.style.display="none";
  
      questionupdatebtn.style.display="block";
      // Retrieve the question to be edited
   
      let q = obj.questions[index];
    
      // Populate your input fields with the current data
      question.value = q.que;
      option1.value = q.option1;
      option2.value = q.option2;
      option3.value = q.option3;
      option4.value = q.option4;
      option5.value = q.currectans;
  weightage.value=q.weightage;
  // type.value=q.type;
      // Remove the question so that the edited version can replace it
      editIndex = index;
      displayAllQuestions();
    }
 
    questionupdatebtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (editIndex === null) return; // No question selected for editing
  
      // Validate input fields before updating
      if (question.value === "" || option1.value === "" || option2.value === "" || option3.value === "" || option4.value === "" || option5.value === ""||weightage.value==="") {
          alert("All input fields are mandatory");
          return;
      }
  
      // Ensure correct answer matches one of the four options
      if (![option1.value, option2.value, option3.value, option4.value].includes(option5.value)) {
          alert("The correct answer must match one of the four options.");
          return;
      }
  
      // Ensure all options are unique
      let optionsSet = new Set([option1.value, option2.value, option3.value, option4.value]);
      if (optionsSet.size !== 4) {
          alert("Each option must be unique. Please enter different options.");
          return;
      }
  console.log(editIndex,"editindex");
      // Update the question in the array
      obj.questions[editIndex] = {
          que: question.value,
          option1: option1.value,
          option2: option2.value,
          option3: option3.value,
          option4: option4.value,
          currectans: option5.value,
          weightage:weightage.value,
          // type:type.value
      };
  
      // Reset edit mode
      editIndex = null;
  
      // Hide the "Update" button and show the "Save" button
      questionupdatebtn.style.display = "none";
      questionsavebtn.style.display = "block";
  
      // Clear input fields after updating
      question.value = "";
      option1.value = "";
      option2.value = "";
      option3.value = "";
      option4.value = "";
      option5.value = "";
      // type.value="";
  weightage.value="";
      // Refresh the displayed questions
      displayAllQuestions();
  });
  
  


  

// submit quetion in local storage and then create another quetions
function adminshowing_data() {
//    alert("ram ram ji")
if (create_quiz.value==""||timer.value==""||type.value==""||select.value=="") {
  alert("create quiz and time is fields are mandatory");
  return;
}
  // Check if at least one question has been added
  if (obj.questions.length === 0) {
    alert("You must add at least one question before submitting.");
    return;
}

  let questionContainer = document.getElementById("questionContainer");
  questionContainer.style.display = "none";


  // Retrieve existing quizzes from localStorage
  let existing_quiz = JSON.parse(localStorage.getItem("quiz_name")) || [];
  
  // Check if quiz name already exists
  let uniqueQuiz = existing_quiz.some(quiz => quiz.create_quiz.trim().toLowerCase() === create_quiz.value.trim().toLowerCase());

  if (uniqueQuiz) {
      alert("This quiz name is already created. Please use a different name.");
    // return;
      
  } else {
      existing_quiz.push(obj);
      alert("Quiz created successfully!");
      window.location.href = "home_page.html";
      localStorage.setItem("quiz_name", JSON.stringify(existing_quiz));
  }
    


    create_quiz.value = "";
    timer.value = "";
    


     // Reset the quiz object for a new quiz
     obj = {
        create_quiz: "",
        timer: "",
        type:"",
        selecte:"",
        questions: []
    };




    // Display the updated list
    displayTasks();
}



// category 
let category=document.getElementById("category");
function addcategory(){
// alert("ram ram");
if(category.value==""){
  console.log("category is mandatory");
  return;
}
}

function loadCategories() {
  let categories = JSON.parse(localStorage.getItem("category")) || [];
  let categoryDropdown = document.getElementById("select");
  categories.forEach(c => {
    // console.log(c.category, "c");
      let option = document.createElement("option");
      option.value = c.category;
      option.textContent = c.category;
      categoryDropdown.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", loadCategories);

