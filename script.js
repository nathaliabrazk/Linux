// ===== CONFIGURAÇÃO DO QUIZ =====
// correct: número (uma resposta) ou lista, ex.: [0, 2] (várias respostas). Começa em 0.
const quiz = {
  title: 'Comandos Linux',
  category: 'terminal',
  questions: [
    {
      question: 'Qual comando abre a interface de texto do NetworkManager, onde é possível editar conexões de rede e definir o hostname?',
      answers: ['ifconfig', 'nmtui', 'ip addr', 'hostnamectl'],
      correct: 1,
      explanation: 'O nmtui abre um menu no terminal para editar conexões, ativá-las e definir o hostname. O hostnamectl só trata do hostname, e ip e ifconfig apenas exibem ou alteram interfaces, sem menu.'
    },
    {
      question: 'Qual comando altera o dono de um arquivo para o usuário ana?',
      answers: ['chmod ana arquivo.txt', 'chown ana arquivo.txt', 'usermod ana arquivo.txt', 'chgrp ana arquivo.txt'],
      correct: 1,
      explanation: 'chown muda o dono do arquivo. chmod altera permissões e chgrp altera o grupo.'
    },
    {
      question: 'Qual comando mostra o espaço usado em cada partição, em formato legível?',
      answers: ['du -sh', 'lsblk -f', 'df -h', 'fdisk -l'],
      correct: 2,
      explanation: 'df -h reporta o uso de disco por sistema de arquivos. du mede o tamanho de pastas e arquivos.'
    },
    {
      question: 'Quais dois comandos servem para consultar a documentação de um comando? Escolha 2 respostas.',
      answers: ['man', 'cat /etc/doc', '--help', 'locate manual'],
      correct: [0, 2],
      explanation: 'man abre o manual completo e --help mostra um resumo de uso. Ambos funcionam na maioria dos comandos.'
    },
    {
      question: 'Qual comando busca a palavra "erro" dentro de um arquivo de log, ignorando maiúsculas e minúsculas?',
      answers: ['find erro log.txt', 'cat -i erro log.txt', 'grep -i erro log.txt', 'sed erro log.txt'],
      correct: 2,
      explanation: 'grep procura padrões em texto e a opção -i ignora a diferença entre maiúsculas e minúsculas.'
    }
  ]
};

let currentQuestion = 0;
let selectedAnswers = [];
let score = 0;
let answered = false;

const getCorrect = (item) => Array.isArray(item.correct) ? item.correct : [item.correct];

const startView = document.querySelector('#start-view');
const quizView = document.querySelector('#quiz-view');
const questionCount = document.querySelector('#question-count');
const questionTopic = document.querySelector('#question-topic');
const questionTitle = document.querySelector('#question-title');
const answersContainer = document.querySelector('#answers');
const feedback = document.querySelector('#feedback');
const nextButton = document.querySelector('#next-button');
const backQuestionButton = document.querySelector('#back-question');
const progressFill = document.querySelector('#progress-fill');
const progressBar = document.querySelector('.progress-track');
const quizContent = document.querySelector('#quiz-content');
const result = document.querySelector('#result');
const tuxIcon = '<svg class="result-tux" aria-hidden="true"><use href="#tux"/></svg>';

document.querySelector('#active-quiz-title').textContent = quiz.title;
document.querySelector('#start-meta').textContent = `${quiz.questions.length} perguntas`;

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  startView.hidden = true;
  quizView.hidden = false;
  quizContent.hidden = false;
  result.hidden = true;
  progressBar.setAttribute('aria-valuemax', String(quiz.questions.length));
  renderQuestion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuestion() {
  const item = quiz.questions[currentQuestion];
  const required = getCorrect(item).length;
  selectedAnswers = [];
  answered = false;
  questionCount.innerHTML = `${currentQuestion + 1} <span>/ ${quiz.questions.length}</span>`;
  questionTopic.textContent = required > 1 ? `escolha ${required} respostas` : 'escolha 1 resposta';
  questionTitle.textContent = item.question;
  answersContainer.replaceChildren();
  feedback.hidden = true;
  feedback.classList.remove('is-wrong');
  nextButton.disabled = true;
  nextButton.innerHTML = 'Conferir resposta <span aria-hidden="true">→</span>';
  backQuestionButton.hidden = currentQuestion === 0;
  progressFill.style.width = `${(currentQuestion / quiz.questions.length) * 100}%`;
  progressBar.setAttribute('aria-valuenow', String(currentQuestion));

  item.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer-option';
    button.setAttribute('aria-pressed', 'false');
    button.innerHTML = `<span class="answer-key" aria-hidden="true">${String.fromCharCode(65 + index)}</span><span class="answer-text"></span>`;
    button.querySelector('.answer-text').textContent = answer;
    button.addEventListener('click', () => selectAnswer(index));
    answersContainer.append(button);
  });
}

