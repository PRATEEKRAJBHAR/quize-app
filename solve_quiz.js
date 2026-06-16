
// Declare global variables at the top
let quiz;
let userAnswers = []; 
function displayQuestions() {

    let selectedQuiz = localStorage.getItem("selected_quiz");
    // console.log(selectedQuiz,"particular quiz");

    let existing_quiz = JSON.parse(localStorage.getItem("quiz_name")) || [];
    quiz = existing_quiz.find(q => q.create_quiz === selectedQuiz);
    // console.log(quiz,"ramramram");

    // Index to keep track of current question
    let currentQuestionIndex = 0;
// Get the timer value for the selected quiz
let timer = quiz.timer;


// console.log(timer, "timer value from localStorage");

    // Timer variables
 
 
    let timeLeft =  timer * 60;  ;  // Timer set to 10 minutes (600 seconds)
    let timerElement = document.getElementById("timer");
    let timerInterval; 
       // Debugging: Check if the timer value is correct
    //    console.log("Timer set to:", timer, "minutes");
    //    console.log("Time left (in seconds):", timeLeft);
   
    // Function to update the timer every second
    function startTimer() {
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);  // Stop the timer when it reaches 0
                alert("Time's up!");
                // auto press submit button
                document.getElementById("submit").click();
            } else {
                let minutes = Math.floor(timeLeft / 60);
                let seconds = timeLeft % 60;
                // Format as MM:SS
                timerElement.innerText = `${formatTime(minutes)}:${formatTime(seconds)}`;
                timeLeft--;
            }
        }, 1000);  // Update every second (1000 milliseconds)
    }

    // Function to format time (adding leading zeroes if needed)
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;


    }

  // Initialize user answers if not already set
    if (userAnswers.length === 0) {
        // console.log(userAnswers,"usenas");
        userAnswers = new Array(quiz.questions.length).fill([]); // Store multiple answers
        // console.log(quiz.questions,"total quetions length");
        // console.log(quiz.questions.length,"quetions");

        // console.log(userAnswers,"ram ram jiiiiiiiiiiii");
        
    }

    // renderQuestion(currentQuestionIndex);
    // Function to update the UI with the current question
  function renderQuestion(index) {
        let q = quiz.questions[index];
    // console.log(q,"q");
        // Correctly display weightage
        document.getElementById("weighatage").innerText = `Weightage: ${q.weightage}`;
    
        // Correctly display Quiz Name
        document.getElementById("quiz_name").innerText = `Quiz: ${selectedQuiz}`;
    
        // Correctly display Category
        document.getElementById("category").innerText = `Category: ${quiz.selecte}`; // Fix here
    
        // Correctly display Quiz Level (Hardness)
        document.getElementById("quiz-level").innerText = `Quiz Level: ${quiz.type}`; // Fix here
    
        // Populate the question text
        document.getElementById("question-text").innerText = `Q${index + 1}. ${q.que}`;
    
    



       // Assign the options values dynamically
       document.querySelector('#option1').value = q.option1;
       document.querySelector('#option2').value = q.option2;
       document.querySelector('#option3').value = q.option3;
       document.querySelector('#option4').value = q.option4;
    //    document.querySelector('#option5').value = q.option5;
// console.log(q.option4,"sfsdfsdfewfcxcsdsd");
// console.log(q.option5,"sfsdfsdfewfcxcsdsd");
        document.getElementById("option1-text").innerText =  `i) ${q.option1}`;
        document.getElementById("option2-text").innerText =`ii) ${q.option2}`;
        document.getElementById("option3-text").innerText =  `iii) ${q.option3}`;
        document.getElementById("option4-text").innerText =`iv) ${q.option4}`;
        // console.log(q,"sfsdfsdfewfcxcsdsd");


    
        // Update the progress bar
        updateProgressBar(index, quiz.questions.length);
        // console.log("Option 1:", q.option1, "Option 2:", q.option2, "Option 3:", q.option3, "Option 4:", q.option4);

        // Display Submit Button Only on Last Question
    let submitbtn = document.getElementById("submit");


// last index me hi submit button show hoga

    if (index === quiz.questions.length - 1) {
        submitbtn.style.display = "block";
    } else {
        submitbtn.style.display = "none";
    }
    
   // Fix: Remove previous event listeners before adding new ones
   document.querySelectorAll('input[name="options"]').forEach((input) => {
    // console.log(input,"input");
    let newInput = input.cloneNode(true);
    // console.log(newInput,"newInput");
    input.replaceWith(newInput); // Removes all old event listeners

    newInput.checked = userAnswers[index]?.includes(newInput.value);
    
    newInput.addEventListener("change", () => {
        userAnswers[index] = [newInput.value]; // Only store one answer
        
        // console.log(`Selected Answer for Question ${index + 1}:`, userAnswers[index]);
    });
});

    }

    // user jo answer select karega aur jo currect ans hoga vo match hoga..
    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();
    
        let score = 0;
    
        quiz.questions.forEach((q, index) => {
            let correctAnswer = q.currectans.trim().toLowerCase(); // Correct answer
            let userSelected = userAnswers[index]?.[0]?.trim().toLowerCase() || ""; // User's selected answer
    
            if (correctAnswer === userSelected) {
                score++;
            }
        });
    
        updateProgressBar(score, quiz.questions.length); // Update progress based on correct answers
        // alert(`Your Score: ${score} out of ${quiz.questions.length}`);
    
        localStorage.setItem("quiz_score", score);
        localStorage.setItem("user_answers", JSON.stringify(userAnswers));
        window.location.href = "submit_quiz_page.html";
    });
    
    // document.getElementById("submit").addEventListener("click", submitquiz);







    
    // function updateProgressBar(currentIndex, totalQuestions) {
    //     console.log(currentIndex,"cuurent index");
    //     console.log(totalQuestions,"totalQuestions");

    //     const progress = (currentIndex + 1) / totalQuestions * 100;
    //     // console.log(progress,"ram ji");
    //     document.getElementById("progress-bar").style.width = `${progress}%`;
    //     document.getElementById("progress-bar").innerText = `${Math.round(progress)}%`;
    // }

    function updateProgressBar(correctAnswers, totalQuestions) {
        let displayedCorrectAnswers = correctAnswers + 1; 
        let progress = (displayedCorrectAnswers / totalQuestions) * 100;
        
        document.getElementById("progress-bar").style.width = `${progress}%`;
        // document.getElementById("progress-bar").innerText = ` ${displayedCorrectAnswers} / ${totalQuestions}`;
        document.getElementById("progress-text").innerText=`Question ${displayedCorrectAnswers} of ${totalQuestions}`
    }
    
    
    // Initial Render
    renderQuestion(currentQuestionIndex);
    startTimer();  // Start the timer when quiz is displayed
    // console.log(currentQuestionIndex,"currentQuestionIndex");
    // Event Listeners for Navigation Buttons
    document.getElementById("previous-btn").addEventListener("click", () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion(currentQuestionIndex);
        }
        updateNavigationButtons()
    });

    document.getElementById("next-btn").addEventListener("click", () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            currentQuestionIndex++;
            renderQuestion(currentQuestionIndex);
        }
        updateNavigationButtons()
    });
 // Function to update button states
function updateNavigationButtons() {
    let previousBtn = document.getElementById("previous-btn");
    let nextBtn = document.getElementById("next-btn");

    // Disable "Previous" button if on the first question
    previousBtn.disabled = currentQuestionIndex === 0;

    // Disable "Next" button if on the last question
    nextBtn.disabled = currentQuestionIndex === quiz.questions.length - 1;

    // If there's only one question, disable both buttons
    if (quiz.questions.length === 1) {
        previousBtn.disabled = true;
        nextBtn.disabled = true;
    }
}

// Call updateNavigationButtons() after the first question is displayed
renderQuestion(currentQuestionIndex);
updateNavigationButtons();
// Event Listener for Submit Button



}


window.onload = displayQuestions;



// result page

function result_score(){
   let container= document.getElementsByClassName("containers")
   container.style.display="none"

}
// result_score()
