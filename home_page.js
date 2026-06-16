

function loadQuizzes() {
    let existing_quiz = JSON.parse(localStorage.getItem("quiz_name")) || [];
    let reversedQuiz = [...existing_quiz].reverse(); // Create a reversed copy for display
    let quizlist = document.getElementById("tablebody");
    quizlist.innerHTML = "";

    reversedQuiz.forEach((ele, index) => {
        let questionCount = ele.questions.length;
        let totalWeightage = ele.questions.reduce((acc, q) => acc + Number(q.weightage || 0), 0);

        let row = document.createElement("tr");
        row.setAttribute("data-index", index);
        row.innerHTML = `
            <td>${existing_quiz.length - index}</td>
            <td class="quize-name">${ele.create_quiz}</td>
            <td class="type">${ele.type}</td>
            <td class="category">${ele.selecte}</td>
            <td class="total-que">${questionCount} </td>
            <td class="weight">${totalWeightage}</td>
            <td class="timer">${ele.timer}</td>
            <td class="goto-questions">
                <a href="edits_page.html" style="text-decoration:none">
                    <button class="edit-btn" onclick="saveSelectedQuiz('${ele.create_quiz}')">Edit</button>
                </a>
                <button class="delete-btn" onclick="deleteQuiz(${existing_quiz.length - 1 - index})">Delete</button>
                <a href="term_and_condition.html">
                    <button class="start-link" onclick="saveSelectedQuiz('${ele.create_quiz}')">Start</button>
                </a>
            </td>
        `;
        quizlist.appendChild(row);
    });
}







// Save selected quiz name before navigating to edit or start pages
function saveSelectedQuiz(quiz_name) {
    // document.querySelectorAll(".filter").style.display="none";
    // console.log(quiz_name,"quiz nane");
    // alert(quiz_name,"quiz nane")
    localStorage.setItem("selected_quiz", quiz_name);
}





// Delete a quiz
function deleteQuiz(index) {
    let existing_quiz = JSON.parse(localStorage.getItem("quiz_name")) || [];
    existing_quiz.splice(index, 1);
    localStorage.setItem("quiz_name", JSON.stringify(existing_quiz));
    loadQuizzes();
}


// Load quizzes on page load
window.onload = loadQuizzes;




function editQuiz() {
    let quiz_name = localStorage.getItem("selected_quiz"); // Retrieve selected quiz name
    // console.log(quiz_name,"quiz_name");
    let existing_quiz = JSON.parse(localStorage.getItem("quiz_name")) || [];

    let quizIndex = existing_quiz.findIndex(q => q.create_quiz === quiz_name); // Find quiz index
    // console.log(quizIndex,"shree ram");
    // alert(quizIndex,"shree ram")
    let quiz = existing_quiz[quizIndex]; // Get the quiz object
    // console.log(quiz, "quiz object");
    if (!quiz) {
        console.error("Quiz not found!");
        return;
    }

    // console.log("Quiz Found:", quiz.create_quiz);

    // Display Quiz Title with Edit & Delete Buttons
    let quizTitleContainer = document.getElementById("quizTitle");
    if (quizTitleContainer) {
        quizTitleContainer.innerHTML = `
            <h2 >Quiz Title: <span id="quizName">${quiz.create_quiz}</span></h2>
            <h3>Category: <span id="category">${quiz.selecte} </span></h3>
            <h3>Hardness: <span id="hardness">${quiz.type} </span></h3>
             <h3>Your Time Is: <span id="Timer">${quiz.timer} Minutes</span></h3>
            <div class="button-container">
    <button class="edit-btn" onclick="editQuizName(${quizIndex}, ${quiz.timer})">Edit Quiz Or Timer</button>
    <button class="delete-btn" onclick="deleteQuiz(${quizIndex})">Delete Quiz</button>
    <button class="add-btn" onclick="addQuiz(${quizIndex})">Add Question</button>
</div>

        `;
    }

    // Display Questions
    let uniqueQuiz = document.getElementById("questionContainer");
    uniqueQuiz.innerHTML = "";

    quiz.questions.forEach((q, i) => {
        // console.log(q.que,"question");
        uniqueQuiz.innerHTML += `
            <div class="background" id="question-${i}">

                <h3>Q.${i + 1}: <span id="questionText-${i}">${q.que}</span></h3>
                <ul>
                    <li id="opt1-${i}">${q.option1}</li>
                    <li id="opt2-${i}">${q.option2}</li>
                    <li id="opt3-${i}">${q.option3}</li>
                    <li id="opt4-${i}">${q.option4}</li>
                </ul>
                <style>
  ul {
    list-style: none;
    counter-reset: roman-counter;
    padding-left: 0;
  }
  li {
    counter-increment: roman-counter;
  }
  li::before {
    content: counter(roman-counter, lower-roman) " ) ";
  }
</style>
                <p><strong>Correct Answer:</strong> <span id="correctAns-${i}">${q.currectans}</span></p>
                <p><strong>Weightage:</strong> <span id="weightage-${i}">${q.weightage}</span></p>


                <button class="edits-btn" onclick="editQuestion(${quizIndex}, ${i})">Edit Question</button>

                <button class="delete-btn" onclick="deleteQuestion(${quizIndex}, ${i})">Delete Question</button>
                
               


            </div>
        `;
    });
}
let currentQuizIndex1 = null;
//   console.log(currentQuizIndex,"currentQuizIndex");
// document.querySelector("#forms").style.display = "none";




