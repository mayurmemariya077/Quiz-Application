


const quizData = [
  {
    id: 1,
    qns: "What will be the output of console.log(2 + '2' - 1)?",
    options: ["21", "221", "21 (number)", "Error"],
  correctAnswer: 2,
  },
  {
    id: 2,
    qns: "What will be the output of console.log(typeof NaN)?",
    options: ["NaN", "undefined", "number", "object"],
  correctAnswer: 2,
  },
  {
    id: 3,
    qns: "What will be the output of console.log(0.1 + 0.2 === 0.3)?",
    options: ["true", "false", "undefined", "Error"],
  correctAnswer: 1,
  },
  {
    id: 4,
    qns: "Which method creates a new array containing only elements that pass a condition?",
    options: ["map()", "reduce()", "filter()", "forEach()"],
  correctAnswer: 2,
  },
  {
    id: 5,
    qns: "What will be the output of console.log(Boolean('false'))?",
    options: ["false", "true", "undefined", "Error"],
  correctAnswer: 1,
  },
  {
    id: 6,
    qns: "What will be the output of console.log(typeof null)?",
    options: ["null", "undefined", "object", "boolean"],
  correctAnswer: 2,
  },
  {
    id: 7,
    qns: "What will be the output of console.log([1, 2, 3].map(num => num * 2))?",
    options: [
    "[1, 2, 3]",
    "[2, 4, 6]",
    "[1, 4, 9]",
    "undefined",
  ],
  correctAnswer: 1,
  },
  {
    id: 8,
    qns: "What will be the output of console.log('5' == 5)?",
    options: ["true", "false", "undefined", "Error"],
  correctAnswer: 0,
  },
  {
    id: 9,
    qns: "What will be the output of console.log('5' === 5)?",
    options: ["true", "false", "5", "Error"],
  correctAnswer: 1,
  },
  {
    id: 10,
    qns: "What will be the output of console.log(1 + 2 + '3')?",
    options: ["123", "33", "6", "Error"],
  correctAnswer: 1,
  },
];

const qns = document.getElementById("qns");

const qnsNumber = document.getElementById("qnsNumber");

const options = document.getElementById("options");

const nextQnsBtn = document.getElementById("next-btn");

let currentIndex = 0;

let score = 0;

let selectedAnswer = null;

let userAnswers = [];

let timer;

let timeLeft = 30;

function loadQns() {
  let currentQns = quizData[currentIndex];

  qnsNumber.innerText = `Qns ${currentIndex + 1}/${quizData.length}`;

  qns.innerText = currentQns.qns;

  options.innerHTML = "";

  currentQns.options.forEach((option, index) => {
    const col = document.createElement("div");

    col.classList.add("col-md-6");

    const button = document.createElement("button");

    button.innerText = option;

    button.classList.add("btn", "btn-outline-primary", "option-btn");

    button.onclick = function () {
      selectedAnswer = index;

      userAnswers.push({
        qns: currentQns.qns,
        answer: index,
        options: currentQns.options,
        correctAnswer: currentQns.correctAnswer,
      });

      console.log("user Answer", userAnswers);
      nextQns();
    };

    options.appendChild(col);

    col.appendChild(button);
  });
startTimer()
  
}

loadQns();


function startTimer() {
  let timerElement = document.getElementById("timer");

  timerElement.innerText = `Time Left For Next Qns ${timeLeft}`;

  clearInterval(timer);

  timeLeft = 30;

  timer = setInterval(() => {
    (timeLeft--, (timerElement.innerText = `Time Left For Next Qns ${timeLeft}`));

    if (timeLeft === 0) {
      userAnswers.push({
        qns: quizData[currentIndex].qns,
        answer: null,
        options: quizData[currentIndex].options,
        correctAnswer: quizData[currentIndex].correctAnswer,
      });
      nextQns()

      loadQns();
    }
  }, 1000);
}

function nextQns() {
  if (selectedAnswer === quizData[currentIndex].correctAnswer) {
    score++;
  }

  if (currentIndex < quizData.length - 1) {
    selectedAnswer = null;
    currentIndex++;

    userAnswers.push({
      qns: quizData[currentIndex].qns,
      answer: null,
      options: quizData[currentIndex].options,
      correctAnswer: quizData[currentIndex].correctAnswer,
    });

    loadQns();
  } else {
    quizResult();
  }
}

function quizResult() {
  const quizResult = document.querySelector(".quiz-card");

  quizResult.innerHTML = `
  
  
  <h3 class="text-center" > Your Result </h3>

  <h3 class="text-center">  ${score}/${quizData.length} </h3>

  <div class="mt-3" >

  <h3 class="text-center"> Review Your Answers </h3>

  <ul class="list-group">
  ${userAnswers.map((ans, index) => {
    return `
    
    <li class="list-group-item">
    
    <h5 class="text-center">Question No:- ${index + 1} ${ans.qns}</h5>

    <h6 class="text-center">Your Answer:- ${ans.answer !== null ? ans.options[ans.answer] : "Not Selected"}</h6>

    <h6 class="text-center">Correct Answer:- ${ans.options[ans.correctAnswer]} </h6>
    
    </li>

    `;
  })}


  </ul>

  </div>

  `;
}
