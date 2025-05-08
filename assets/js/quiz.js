// Quiz state management
const quizState = {
    currentQuestion: 0,
    correctAnswers: 0,
    totalQuestions: 5,
    questions: [
      {
        id: 1,
        dlssImage: 'assets/img/quiz/DLSS1.jpg',
        nativeImage: 'assets/img/quiz/Native1.jpg',
      },
      {
        id: 2,
        dlssImage: 'assets/img/quiz/DLSS2.jpg',
        nativeImage: 'assets/img/quiz/Native2.jpg',
      },
      {
        id: 3,
        dlssImage: 'assets/img/quiz/DLSS3.jpg',
        nativeImage: 'assets/img/quiz/Native3.jpg',
      },
      {
        id: 4,
        dlssImage: 'assets/img/quiz/DLSS4.jpg',
        nativeImage: 'assets/img/quiz/Native4.jpg',
      },
      {
        id: 5,
        dlssImage: 'assets/img/quiz/DLSS5.jpg',
        nativeImage: 'assets/img/quiz/Native5.jpg',
      }
    ],
    // Store the current position of DLSS image (A or B) for each question
    currentDlssPosition: ''
  };
  
  // DOM elements
  const quizContainer = document.querySelector('.quiz-container');
  const questionNumber = document.querySelector('.quiz-container h3');
  const imageA = document.querySelector('.quiz-image-item:first-child img');
  const imageB = document.querySelector('.quiz-image-item:last-child img');
  const buttonA = document.getElementById('q1-a');
  const buttonB = document.getElementById('q1-b');
  const resultDiv = document.getElementById('q1-result');
  const resultText = document.querySelector('.result-text');
  const nextButton = document.getElementById('next-question');
  
  // Initialize quiz
  function initQuiz() {
    quizState.currentQuestion = 0;
    quizState.correctAnswers = 0;
    loadQuestion();
    
    // Set up event listeners
    buttonA.addEventListener('click', () => handleAnswer('A'));
    buttonB.addEventListener('click', () => handleAnswer('B'));
    nextButton.addEventListener('click', nextQuestion);
  }
  
  // Randomly determine image positions
  function randomizeImagePositions() {
    // Randomly decide if DLSS image should be in position A or B
    return Math.random() < 0.5 ? 'A' : 'B';
  }
  
  // Load current question with randomized image positions
  function loadQuestion() {
    const question = quizState.questions[quizState.currentQuestion];
    
    // Update question number
    questionNumber.textContent = `Question ${quizState.currentQuestion + 1} of ${quizState.totalQuestions}`;
    
    // Reset result display
    resultDiv.style.display = 'none';
    nextButton.style.display = 'none';
    
    // Enable buttons
    buttonA.disabled = false;
    buttonB.disabled = false;
    
    // Randomize image positions
    quizState.currentDlssPosition = randomizeImagePositions();
    
    // Update button labels to match randomized positions
    buttonA.textContent = "Image A uses DLSS";
    buttonB.textContent = "Image B uses DLSS";
    
    // Load images based on random positions
    if (quizState.currentDlssPosition === 'A') {
      imageA.src = question.dlssImage;
      imageB.src = question.nativeImage;
    } else {
      imageA.src = question.nativeImage;
      imageB.src = question.dlssImage;
    }
  }
  
  // Handle user answer
  function handleAnswer(userAnswer) {
    const question = quizState.questions[quizState.currentQuestion];
    const isCorrect = userAnswer === quizState.currentDlssPosition;
    
    // Disable buttons
    buttonA.disabled = true;
    buttonB.disabled = true;
    
    // Update score if answer is correct
    if (isCorrect) {
      quizState.correctAnswers++;
    }
    
    // Show result
    resultDiv.style.display = 'block';
    if (isCorrect) {
      resultText.innerHTML = '<span style="color: #76b900">✓ Correct!</span>';
    } else {
      resultText.innerHTML = '<span style="color: #ff5555">✗ Incorrect.</span>';
    }
    
    // Show next button if not the last question
    if (quizState.currentQuestion < quizState.totalQuestions - 1) {
      nextButton.style.display = 'inline-block';
    } else {
      nextButton.textContent = 'See Final Score';
      nextButton.style.display = 'inline-block';
    }
  }
  
  // Move to next question
  function nextQuestion() {
    if (quizState.currentQuestion < quizState.totalQuestions - 1) {
      quizState.currentQuestion++;
      loadQuestion();
    } else {
      showFinalResults();
    }
  }
  
  // Show final quiz results
  function showFinalResults() {
    quizContainer.innerHTML = `
      <h2 class="text-center mb-4">Quiz Complete!</h3>
      <div class="nvidia-stat">
        <h3 class="text-center">Your Score: ${quizState.correctAnswers} out of ${quizState.totalQuestions}</h4>
      </div>
      <div class="text-center mt-4">
        <button class="quiz-button" onclick="location.reload()">Try Again</button>
      </div>
    `;
  }
  
  
  // Initialize quiz when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', initQuiz);
  