// Show the form and pre-fill values when editing
function editQuizName(index) {
    let categories = JSON.parse(localStorage.getItem("category")) || [];

    // this is selector auto filled
      let categoryDropdown = document.getElementById("select");
      categories.forEach(c => {
          let option = document.createElement("option");
          option.value = c.category;
          option.textContent = c.category;
          categoryDropdown.appendChild(option);
      });
    document.querySelector("#forms").style.display = "block"; // Show form
    currentQuizIndex1 = index; // Store index
    document.getElementById("form").style.display = "none"; // Show the form
// document.getElementById("filter").style.display="none";
// document.getElementById("apply").style.display="none";
    let existing_quiz = JSON.parse(localStorage.getItem("quiz_name")) || [];

    if (!existing_quiz[index]) {
        alert("Quiz not found!");
        return;
    }

    // Pre-fill input fields
    document.getElementById("option-7").value = existing_quiz[index].create_quiz || "";
    document.getElementById("option-8").value = existing_quiz[index].timer || "";
}

// Update the quiz with new values
function updateQuiz(event) {

    // document.getElementById("filter").style.display="block";
    // document.getElementById("apply").style.display="block";
    document.getElementById("forms").style.display = "none"
    event.preventDefault(); // Prevents page refresh

    if (currentQuizIndex1 === null) {
        alert("No quiz selected!");
        return;
    }

    let existing_quiz = JSON.parse(localStorage.getItem("quiz_name")) || [];
    if (!existing_quiz[currentQuizIndex1]) {
        alert("Quiz not found!");
        return;
    }

    // Get values from input fields
    let newName = document.getElementById("option-7").value.trim();
    let newTime = document.getElementById("option-8").value.trim();
    let newCategory=document.getElementById("select").value.trim();
    let newhardnesslevel=document.getElementById("type").value.trim();

    // Validate input
    if (!newName || !newTime ||!newCategory || !newhardnesslevel) {
        alert("Quiz name and timer cannot be empty.");
        return;
    }

    if (isNaN(newTime) || Number(newTime) <= 0) {
        alert("Please enter a valid number for the timer.");
        return;
    }

    // Ensure quiz name is unique
    let nameExists = existing_quiz.some((quiz, i) => i !== currentQuizIndex1 && quiz.create_quiz === newName);
    if (nameExists) {
        alert("This quiz name already exists! Please choose a different name.");
        return;
    }

    // Update quiz data
    existing_quiz[currentQuizIndex1].create_quiz = newName;
    //   console.log(existing_quiz[currentQuizIndex1].create_quiz,"existing_quiz[currentQuizIndex1].create_quiz");
    existing_quiz[currentQuizIndex1].timer = Number(newTime);
    existing_quiz[currentQuizIndex1].selecte=newCategory;
    existing_quiz[currentQuizIndex1].type=newhardnesslevel;

    // Save updated quiz list
    localStorage.setItem("quiz_name", JSON.stringify(existing_quiz));

    // Update UI elements (optional)
    document.getElementById("quizName").innerText = newName;
    document.getElementById("Timer").innerText = newTime + " Minutes";
   document.getElementById("category").innerHTML=newCategory;
   document.getElementById("hardness").innerHTML=newhardnesslevel;
    // Hide form
    document.querySelector("forms").style.display = "none";

    alert("Quiz updated successfully!");
}


