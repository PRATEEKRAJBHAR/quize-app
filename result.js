// document.addEventListener("DOMContentLoaded", function () {
//     let resultContainer = document.getElementById("result");
//     let resultDetails = document.getElementById("bgcolor");

//     let selectedQuiz = localStorage.getItem("selected_quiz");
//     let existingQuizzes = JSON.parse(localStorage.getItem("quiz_name")) || [];
//     let quiz = existingQuizzes.find(q => q.create_quiz === selectedQuiz);
//     let score = 0; // Reset score and calculate based on correct answers
//     let userAnswers = JSON.parse(localStorage.getItem("user_answers")) || [];

//     if (!quiz) {
//         resultContainer.innerText = "No quiz data available.";
//         return;
//     }

//     quiz.questions.forEach((q, index) => {
//         let correctAnswer = q.currectans.trim();
//         let userSelected = userAnswers[index]?.[0] || "No Answer";

//         let questionDiv = document.createElement("div");
//         questionDiv.innerHTML = `<p><strong>Q${index + 1}:</strong> ${q.que}</p>`;

//         let userChoseAnOption = userSelected !== "No Answer"; // Check if user selected an option

//         ["option1", "option2", "option3", "option4"].forEach(optionKey => {
//             let optionValue = q[optionKey];
//             let isCorrect = optionValue.trim().toLowerCase() === correctAnswer.toLowerCase();
//             let isSelected = optionValue.trim().toLowerCase() === userSelected.toLowerCase();

//             let bgColor = "lightgray"; // Default gray background
//             let icon = ""; // Default no icon

//             if (userChoseAnOption) {
//                 if (isCorrect) {
//                     bgColor = "rgb(146, 205, 146)"; // Green for correct answers
                   
//                     // icon = "✅      correct answer";
//                     icon = `<span style="Margin-left:1050px">✅ correct answer</span>`; 
//                     if (isSelected) score++; // Increase score only if selected correctly
//                 } else if (isSelected) {
//                     bgColor = "#f6bcbc"; // Red for incorrect answers
                   
//                     // icon = "❌      you selected";
//                     icon = `<span style="Margin-left:1050px">❌ you selected</span>`; 
//                 }
//             }

//             questionDiv.innerHTML += `
//                 <p style="background-color: ${bgColor}; padding: 5px; border-radius: 5px;">
//                     ${optionValue} ${icon}
//                 </p>`;
//         });

//         // If no option was chosen, display a gray "No Answer" row
//         if (!userChoseAnOption) {
//             questionDiv.innerHTML += `
//     <p style="background-color: lightgray; padding: 5px; border-radius: 5px;">
//       <span style="Margin-left:1050px">❌ No Answer </span> <br>
//         <strong>Correct Answer: ${correctAnswer}</strong>
//     </p>`;

//         }

//         questionDiv.innerHTML += `<hr>`;
//         resultDetails.appendChild(questionDiv);
//     });

//     // Update the score display
//     resultContainer.innerHTML = `<h2>Your Score: ${score} out of ${quiz.questions.length}</h2>`;
// });







document.addEventListener("DOMContentLoaded", function () {
    let resultContainer = document.getElementById("result");
    let resultDetails = document.getElementById("bgcolor");
    let divisionElement = document.getElementById("division");


    let selectedQuiz = localStorage.getItem("selected_quiz");
    let existingQuizzes = JSON.parse(localStorage.getItem("quiz_name")) || [];
    let quiz = existingQuizzes.find(q => q.create_quiz === selectedQuiz);
    let totalScore = 0; // Total user score
    let maxScore =0 ; // Maximum possible score
    let userAnswers = JSON.parse(localStorage.getItem("user_answers")) || [];


    quiz.questions.forEach((q, index) => {
        let correctAnswer = q.currectans.trim();
        let userSelected = userAnswers[index]?.[0] || "No Answer";
        let weightage = q.weightage || 1; // Default weightage = 1 if not provided
console.log(weightage,"weightage");
        maxScore += Number(weightage); // Add to max score

        let questionBox = document.createElement("div");
        questionBox.classList.add("question-box");

        let questionTitle = document.createElement("p");
        questionTitle.innerHTML = `<strong>Q${index + 1}</strong> ${q.que} ( its weightage are:${weightage})`;
        questionBox.appendChild(questionTitle);

        let userChoseAnOption = userSelected !== "No Answer"; 

        ["option1", "option2", "option3", "option4"].forEach(optionKey => {
            let optionValue = q[optionKey];
            let isCorrect = optionValue.trim().toLowerCase() === correctAnswer.toLowerCase();
            let isSelected = optionValue.trim().toLowerCase() === userSelected.toLowerCase();

            let bgColor = "#ddd"; // Default gray background
            let icon = "";

            if (userChoseAnOption) {
                if (isCorrect) {
                    bgColor = "rgb(146, 205, 146)"; // Green for correct answers
                    icon = `<span class="icon-correct">✅ Correct answer </span>`;

                    if (isSelected) totalScore += Number(weightage); // Increase weighted score
                } else if (isSelected) {
                    bgColor = "#f6bcbc"; // Red for incorrect answers
                    icon = `<span class="icon-wrong">❌ You selected</span>`;
                }
            }

            let optionElement = document.createElement("p");
            optionElement.style.backgroundColor = bgColor;
            optionElement.classList.add("option");
            optionElement.innerHTML = `${optionValue} ${icon}`;
            questionBox.appendChild(optionElement);
        });

        if (!userChoseAnOption) {
            let noAnswerElement = document.createElement("p");
            noAnswerElement.classList.add("option", "no-answer");
            noAnswerElement.innerHTML = `
                <span class="icon-wrong">❌ No Answer</span><br>
                <strong>Correct Answer: ${correctAnswer}</strong>`;
            questionBox.appendChild(noAnswerElement);
        }

        resultDetails.appendChild(questionBox);
    });

    // Update the weighted score display
    resultContainer.innerHTML = `<h2>Your Score: ${totalScore} out of ${maxScore} (Weightage)</h2>`;

    
    // ✅ Fix: Score classification (fall, average, good)
    if (divisionElement) {
        let percentage = ((totalScore / maxScore) * 100).toFixed(2);
        localStorage.setItem("quiz-percentage",percentage)
    document.getElementById("results").innerText = `You Result: ${percentage}% out of 100%`;
        if (percentage < 45) {
            divisionElement.innerText = "You Are Fail ";
        } else if (percentage >= 45 && percentage <= 60) {
            divisionElement.innerText = "You Are Pass 2nd Division ";
        } else {
            divisionElement.innerText = "You Are Pass 1st Division";
        }
    }
});
