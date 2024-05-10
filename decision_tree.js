const questions = [
    {
        question: "Does your company have a clear understanding of the potential biases present in AI algorithms?",
        options: {
            yes: "Yes",
            no: "No"
        },
        weight: 2,
        outcomes: {
            yes: "Consider implementing bias mitigation techniques.",
            no: "Educate your team about AI bias and its implications."
        }
    },
    {
        question: "Is your company aware of the ethical implications associated with AI deployment, such as discrimination, privacy infringement, and job displacement?",
        options: {
            yes: "Yes",
            no: "No"
        },
        weight: 3,
        outcomes: {
            yes: "Proceed to develop ethical guidelines and protocols for AI deployment.",
            no: "Conduct ethical training and workshops to raise awareness and foster responsible AI practices."
        }
    },
    {
        question: "Has your company conducted a thorough analysis of the potential impact of AI deployment on employee well-being and job satisfaction?",
        options: {
            yes: "Yes",
            no: "No"
        },
        weight: 1,
        outcomes: {
            yes: "Implement measures to support employees during the transition and ensure their well-being remains a priority.",
            no: "Conduct employee surveys and consultations to understand concerns and preferences regarding AI integration."
        }
    },
];

let currentQuestionIndex = 0;
let totalWeight = questions.reduce((acc, q) => acc + q.weight, 0);
let userAnswers = [];

function startDecisionTree() {
    currentQuestionIndex = 0;
    userAnswers = [];
    showNextQuestion();
}

function showNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `
            <h3>${question.question}</h3>
            <button onclick="selectOption('yes')">Yes</button>
            <button onclick="selectOption('no')">No</button>
        `;
        document.getElementById('questions').innerHTML = '';
        document.getElementById('questions').appendChild(questionElement);
    } else {
        showFinalResult();
    }
}

function selectOption(option) {
    userAnswers.push(option);
    currentQuestionIndex++;
    showNextQuestion();
}

function showFinalResult() {
    const weightedOutcomes = questions.reduce((acc, q, i) => {
        const weight = q.weight / totalWeight;
        const outcome = q.outcomes[userAnswers[i]];
        acc[outcome] = (acc[outcome] || 0) + weight;
        return acc;
    }, {});

    const sortedOutcomes = Object.entries(weightedOutcomes).sort((a, b) => b[1] - a[1]);
    const finalOutcome = sortedOutcomes[0][0];

    const resultElement = document.getElementById('result');
    resultElement.style.display = 'block';
    resultElement.innerHTML = `
        <h3>Final Recommendation:</h3>
        <p>${finalOutcome}</p>
        <button onclick="startDecisionTree()">Take Quiz Again</button>
    `;
}