// Delete Entire Quiz
function deleteQuiz(index) {
    // console.log(index,"index");
    // alert(index,"index")
    if (confirm("Are you sure you want to delete this quiz?")) {
        let existing_quiz = JSON.parse(localStorage.getItem("quiz_name")) || [];
        existing_quiz.splice(index, 1);
        localStorage.setItem("quiz_name", JSON.stringify(existing_quiz));
        alert("Quiz deleted successfully!");
        window.location.href = "home_page.html"; // Redirect to main page
    }
}

// Load question details and autofill the form
let forms = document.getElementById("form");
// forms.style.display = "none";
// document.getElementById("btns").style.display = "none"
// document.getElementById("btn").style.display = "none"

function editQuestion(quizIndex, questionIndex) {
    let forms = document.getElementById("form");
    forms.style.display = "block";
    document.querySelector("#forms").style.display = "none";
    document.getElementById("btns").style.display="none"//add button
    document.getElementById("btn").style.display = "block"//update button
     
    // document.getElementById("filter").style.display="none";
    // document.getElementById("apply").style.display="none";
    console.log(quizIndex, "quizIndex");
    console.log(questionIndex, "questionIndex");

    let existing_quiz = JSON.parse(localStorage.getItem("quiz_name")) || [];

    // Validate if the quiz and question exist
    if (!existing_quiz[quizIndex] || !existing_quiz[quizIndex].questions[questionIndex]) {
        alert("Quiz or question not found!");
        return;
    }

    let question = existing_quiz[quizIndex].questions[questionIndex];

    console.log(question.que, "question");
    console.log(question.option1, "question1");
    console.log(question.option2, "question2");
    console.log(question.option3, "question3");
    console.log(question.option4, "question4");
    console.log(question.currectans, "currectans");



    // Autofill the form fields

    console.log(document.getElementById("option-6"), "dfdfdgfdgfd");
    document.getElementById("option-6").value = question.que || "";
    document.getElementById("option-1").value = question.option1 || "";
    document.getElementById("option-2").value = question.option2 || "";
    document.getElementById("option-3").value = question.option3 || "";
    document.getElementById("option-4").value = question.option4 || "";
    document.getElementById("option-5").value = question.currectans || "";
    document.getElementById("weightage").value = question.weightage || "";
    // document.getElementById("type").value = question.type || "";




    console.log(question.que, "question");
    console.log(question.option1, "question1");
    console.log(question.option2, "question2");
    console.log(question.option3, "question3");
    console.log(question.option4, "question4");
    console.log(question.currectans, "currectans");

    // Store quizIndex and questionIndex in hidden fields or globally for the update function
    localStorage.setItem("edit_quiz_index", quizIndex);
    localStorage.setItem("edit_question_index", questionIndex);
}

