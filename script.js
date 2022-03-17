let questions = [
    {
        "question" : "Was ist der zweithöchste Berg Deutschlands?",
        "answer_1" : "Zugspitze",
        "answer_2" : "Watzmann",
        "answer_3" : "Brocken",
        "answer_4" : "Hochwanner",
        "right_answer" : 4
    },
    {
        "question" : "Wie viel Prozent der Erde sind circa von Wasser bedeckt?",
        "answer_1" : "50 Prozent",
        "answer_2" : "60 Prozent",
        "answer_3" : "70 Prozent",
        "answer_4" : "80 Prozent",
        "right_answer" : 3  
    },
    {
        "question" : "Welches Bundesland ist flächenmäßig das größte?",
        "answer_1" : "Bayern",
        "answer_2" : "Baden-Würtemberg",
        "answer_3" : "Nordrhein-Westfalen",
        "answer_4" : "Niedersachsen",
        "right_answer" : 1  
    },
    {
        "question" : "Welche Stadt hat nach Berlin die meisten Einwohner in Deutschland?",
        "answer_1" : "Köln",
        "answer_2" : "München",
        "answer_3" : "Hamburg",
        "answer_4" : "Frankfurt am Main",
        "right_answer" : 2  
    },
    {
        "question" : "Welcher ist der längste innerdeutsche Fluss?",
        "answer_1" : "Rhein",
        "answer_2" : "Weser",
        "answer_3" : "Elbe",
        "answer_4" : "Donau",
        "right_answer" : 1  
    },
    {
        "question" : "Wie viele Einwohner hat Russland ungefähr?",
        "answer_1" : "125 Millionen",
        "answer_2" : "135 Millionen",
        "answer_3" : "145 Millionen",
        "answer_4" : "155 Millionen",
        "right_answer" : 3  
    },
    {
        "question" : "Wie lang ist die Chinesische Mauer (gerundet)?",
        "answer_1" : "12.000 Kilometer",
        "answer_2" : "15.000 Kilometer",
        "answer_3" : "18.000 Kilometer",
        "answer_4" : "21.000 Kilometer",
        "right_answer" : 4  
    },
];


let rightQuestions = 0; // Zum speichern der richtigen antworten.
let currentQuestion = 0; // Zum anzeigen bei welcher Frage wir sind.
let AUDIO_SUCCESS = new Audio('./audio/success.mp3');
let AUDIO_FAIL = new Audio('./audio/wrong.mp3');


function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}

function startGame() { 
    document.getElementById('start-screen').style = 'display: none';
    document.getElementById('quiz-card').style = '';
}


function showQuestion() {
    if(gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}


function gameIsOver() {
    return currentQuestion >= questions.length // Durch return wird die Validierung zurückgegeben. Falls Bedingung zutrifft ==> "true". Falls nicht ==> "false".
}


function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none';
    document.getElementById('amount-of-questions').innerHTML = questions.length; // Zeigt die Gesamtanzahl der Fragen an.
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions; // Zeigt die Anzahl der richtigen Fragen an.
    document.getElementById('header-image').src = './img/trophy.png' // Der QuizBanner wird zu einem Pokal geändert.
}


function updateProgressBar() {

    let percent = (currentQuestion + 1) / questions.length; // Fortschritt für Progressbar in Prozent ausrechnen.

    percent = Math.round(percent * 100); 
    document.getElementById('progress-bar').innerHTML = `${percent} %`; // Zeigt den Fortschritt in Prozent an.
    document.getElementById('progress-bar').style = `width: ${percent}%;`; // Verändert den Ladebalken indem "width" geändert wird.
}


function updateToNextQuestion() {

    let question = questions[currentQuestion];

    document.getElementById('question-number').innerHTML = currentQuestion + 1; // Zmm Anzeigen bei welcher Frage wir sind.
    document.getElementById('questiontext').innerHTML = question['question']; // Um die Frage anzuzeigen
    document.getElementById('answer_1').innerHTML = question['answer_1']; // Um die Antwort 1 anzuzeigen
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


function answer(selection) { // "Selection" erwartet: "answer_1", "answer_2", "answer_3" oder "answer_4"

    let question = questions[currentQuestion]; // "question = "questions" [an Stelle 0]
    let selectedQuestionNumber = selection.slice(-1); // Wir holen uns den letzten Buchstaben von: "answer_1", "answer_2", "answer_3" oder "answer_4"
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if(rightAnswerSelected(selectedQuestionNumber, question)) { // Ist der letze Buchstabe der gewählten Antwort == der richtigen Antwort?
        console.log('Richtige Antwort!!')
        document.getElementById(selection).parentNode.classList.add('bg-success'); // Dann adden wir zum parentElement eine Bootstrap klasse --> Grün
        AUDIO_SUCCESS.play();
        rightQuestions++; // Richtige antworten um 1 erhöhen
    } else {
        console.log('Falsche Antwort!!')
        document.getElementById(selection).parentNode.classList.add('bg-danger'); // Ansonsten adden wir zum parentElement eine Bootstrap klasse --> Rot
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success'); // Die Richtige Antwort wird auch angezeigt und bekommt die Farbe grün.
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false // Unser Button wird dadurch enabled
}


function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer']
}


function nextQuestion() {
    currentQuestion++; // Wir erhöhen von "0" auf "1" und steuern das nächste JSON Objekt an.
    document.getElementById('next-button').disabled = true; // Unser Button wird dadurch disabled
    resetAnswerButtons();
    showQuestion();
}


function resetAnswerButtons() { // Hier werden die Farben von den Antworten entfernt
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');

    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');

    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');

    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}


function restartGame() {
    document.getElementById('questionBody').style = ''; // QuestionBody wieder anzeigen.
    document.getElementById('endScreen').style = 'display: none'; // Endscreen ausblenden.

    rightQuestions = 0; // Zum speichern der richtigen antworten.
    currentQuestion = 0; // Zum anzeigen bei welcher Frage wir sind.

    init();
}