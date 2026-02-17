// Navigation Logic
function navigateTo(sectionId) {
    // Update Nav active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    const activeNav = document.getElementById(`nav-${sectionId}`);
    if (activeNav) activeNav.classList.add('active');

    // Update Section active state
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Add event listeners for navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = item.id.replace('nav-', '');
        navigateTo(sectionId);
    });
});

// Quiz Logic
const quizData = [
    {
        question: "What is the primary goal of Artificial Intelligence?",
        options: ["To mimic human behavior", "To solve complex calculations", "To create machines that can think and learn", "To automate manual labor"],
        correct: 2
    },
    {
        question: "Which of the following is an example of Supervised Learning?",
        options: ["K-Means Clustering", "Linear Regression", "Market Basket Analysis", "GANs"],
        correct: 1
    },
    {
        question: "What does 'ML' stand for in the context of computer science?",
        options: ["Machine Level", "Maximum Load", "Machine Learning", "Manual Logic"],
        correct: 2
    },
    {
        question: "Which neural network architecture is best for Image Recognition?",
        options: ["RNN", "LSTM", "CNN", "Transformer"],
        correct: 2
    },
    {
        question: "In AI, what is a 'Perceptron'?",
        options: ["A type of sensor", "A single-layer neural network", "A programming language", "A data storage unit"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timerSeconds = 600; // 10 minutes
let timerInterval;

const startQuizBtn = document.getElementById('start-quiz-btn');
const quizIntro = document.getElementById('quiz-intro');
const quizActive = document.getElementById('quiz-active');
const quizResult = document.getElementById('quiz-result');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-q-btn');
const timerDisplay = document.getElementById('quiz-timer');
const currentQNum = document.getElementById('current-q-num');
const progressBar = document.querySelector('.progress-bar-fill');
const finalScore = document.getElementById('final-score');

startQuizBtn.addEventListener('click', startQuiz);

function startQuiz() {
    quizIntro.classList.add('hidden');
    quizActive.classList.remove('hidden');
    loadQuestion();
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timerSeconds--;
        const mins = Math.floor(timerSeconds / 60);
        const secs = timerSeconds % 60;
        timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

        if (timerSeconds <= 0) {
            endQuiz();
        }
    }, 1000);
}

function loadQuestion() {
    const q = quizData[currentQuestionIndex];
    questionText.textContent = q.question;
    currentQNum.textContent = currentQuestionIndex + 1;
    progressBar.style.width = `${((currentQuestionIndex + 1) / quizData.length) * 100}%`;

    optionsContainer.innerHTML = '';
    q.options.forEach((opt, idx) => {
        const div = document.createElement('div');
        div.className = 'option-card';
        div.innerHTML = `<div class="option-mark"></div><span>${opt}</span>`;
        div.onclick = () => selectOption(div, idx);
        optionsContainer.appendChild(div);
    });

    nextBtn.disabled = true;
    nextBtn.style.opacity = '0.5';
}

let selectedIdx = null;
function selectOption(el, idx) {
    document.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
    el.classList.add('selected');
    selectedIdx = idx;
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1';
}

nextBtn.addEventListener('click', () => {
    if (selectedIdx === quizData[currentQuestionIndex].correct) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
});

function endQuiz() {
    clearInterval(timerInterval);
    quizActive.classList.add('hidden');
    quizResult.classList.remove('hidden');
    finalScore.textContent = score;
}

// Chatbot Logic
const chatInput = document.getElementById('chat-input');
const sendChatBtn = document.getElementById('send-chat-btn');
const chatMessages = document.getElementById('chat-messages');

const aiResponses = {
    "hello": "Hello! How can I help you with your AI studies today?",
    "neural network": "A neural network is a series of algorithms that endeavors to recognize underlying relationships in a set of data through a process that mimics the way the human brain operates.",
    "assignment": "I can help with concepts for your AI assignments! What specific topic are you working on?",
    "machine learning": "Machine learning is a subset of AI that focuses on building systems that learn—or improve performance—based on the data they consume.",
    "basics": "The basics of AI include understanding searching, logic, probability, and how models learn from data.",
    "default": "That's an interesting question! Based on the subject material, it sounds like you're exploring deep AI concepts. Would you like to see some notes on this?"
};

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;

    div.innerHTML = `
        <div class="msg-content">${text}</div>
        <span class="msg-time">${timeStr}</span>
    `;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleChat() {
    const text = chatInput.value.trim().toLowerCase();
    if (!text) return;

    addMessage(chatInput.value, 'user');
    chatInput.value = '';

    // Simulate thinking
    setTimeout(() => {
        let response = aiResponses.default;
        for (const key in aiResponses) {
            if (text.includes(key)) {
                response = aiResponses[key];
                break;
            }
        }
        addMessage(response, 'bot');
    }, 800);
}

sendChatBtn.addEventListener('click', handleChat);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChat();
});

// Set current date
document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// Add image to hero section (Placeholder or generated)
document.addEventListener('DOMContentLoaded', () => {
    const heroImgContainer = document.getElementById('hero-ai-img-container');
    if (heroImgContainer) {
        // Since image generation failed, we'll use a stylized CSS element or a high-quality online placeholder
        const img = document.createElement('img');
        img.src = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800';
        img.alt = 'AI Concept';
        img.onerror = () => {
            heroImgContainer.innerHTML = '<div class="ai-glow-sphere"></div>';
        };
        heroImgContainer.appendChild(img);
    }
});