// Update the question after editing
function updateQuestion() {
//    alert("ram ram ji")
    let quizIndex = localStorage.getItem("edit_quiz_index");
    let questionIndex = localStorage.getItem("edit_question_index");
    let existing_quiz = JSON.parse(localStorage.getItem("quiz_name")) || [];
    // document.getElementById("filter").style.display="block";
    // document.getElementById("apply").style.display="block";
    // Validate if quiz and question exist
    if (!existing_quiz[quizIndex] || !existing_quiz[quizIndex].questions[questionIndex]) {
        alert("Quiz or question not found!");
        return;
    }

    // Get updated values from the form
    let newQuestion = document.getElementById("option-6").value;
    let newOption1 = document.getElementById("option-1").value;
    let newOption2 = document.getElementById("option-2").value;
    let newOption3 = document.getElementById("option-3").value;
    let newOption4 = document.getElementById("option-4").value;
    let newCorrectAns = document.getElementById("option-5").value;
    let weightage=document.getElementById("weightage").value;
    // let type=document.getElementById("type").value;

    // Validate if the correct answer is one of the options
    if (![newOption1, newOption2, newOption3, newOption4].includes(newCorrectAns)) {
        alert("The correct answer must match one of the four options. Please try again.");
        return;
    }

    let optionsSet = new Set([newOption1, newOption2, newOption3, newOption4]);
    if (optionsSet.size !== 4) {
        alert("Each option must be unique. Please enter different options.");
        return;
    }
    // Update the question data
    existing_quiz[quizIndex].questions[questionIndex] = {
        que: newQuestion,
        option1: newOption1,
        option2: newOption2,
        option3: newOption3,
        option4: newOption4,
        currectans: newCorrectAns,
        weightage:weightage,
        // type:type,
    };

    // Save back to localStorage
    localStorage.setItem("quiz_name", JSON.stringify(existing_quiz));

    alert("Question updated successfully!");
}


// Delete a Question
function deleteQuestion(quizIndex, questionIndex) {
    if (confirm("Are you sure you want to delete this question?")) {
        let existing_quiz = JSON.parse(localStorage.getItem("quiz_name")) || [];
        existing_quiz[quizIndex].questions.splice(questionIndex, 1);

        localStorage.setItem("quiz_name", JSON.stringify(existing_quiz));
        document.getElementById(`question-${questionIndex}`).remove();
        editQuiz(); // Call a function to re-render questions
        alert("Question deleted successfully!");

    }
}



// Add question
let currentQuizIndex = null; // To store the selected quiz index

// Function to show the form when clicking "Add Question"
function addQuiz(quizIndex) {
    currentQuizIndex = quizIndex; // Store the selected quiz index
    // document.getElementById("form").style.display = "none"; // Show the form
    document.getElementById("btns").style.display = "block"//this is add button
    document.querySelector("#forms").style.display = "none";
    let forms = document.getElementById("form");
    forms.style.display = "block";
    // document.getElementById("btns").style.display="none"//add button
    document.getElementById("btn").style.display = "none"//update button

    // document.getElementById("filter").style.display="none";
    // document.getElementById("apply").style.display="none";
    document.getElementById("option-6").value = "";
    document.getElementById("option-1").value = "";
    document.getElementById("option-2").value = "";
    document.getElementById("option-3").value = "";
    document.getElementById("option-4").value = "";
    document.getElementById("option-5").value = "";
    document.getElementById("weightage").value = "";
}

