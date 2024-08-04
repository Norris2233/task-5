// Array of quiz questions with text, options, and the correct answer
const questions = [
    {
        text: 'What does "HTTP" stand for in web development?',
        options: ['HyperText Transfer Protocol', 'HighText Transfer Protocol', 'HyperText Transmission Protocol', 'HighText Transmission Protocol'],
        answer: 'HyperText Transfer Protocol'
    },
    {
        text: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
        answer: 'Mars'
    },
    {
        text: 'Who is the current President of Nigeria?',
        options: ['Muhammadu Buhari', 'Goodluck Jonathan', 'Olusegun Obasanjo', 'Bola Ahmed Tinubu'],
        answer: 'Bola Ahmed Tinubu' // Updated to reflect the current President as of 2024
    }
];

// Initialize the index for the current question and the user's score
let currentQuestionIndex = 0; // Index of the current question
let score = 0; // User's score

// Function to display the current question and its options
function displayQuestion() {
    // Get HTML elements for question, options, and feedback
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const feedbackElement = document.getElementById('feedback');

    // Clear previous feedback
    feedbackElement.textContent = '';

    // Get the current question object from the questions array
    const question = questions[currentQuestionIndex];
    
    // Update the question text in the HTML
    questionElement.textContent = question.text;

    // Clear previous options
    optionsElement.innerHTML = '';

    // Create buttons for each option and append them to the options list
    question.options.forEach(option => {
        const li = document.createElement('li'); // Create list item for each option
        const button = document.createElement('button'); // Create button for each option
        button.textContent = option; // Set button text to the option
        button.onclick = () => handleAnswer(option); // Set click handler for the button
        li.appendChild(button); // Add button to list item
        optionsElement.appendChild(li); // Add list item to options list
    });
}

// Function to handle the user's answer selection
function handleAnswer(selectedOption) {
    // Get the current question object
    const question = questions[currentQuestionIndex];

    // Get the feedback element
    const feedbackElement = document.getElementById('feedback');

    // Check if the selected answer is correct
    if (selectedOption === question.answer) {
        feedbackElement.textContent = 'Correct!'; // Set feedback message for correct answer
        feedbackElement.style.color = '#28a745'; // Green color for correct answer
        score++; // Increase score if the answer is correct
    } else {
        feedbackElement.textContent = 'Incorrect!'; // Set feedback message for incorrect answer
        feedbackElement.style.color = '#dc3545'; // Red color for incorrect answer
    }

    // Update the score display
    document.getElementById('score').textContent = 'Score: ' + score;

    // Disable all buttons to prevent multiple answers for the same question
    const buttons = document.querySelectorAll('#options button');
    buttons.forEach(button => button.disabled = true);

    // Move to the next question after a short delay to allow feedback to be read
    setTimeout(() => {
        currentQuestionIndex++;

        // Check if there are more questions to display
        if (currentQuestionIndex < questions.length) {
            displayQuestion(); // Display the next question
        } else {
            endQuiz(); // End the quiz when all questions have been answered
        }
    }, 1000); // Delay in milliseconds (1 second)
}

// Function to display the final score and end the quiz
function endQuiz() {
    // Get HTML elements for question, options, feedback, and the "Play Again" button
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const feedbackElement = document.getElementById('feedback');
    const playAgainButton = document.getElementById('play-again');

    // Clear question and options
    questionElement.textContent = '';
    optionsElement.innerHTML = '';
    
    // Determine the remark based on the score
    let remark;
    if (score === questions.length) { // All questions answered correctly
        remark = 'Excellent!';
    } else if (score >= questions.length - 1) {
        remark = 'Great job!';
    } else {
        remark = 'Good try! Better luck next time.';
    }

    // Display final score and remark
    feedbackElement.innerHTML = `Quiz Over! Your total score is ${score}. ${remark}`;
    feedbackElement.style.color = '#d3d3d3'; // Light gray color for final feedback

    // Display the "Play Again" button
    playAgainButton.style.display = 'block';
}

// Function to restart the game
function restartGame() {
    // Reset quiz state
    currentQuestionIndex = 0; // Reset question index
    score = 0; // Reset score

    // Hide the "Play Again" button
    const playAgainButton = document.getElementById('play-again');
    playAgainButton.style.display = 'none';

    // Reset the score display
    document.getElementById('score').textContent = 'Score: 0';

    // Start the quiz again by displaying the first question
    displayQuestion();
}

// Add event listener for "Play Again" button to restart the game
document.getElementById('play-again').addEventListener('click', restartGame);

// Start the quiz by displaying the first question
displayQuestion();
