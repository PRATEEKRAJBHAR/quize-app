// Get references to your form elements and buttons
let quiz = document.getElementById("option-7");
let timer = document.getElementById("option-8");
let question = document.getElementById("option-6");
let opt1 = document.getElementById("option-1");
let opt2 = document.getElementById("option-2");
let opt3 = document.getElementById("option-3");
let opt4 = document.getElementById("option-4");
let correctans = document.getElementById("option-5");
let addbtn = document.getElementById("save-btn");
let savebtn = document.getElementById("btns");
let updatebtn=document.getElementById("update-btn");
// Quiz object to hold all questions
let obj = {
  quiz: "",
  timer: "",
  questions: []
};

// When a question is added, update the quiz object and then display all questions
addbtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Initialize quiz title and timer (if needed)

    obj.quiz = quiz.value;
    obj.timer = timer.value;
  

  // Create a new question object
  let questionObj = {
    question: question.value,
    opt1: opt1.value,
    opt2: opt2.value,
    opt3: opt3.value,
    opt4: opt4.value,
    correctans: correctans.value
  };

  // Push the new question into the quiz object
  obj.questions.push(questionObj);
  console.log(obj, "Current quiz data");

  // Update display with all questions
  displayAllQuestions();

  // Clear form fields for next input
  question.value = "";
  opt1.value = "";
  opt2.value = "";
  opt3.value = "";
  opt4.value = "";
  correctans.value = "";
  
  alert("Question added successfully!");
});


function displayAllQuestions() {
   

    let display_que = document.getElementById("questionContainer");
   
     // Clear the container first
     display_que.innerHTML = "";
   
     // Get the template element from the HTML
     let template = document.getElementById("questionTemplate");
   

     obj.questions.forEach((q,index) => {

       let clone = template.content.cloneNode(true);
   

       clone.querySelector(".quetions h2").textContent = q.question;
   

       let optionItems = clone.querySelectorAll(".options li");
       optionItems[0].textContent = q.opt1;
       optionItems[1].textContent = q.opt2;
       optionItems[2].textContent = q.opt3;
       optionItems[3].textContent = q.opt4;
   

       clone.querySelector("#ans").textContent =`correct answer: ${ q.correctans}`;



      //  delete operation performed
   clone.querySelector(".fa-trash").addEventListener("click", (e) => {
     e.preventDefault();
  // Remove question from array
  obj.questions.splice(index, 1);

  // Update the display
  displayAllQuestions();
   });

// edit operation perform
clone.querySelector(".fa-pen-to-square").addEventListener("click", (e) => {
  e.preventDefault();
  // alert("jai shree ram")
  
    question.value = q.question;
  opt1.value = q.opt1;
  opt2.value= q.opt2;
  opt3.value = q.opt3;
  opt4.value = q.opt4;
  correctans.value = q.correctans;
 

  savebtn.onclick = function() {
    obj.questions[index] = {
        question: question.value,
        opt1: opt1.value,
        opt2: opt2.value,
        opt3: opt3.value,
        opt4: opt4.value,
        correctans: correctans.value
    };

  displayAllQuestions();
  savebtn.onclick = adminshowing_data;
  }

})

       display_que.appendChild(clone);
     });
   
}


function adminshowing_data() {
  let data = JSON.parse(localStorage.getItem("quizData")) || [];
  data.push(obj);
  localStorage.setItem("quizData", JSON.stringify(data));
  console.log(obj, "Saved quiz data");
  alert("Quiz Data Saved Successfully!");

  obj = {
    quiz: "",
    timer: "",
    questions: []
  };
  quiz.value = "";
  timer.value = "";
  display_que.innerHTML = "";
}

savebtn.addEventListener("click", adminshowing_data);