// Function to save the new question
function Added() {
    // document.getElementById("filter").style.display="block";
    // document.getElementById("apply").style.display="block";
    let existing_quiz = JSON.parse(localStorage.getItem("quiz_name")) || [];

    if (currentQuizIndex === null || !existing_quiz[currentQuizIndex]) {
        alert("Quiz not found!");
        return;
    }

    // Get values from input fields
    let newQuestion = document.getElementById("option-6").value.trim();
    let newOption1 = document.getElementById("option-1").value.trim();
    let newOption2 = document.getElementById("option-2").value.trim();
    let newOption3 = document.getElementById("option-3").value.trim();
    let newOption4 = document.getElementById("option-4").value.trim();
    let newCorrectAns = document.getElementById("option-5").value.trim();
    let weightage = document.getElementById("weightage").value.trim();
// let type=document.getElementById("type").value.trim();
    // Validate inputs
    if (!newQuestion || !newOption1 || !newOption2 || !newOption3 || !newOption4 || !newCorrectAns || !weightage) {
        alert("All fields must be filled out.");
        return;
    }

    if (![newOption1, newOption2, newOption3, newOption4].includes(newCorrectAns)) {
        alert("The correct answer must match one of the four options.");
        return;
    }

    let optionsSet = new Set([newOption1, newOption2, newOption3, newOption4]);
    if (optionsSet.size !== 4) {
        alert("Each option must be unique.");
        return;
    }

    // Add new question
    existing_quiz[currentQuizIndex].questions.push({
        que: newQuestion,
        option1: newOption1,
        option2: newOption2,
        option3: newOption3,
        option4: newOption4,
        currectans: newCorrectAns,
        weightage:weightage,
        // type:type,
    });

    // Save to localStorage
    localStorage.setItem("quiz_name", JSON.stringify(existing_quiz));

    // Hide form and clear inputs
    document.getElementById("form").style.display = "none";
    document.getElementById("option-6").value = "";
    document.getElementById("option-1").value = "";
    document.getElementById("option-2").value = "";
    document.getElementById("option-3").value = "";
    document.getElementById("option-4").value = "";
    document.getElementById("option-5").value = "";
    document.getElementById("weightage").value = "";

    // Reload quiz display
    editQuiz();

    alert("Question added successfully!");
}




// filter apply
// function apply() {
//     // let filterValue = document.getElementById("filter").value.trim();

//     // If "All" is selected, refresh the page
//     if (filterValue === "All") {
//         location.reload();
//         return;
//     }

//     let existing_quiz = JSON.parse(localStorage.getItem("quiz_name")) || [];
//     let selectedQuiz = localStorage.getItem("selected_quiz");
//     let quiz = existing_quiz.find(q => q.create_quiz === selectedQuiz);

//     if (!quiz) {
//         console.error("Selected quiz not found!");
//         return;
//     }

//     // Filter questions based on selected type
//     let filteredQuestions = quiz.questions.filter(question => question.type === filterValue);

//     console.log(filteredQuestions, "Filtered Questions");

//     // Display the filtered questions
//     let uniqueQuiz = document.getElementById("questionContainer");
//     uniqueQuiz.innerHTML = "";

//     if (filteredQuestions.length === 0) {
//         uniqueQuiz.innerHTML = "<h3>No questions found for the selected type.</h3>";
//         return;
//     }

//     // uniqueQuiz.innerHTML += `<h2>${quiz.create_quiz}</h2>`;

//     filteredQuestions.forEach((q, i) => {
//         uniqueQuiz.innerHTML += `
//             <div class="background" id="question-${i}">
//                 <h3>Q.${i + 1}: <span>${q.que} (${q.type})</span></h3>
//                 <ul>
//                     <li>${q.option1}</li>
//                     <li>${q.option2}</li>
//                     <li>${q.option3}</li>
//                     <li>${q.option4}</li>
//                 </ul>
//                   <style>
//   ul {
//     list-style: none;
//     counter-reset: roman-counter;
//     padding-left: 0;
//   }
//   li {
//     counter-increment: roman-counter;
//   }
//   li::before {
//     content: counter(roman-counter, lower-roman) " ) ";
//   }
// </style>
//                 <p><strong>Correct Answer:</strong> ${q.currectans}</p>
//                 <p><strong>Weightage:</strong> ${q.weightage}</p>
//             </div>

//         `;
//     });
// }

// Run editQuiz only on the edit page
if (window.location.pathname.includes("edits_page.html")) {
    editQuiz();
}






