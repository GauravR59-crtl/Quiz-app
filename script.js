const quizData = [
  {
    question: "What is the capital of France?",
    a: "Berlin",
    b: "Madrid",
    c: "Paris",
    d: "Rome",
    correct: "c"
  },
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d"
  },
  {
    question: "Who is the Prime Minister of India (2024)?",
    a: "Narendra Modi",
    b: "Rahul Gandhi",
    c: "Amit Shah",
    d: "Yogi Adityanath",
    correct: "a"
  },
  {
    question: "Which keyword is used to inherit a class in Java?",
    a: "this",
    b: "super",
    c: "extends",
    d: "implements",
    correct: "c"
  },
  {
    question: "Which method is the entry point of a Java program?",
    a: "start()",
    b: "main()",
    c: "run()",
    d: "launch()",
    correct: "b"
  },
  {
    question: "Which of the following is not a Java primitive type?",
    a: "int",
    b: "float",
    c: "String",
    d: "boolean",
    correct: "c"
  },
  {
    question: "Which module is used to create a server in Node.js?",
    a: "fs",
    b: "url",
    c: "http",
    d: "net",
    correct: "c"
  },
  {
    question: "Which method is used to read files in Node.js?",
    a: "fs.read()",
    b: "fs.readFile()",
    c: "fs.readFileSync()",
    d: "read.file()",
    correct: "b"
  },
  {
    question: "Next.js is built on top of which library?",
    a: "Vue",
    b: "Angular",
    c: "React",
    d: "Svelte",
    correct: "c"
  },
  {
    question: "Which command creates a Next.js app?",
    a: "npx create-next-app",
    b: "npm init react-app",
    c: "next-create-app",
    d: "npm start next",
    correct: "a"
  },
  {
    question: "What does MERN stand for?",
    a: "MongoDB Express React Node",
    b: "MySQL Express React Node",
    c: "MongoDB Ember React Next",
    d: "Mongo Express Redux Node",
    correct: "a"
  },
  {
    question: "Which database is used in MERN stack?",
    a: "MySQL",
    b: "MongoDB",
    c: "PostgreSQL",
    d: "Firebase",
    correct: "b"
  },
  {
    question: "Which library is used to manage state in React?",
    a: "Redux",
    b: "Bootstrap",
    c: "jQuery",
    d: "Tailwind",
    correct: "a"
  },
  {
    question: "Which lifecycle method is called after the component is mounted in React?",
    a: "componentDidUpdate",
    b: "componentDidMount",
    c: "render",
    d: "useEffect",
    correct: "b"
  },
  {
    question: "Which HTML tag is used to link JavaScript file?",
    a: "<javascript>",
    b: "<script>",
    c: "<link>",
    d: "<js>",
    correct: "b"
  },
  {
    question: "Which CSS property controls text size?",
    a: "font-style",
    b: "text-size",
    c: "font-size",
    d: "text-style",
    correct: "c"
  },
  {
    question: "What does CSS stand for?",
    a: "Computer Style Sheets",
    b: "Creative Style Sheets",
    c: "Cascading Style Sheets",
    d: "Colorful Style Sheets",
    correct: "c"
  },
  {
    question: "Which of the following is used to add comments in JavaScript?",
    a: "<!-- comment -->",
    b: "// comment",
    c: "# comment",
    d: "** comment **",
    correct: "b"
  },
  {
    question: "What does `typeof null` return in JavaScript?",
    a: "null",
    b: "object",
    c: "undefined",
    d: "boolean",
    correct: "b"
  },
  {
    question: "How do you declare a constant in JavaScript?",
    a: "let PI = 3.14;",
    b: "constant PI = 3.14;",
    c: "const PI = 3.14;",
    d: "var PI = 3.14;",
    correct: "c"
  }
];

// Shuffle the questions
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(quizData);

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

const questionNumberEl = document.createElement("div");
const timerEl = document.createElement("div");
quiz.prepend(timerEl);
quiz.prepend(questionNumberEl);

let currentQuiz = 0;
let score = 0;
let timer;
let timeLeft = 15;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;

  questionNumberEl.innerText = `📘 Question ${currentQuiz + 1} of ${quizData.length}`;
  questionNumberEl.style.fontWeight = "bold";
  questionNumberEl.style.marginBottom = "10px";

  startTimer();
}

function deselectAnswers() {
  answerEls.forEach((el) => (el.checked = false));
}

function getSelected() {
  let answer = undefined;
  answerEls.forEach((el) => {
    if (el.checked) {
      answer = el.id;
    }
  });
  return answer;
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timerEl.innerText = `⏱️ Time left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = `⏱️ Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleNext(); // Auto submit
    }
  }, 1000);
}

function handleNext() {
  const answer = getSelected();

  if (answer === quizData[currentQuiz].correct) {
    score++;
  }

  currentQuiz++;

  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    clearInterval(timer);

    let message = "";
    if (score === 20) {
      message = "🎉 Perfect Score! You're a quiz master! Keep it up! 💯";
    } else if (score >= 15) {
      message = "👏 Great job! You're doing very well — just a bit more focus and you'll ace it!";
    } else if (score >= 10) {
      message = "🙂 Good effort! Keep practicing and you’ll get even better!";
    } else {
      message = "⚠️ You need more practice. Concentrate and don’t give up — improvement is certain!";
    }

    quiz.innerHTML = `
      <h2>You answered ${score}/${quizData.length} questions correctly.</h2>
      <p>${message}</p>
      <button onclick="location.reload()">Reload</button>
    `;
  }
}

submitBtn.addEventListener("click", () => {
  clearInterval(timer);
  handleNext();
});