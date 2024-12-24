 const question = [
 {
   question:"my favotrite veg dish ?",
   answers:[
    {text: "dalroti" , correct:false},
    {text: "puribhaji" , correct:false},
    {text: "purnpoli" , correct:true},
    {text: "materpnir" , correct:false},
   ]
 },

 {
    question:"my favotrite non-veg dish ?",
    answers:[
     {text: "fishkdi" , correct:false},
     {text: "masoli" , correct:false},
     {text: "mtan-roti" , correct:false},
     {text: "biryani" , correct:true},
    ]
  },
  {
    question:"what is my name?",
    answers:[
     {text: "Dige" , correct:false},
     {text: "om" , correct:false},
     {text: "Ganesh" , correct:true},
     {text: "omkar" , correct:false},
    ]
  },
  {
    question:"what you give me ?",
    answers:[
     {text: "friendship" , correct:false},
     {text: "party" , correct:true},
     {text: "love" , correct:true},
     {text: "noting" , correct:false},
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