// display category
function displayCategories() {
    // console.log("jai shree ram");
  let categories = JSON.parse(localStorage.getItem("category")) || [];
//   console.log(categories, "categories");
  let categoryDropdown = document.getElementById("categoryFilter");
  // Clear previous options (except the default one)
//   categoryDropdown.innerHTML = '<option value="">Select Category</option>';
  categories.forEach(c => {
    // console.log(c.category, "c");
      let option = document.createElement("option");
      option.value = c.category;
      option.textContent = c.category;
      categoryDropdown.appendChild(option);
  });
}
displayCategories() 



// hardness level filter apply
// function applyFilter() {
//     let filterValue = document.getElementById("hardnessFilter").value.trim();
//     let existing_quiz = JSON.parse(localStorage.getItem("quiz_name")) || [];
//     // If "All" is selected, show all quizzes
//     if (filterValue === "All") {
//         loadQuizzes();
//         return;
//     }

//     // Filter quizzes based on the selected hardness level
//     let filteredQuizzes = existing_quiz.filter(quiz => quiz.type === filterValue);

//     // Update the table with filtered quizzes
//     let quizlist = document.getElementById("tablebody");
//     quizlist.innerHTML = "";

//     filteredQuizzes.forEach((ele, index) => {
//         let questionCount = ele.questions.length;
//         let totalWeightage = ele.questions.reduce((acc, q) => acc + Number(q.weightage || 0), 0);

//         let row = document.createElement("tr");
//         row.setAttribute("data-index", index);
//         row.innerHTML = `
//             <td>${filteredQuizzes.length - index}</td>
//             <td class="quize-name">${ele.create_quiz}</td>
//             <td class="type">${ele.type}</td>
//             <td class="category">${ele.selecte}</td>
//             <td class="total-que">${questionCount} </td>
//             <td class="weight">${totalWeightage}</td>
//             <td class="timer">${ele.timer}</td>
//             <td class="goto-questions">
//                 <a href="edits_page.html" style="text-decoration:none">
//                     <button class="edit-btn" onclick="saveSelectedQuiz('${ele.create_quiz}')">Edit</button>
//                 </a>
//                 <button class="delete-btn" onclick="deleteQuiz(${existing_quiz.indexOf(ele)})">Delete</button>
//                 <a href="solve_quiz.html">
//                     <button class="start-link" onclick="saveSelectedQuiz('${ele.create_quiz}')">Start</button>
//                 </a>
//             </td>
//         `;
//         quizlist.appendChild(row);
//     });

//     if (filteredQuizzes.length === 0) {
//         quizlist.innerHTML = "<tr><td colspan='8'>No quizzes found for the selected hardness level.</td></tr>";
//     }
// }




// category filter apply
// function applyFilter(){
//     // alert("jai shree ram")
//     let categoriesfilter=document.getElementById("categoryFilter").value.trim();
//     let existing_quiz = JSON.parse(localStorage.getItem("quiz_name")) || [];
//     // existing_quiz.forEach((ele)=>{
//     //     console.log(ele.selecte,"ele.selecte");
//     // })
//     // console.log(existing_quiz.selecte,"existing_quiz.selecte");
//     // console.log(categories,"categories");

//     let filtercategory=existing_quiz.filter(quiz=>quiz.selecte==categoriesfilter);
//     // console.log(filtercategory,"filtercategory");
//     let quizlist = document.getElementById("tablebody");
//     quizlist.innerHTML = "";
//     filtercategory.forEach((ele, index) => {
//         let questionCount = ele.questions.length;
//         let totalWeightage = ele.questions.reduce((acc, q) => acc + Number(q.weightage || 0), 0);

//         let row = document.createElement("tr");
//         row.setAttribute("data-index", index);
//         row.innerHTML = `
//             <td>${filtercategory.length - index}</td>
//             <td class="quize-name">${ele.create_quiz}</td>
//             <td class="type">${ele.type}</td>
//             <td class="category">${ele.selecte}</td>
//             <td class="total-que">${questionCount} </td>

//             <td class="weight">${totalWeightage}</td>
//             <td class="timer">${ele.timer}</td>


