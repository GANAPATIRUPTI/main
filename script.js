 const question = [
 {
   question:"which is tollest in world ?",
   answers:[
    {text: "shark" , correct:false},
    {text: "blue whale" , correct:true},
    {text: "Elephant" , correct:false},
    {text: "giraffe" , correct:false},
   ]
 },

 {
    question:"what you want in your life?",
    answers:[
     {text: "money-lot-of" , correct:true},
     {text: "selevery" , correct:false},
     {text: "noting" , correct:false},
     {text: "greed" , correct:false},
    ]
  },
  {
    question:"html full form?",
    answers:[
     {text: "shark" , correct:false},
     {text: "blue whale" , correct:false},
     {text: "hypertext markup language" , correct:true},
     {text: "giraffe" , correct:false},
    ]
  },
  {
    question:"css full form ?",
    answers:[
     {text: "shark" , correct:false},
     {text: "cast ceding style sheet" , correct:true},
     {text: "Elephant" , correct:false},
     {text: "giraffe" , correct:false},
    ]
  }
];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-button");
const nextButton=document.getElementById("next-btn");

let currentQuestionindex=0;
let score=0;

function startQuiz(){
    currentQuestionindex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=question[currentQuestionindex];
    let questionNo=currentQuestionindex + 1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;


    currentQuestion.answers.forEach(answer => {
    const button=document.createElement("button");
    button.innerHTML=answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if(answer.correct){
        button.dataset.correct=answer.correct;
    }
    button.addEventListener("click",selectAnswer);
});
}

function resetState(){
 nextButton.style.display= "none";
 while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
 }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    // lll
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    }

function showScore(){
    resetState();
    questionElement.innerHTML="your score "+score+"out of"+question.length;
    nextButton.innerHTML="play again";
    nextButton.style.display="block";
}

function handleNextButton(){
     currentQuestionindex++;
     if(currentQuestionindex < question.length){
        showQuestion();
     }else{
        showScore();
     }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionindex < question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