function selectAnswer(index) {
  if (answered) return;
  const required = getCorrect(quiz.questions[currentQuestion]).length;

  if (required === 1) {
    selectedAnswers = [index];
  } else if (selectedAnswers.includes(index)) {
    selectedAnswers = selectedAnswers.filter((i) => i !== index);
  } else {
    selectedAnswers.push(index);
    if (selectedAnswers.length > required) selectedAnswers.shift();
  }

  [...answersContainer.children].forEach((button, i) =>
    button.setAttribute('aria-pressed', String(selectedAnswers.includes(i)))
  );
  nextButton.disabled = selectedAnswers.length !== required;
}

function checkAnswer() {
  if (selectedAnswers.length === 0 || answered) return;
  answered = true;
  const item = quiz.questions[currentQuestion];
  const correct = getCorrect(item);
  const isCorrect =
    selectedAnswers.length === correct.length &&
    selectedAnswers.every((i) => correct.includes(i));
  if (isCorrect) score += 1;

  [...answersContainer.children].forEach((button, index) => {
    button.disabled = true;
    if (correct.includes(index)) button.classList.add('correct');
    if (selectedAnswers.includes(index) && !correct.includes(index)) button.classList.add('incorrect');
  });

  feedback.textContent = `${isCorrect ? 'Correto. ' : 'Não foi dessa vez. '}${item.explanation}`;
  feedback.classList.toggle('is-wrong', !isCorrect);
  feedback.hidden = false;
  nextButton.innerHTML = currentQuestion === quiz.questions.length - 1
    ? 'Ver resultado <span aria-hidden="true">→</span>'
    : 'Próxima pergunta <span aria-hidden="true">→</span>';
}

function showResult() {
  quizContent.hidden = true;
  result.hidden = false;
  progressFill.style.width = '100%';
  progressBar.setAttribute('aria-valuenow', String(quiz.questions.length));
  let title = 'Continue praticando';
  let message = 'Revise os comandos que errou e tente de novo. Repetir no terminal ajuda muito.';
  if (score === quiz.questions.length) {
    title = 'Acertou tudo!';
    message = 'Nenhum erro. Agora experimente os mesmos comandos no seu laboratório.';
  } else if (score >= Math.ceil(quiz.questions.length * 0.67)) {
    title = 'Bom resultado';
    message = 'Você já domina a maior parte. Revise os erros para fechar a lacuna.';
  }
  result.innerHTML = `${tuxIcon}<h2>${title}</h2><div class="result-score">${score}<span class="result-total"> / ${quiz.questions.length}</span></div><p>${message}</p><div class="result-actions"><button class="restart-button" id="retry-quiz" type="button">Tentar novamente <span aria-hidden="true">↻</span></button></div>`;
  result.querySelector('#retry-quiz').addEventListener('click', startQuiz);
}

function showStart() {
  quizView.hidden = true;
  startView.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelector('#start-button').addEventListener('click', startQuiz);
backQuestionButton.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion -= 1;
    renderQuestion();
  }
});
nextButton.addEventListener('click', () => {
  if (!answered) return checkAnswer();
  if (currentQuestion < quiz.questions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
  } else {
    showResult();
  }
});
document.querySelector('#brand-home').addEventListener('click', (event) => {
  event.preventDefault();
  showStart();
});
