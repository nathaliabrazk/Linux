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
      question: 'Em qual diretório devem ficar os arquivos de configuração de repositórios do DNF?',
      answers: ['/etc/dnf/repos/', '/var/lib/dnf/', '/etc/yum.repos.d/', '/usr/share/yum/'],
      correct: 2,
      explanation: 'Os repositórios ficam em /etc/yum.repos.d/, em arquivos com extensão .repo. O DNF lê todos eles automaticamente.'
    },
    {
      question: 'Qual extensão o arquivo de repositório precisa ter para ser reconhecido pelo DNF?',
      answers: ['.conf', '.repo', '.list', '.cfg'],
      correct: 1,
      explanation: 'Só arquivos terminados em .repo dentro de /etc/yum.repos.d/ são lidos. O nome antes da extensão pode ser qualquer um, como exam.repo.'
    },
    {
      question: 'Qual das opções contém uma URL local válida para o campo baseurl de um repositório montado em /mnt/BaseOS?',
      answers: ['file:/mnt/BaseOS', 'file://mnt/BaseOS', 'file:///mnt/BaseOS', 'local:///mnt/BaseOS'],
      correct: 2,
      explanation: 'O formato é file:// seguido do caminho absoluto, que começa com /. Por isso ficam três barras: file:///mnt/BaseOS. Esquecer uma barra é um erro comum.'
    },
    {
      question: 'Quais dois campos são necessários, no mínimo, para um repositório funcionar sem verificação de chave GPG? Escolha 2 respostas.',
      answers: ['baseurl=', 'hostname=', 'enabled=1', 'mirrorlist=none'],
      correct: [0, 2],
      explanation: 'O baseurl diz onde estão os pacotes e o enabled=1 ativa o repositório. Para dispensar a verificação de assinatura, adicione também gpgcheck=0.'
    },
    {
      question: 'Depois de criar o arquivo .repo, qual sequência limpa o cache e confirma que os repositórios foram reconhecidos?',
      answers: ['dnf update && dnf list', 'dnf clean all && dnf repolist', 'dnf reload && dnf info', 'dnf makecache --reset && dnf search'],
      correct: 1,
      explanation: 'dnf clean all remove o cache antigo e dnf repolist lista os repositórios ativos. Na prova, BaseOS e AppStream devem aparecer na lista.'
    },
    {
      question: 'Qual comando é o teste mais confiável de que os repositórios BaseOS e AppStream estão funcionando de verdade?',
      answers: ['cat /etc/yum.repos.d/exam.repo', 'dnf repolist --all', 'dnf install -y httpd', 'systemctl status dnf'],
      correct: 2,
      explanation: 'Instalar um pacote de verdade prova que o DNF consegue baixar e resolver dependências. O httpd é um bom teste porque está no AppStream.'
    },
    {
      question: 'O enunciado da prova informa que o repositório está em http://content.example.com/rhel10/BaseOS. O que você deve colocar no baseurl?',
      answers: ['file:///content.example.com/rhel10/BaseOS', 'O endereço HTTP exatamente como foi informado', 'Montar o endereço em /mnt e usar file:///mnt', 'Remover o http:// e usar só o domínio'],
      correct: 1,
      explanation: 'Os caminhos da prova podem ser locais (file:///) ou remotos (http://). Leia o enunciado e use o endereço exatamente como foi dado.'
    },
    {
      question: 'Qual linha do /etc/httpd/conf/httpd.conf você altera para o Apache escutar na porta 82?',
      answers: ['Port 82', 'Listen 82', 'ServerPort 82', 'BindPort 82'],
      correct: 1,
      explanation: 'A diretiva que define a porta de escuta do Apache é Listen. Depois de alterar, o serviço precisa ser reiniciado ou iniciado para aplicar.'
    },
     {
      question: 'Qual comando libera a porta TCP 82 para o tipo http_port_t no SELinux?',
      answers: ['setsebool -P http_port_t 82', 'semanage port -a -t http_port_t -p tcp 82', 'chcon -t http_port_t 82', 'setenforce 82'],
      correct: 1,
      explanation: 'O semanage port -a adiciona uma porta a um tipo do SELinux. A opção -t indica o tipo (http_port_t) e -p indica o protocolo (tcp).'
    },
    {
      question: 'Qual comando mostra as portas que o SELinux já permite para o Apache?',
      answers: ['semanage port -l | grep http_port_t', 'getenforce | grep http', 'ss -tlnp | grep http_port_t', 'firewall-cmd --list-ports'],
      correct: 0,
      explanation: 'semanage port -l lista todas as portas e seus tipos, e o grep filtra só as do http_port_t. Vale conferir antes: a 8080 já vem liberada, mas a 82 não.'
    },
    {
      question: 'Por que, na prova, não se deve usar setenforce 0 para resolver o problema da porta?',
      answers: ['O comando não existe no RHEL 10', 'A Red Hat penaliza desabilitar o SELinux; o correto é ajustar a política', 'Ele só funciona com o Apache parado', 'Ele fecha a porta no firewall'],
      correct: 1,
      explanation: 'setenforce 0 e SELINUX=disabled contornam o problema em vez de resolvê-lo, e a prova considera isso errado. O caminho certo é o semanage para liberar a porta.'
    },
    {
      question: 'O Apache falha ao subir após mudar para a porta 82, com erro de permissão para abrir a porta. Qual a causa mais provável?',
      answers: ['O firewall está bloqueando a porta', 'A porta 82 não está no tipo http_port_t do SELinux', 'O pacote httpd não foi instalado', 'O diretório /var/www/html está vazio'],
      correct: 1,
      explanation: 'Quando o Apache não consegue ocupar a porta, quase sempre é o SELinux. O firewall bloqueia o acesso de fora, mas não impede o serviço de iniciar.'
    },
    {
      question: 'Qual comando restaura o contexto SELinux padrão dos arquivos em /var/www/html, mostrando o que foi alterado?',
      answers: ['restorecon -Rv /var/www/html/', 'chcon -R /var/www/html/', 'semanage fcontext -l /var/www/html/', 'chmod -R 755 /var/www/html/'],
      correct: 0,
      explanation: 'restorecon -Rv reaplica o contexto correto de forma recursiva (-R) e detalhada (-v). Ele não altera o conteúdo dos arquivos, só o rótulo do SELinux.'
    },
    {
      question: 'Qual comando inicia o Apache agora e o habilita para subir automaticamente a cada boot?',
      answers: ['systemctl start httpd', 'systemctl enable httpd', 'systemctl enable --now httpd', 'service httpd persist'],
      correct: 2,
      explanation: 'enable --now faz as duas coisas de uma vez: habilita no boot e inicia imediatamente. Esquecer o enable é uma causa comum de perder pontos, porque o serviço some depois do reinício.'
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