//             <td class="goto-questions">
//                 <a href="edits_page.html" style="text-decoration:none">
//                     <button class="edit-btn" onclick="saveSelectedQuiz('${ele.create_quiz}')">Edit</button>
//                 </a>
//                 <button class="delete-btn" onclick="deleteQuiz(${existing_quiz.indexOf(ele)})">Delete</button>
//                 <a href="solve_quiz.html">
//                     <button class="start-link" onclick="saveSelectedQuiz('${ele.create_quiz}')">Start</button>
//                 </a>
//             </td>
//         `;
//         quizlist.appendChild(row);
//     });
//     if (filtercategory.length === 0) {
//         quizlist.innerHTML = "<tr><td colspan='8'>No quizzes found for the selected This categories.</td></tr>";
//     }
// }


// both in one function filter apply
function applyFilter(){
    // alert("jai shree ram")
     let filterValue = document.getElementById("hardnessFilter").value.trim();
    let categoriesfilter=document.getElementById("categoryFilter").value.trim();
    let existing_quiz = JSON.parse(localStorage.getItem("quiz_name")) || [];
   console.log(categoriesfilter,"category filter");
   console.log(filterValue,"filter value");
    // let filtercategory=existing_quiz.filter(quiz=>quiz.selecte==categoriesfilter&&quiz.type==filterValue);
    // Filtering Logic
    let filtercategory = existing_quiz.filter(quiz => {
        let matchCategory = categoriesfilter === "" || quiz.selecte === categoriesfilter;
        let matchHardness = filterValue === "" || quiz.type === filterValue;
        return matchCategory && matchHardness; // Ensure both conditions match if provided
    });
    // console.log(filtercategory,"filtercategory");
    let quizlist = document.getElementById("tablebody");
    quizlist.innerHTML = "";
    filtercategory.forEach((ele,index)=>{
        let questionCount = ele.questions.length;
                let totalWeightage = ele.questions.reduce((acc, q) => acc + Number(q.weightage || 0), 0);
        
                let row = document.createElement("tr");
                row.setAttribute("data-index", index);
                row.innerHTML = `
                    <td>${filtercategory.length - index}</td>
                    <td class="quize-name">${ele.create_quiz}</td>
                    <td class="type">${ele.type}</td>   
                    <td class="category">${ele.selecte}</td>
                    <td class="total-que">${questionCount} </td>
                    <td class="weight">${totalWeightage}</td>
                    <td class="timer">${ele.timer}</td>
                    <td class="goto-questions">
                        <a href="edits_page.html" style="text-decoration:none">
                            <button class="edit-btn" onclick="saveSelectedQuiz('${ele.create_quiz}')">Edit</button>
                        </a>
                        <button class="delete-btn" onclick="deleteQuiz(${existing_quiz.indexOf(ele)})">Delete</button>
                        <a href="solve_quiz.html">
                            <button class="start-link" onclick="saveSelectedQuiz('${ele.create_quiz}')">Start</button>
                        </a>
                    </td>
                `;
                quizlist.appendChild(row);
            }
        )   
   
    
    if (filtercategory.length === 0) {
        quizlist.innerHTML = "<tr><td colspan='8'>No quizzes found for the selected This categories.</td></tr>";
    }
}


// clear my all filter
function clearFilter(){
    // alert("jai shree ram")
    location.reload();
}




// this is also display in edit page
function displayCategoriesIneditpage() {
    console.log("jai shree ram");
  let categories = JSON.parse(localStorage.getItem("category")) || [];
//   console.log(categories, "categories");
  let categoryDropdown = document.getElementById("select");
  // Clear previous options (except the default one)
//   categoryDropdown.innerHTML = '<option value="">Select Category</option>';
  categories.forEach(c => {
    // console.log(c.category, "c");
      let option = document.createElement("option");
      option.value = c.category;
      option.textContent = c.category;
      categoryDropdown.appendChild(option);
  });
}
displayCategoriesIneditpage() 
