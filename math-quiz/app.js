/* =======Variables======= */
const MAX_TIME = 90
let tempTime
const MAX_QUESTION = 10
const MIN_QUESTION = 0
let num1, num2, correctAns
let acceptingAnswers = true
let score
let currQuestionIndex
const questionElement = document.querySelector('#question-text')
const buttonElement = Array.from(document.querySelectorAll('.ques'));
//const buttonElement = document.querySelectorAll('button')
const quesRemainingElement = document.getElementById("questions-remaining")
const currScoreElement = document.getElementById("curr-score")
const timerElement = document.getElementById("timer")
const startButton = document.getElementById("startbutton")
const playAgainButton = document.getElementById("play-again")
let operator = ['+', '-', '*', '/'];
let CountDown
let correctOption
/*=====Start Button=====*/
startButton.addEventListener("click", () => {
    Start();
    document.getElementById("in-game").style.display = 'block';
    document.getElementById("start-game").style.display = 'none';
    document.getElementById("end-game").style.display = 'none';
})
/* ======================= */
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

/* ============Start============ */
const Start = () => {
    currScoreElement.innerHTML = "0"
    currQuestionIndex = 0
    availableQuestion = MAX_QUESTION
    tempTime = MAX_TIME
    CountDown = setInterval(myTimer, 1000) //display every 1sec
    document.getElementById("in-game").style.display = 'block';
    document.getElementById("end-game").style.display = "none"
    for (let i = 0; i < buttonElement.length; i++) {
        buttonElement[i].disabled = false
        buttonElement[i].style.backgroundColor = "show"
    }

    QuestionRemaining()
}
const QuestionRemaining = () => {
    if (availableQuestion === MIN_QUESTION || currQuestionIndex > MAX_QUESTION) {
        EndQuiz()
    } else {
        Question()
    }
}
playAgainButton.addEventListener("click", () => {
    Start()
})
const EndQuiz = () => {
    clearInterval(CountDown)
    document.getElementById("end-game").style.display = "block"
    document.getElementById("in-game").style.display = "none"
    document.getElementById("total-score").innerHTML = "Your Total Score Was: " + parseInt(currScoreElement.innerHTML) + "/" + MAX_QUESTION * 100
    console.log("End of Quiz")
    for (let i = 0; i < buttonElement.length; i++) {
        buttonElement[i].disabled = true
        buttonElement[i].style.backgroundColor = ""
    }
    document.querySelector('h2').style.display = "block"
    currScoreElement.innerHTM = parseInt(currScoreElement.innerHTML)

}
/* ========== Question ========= */
const Question = () => {
    currQuestionIndex++
    quesRemainingElement.innerText = `${availableQuestion}`
    num1 = Math.round(Math.random() * 100)
    num2 = Math.floor(Math.random() * 100)
    selectoperator = operator[Math.floor(Math.random() * 4)]
    if (selectoperator == '/') {
        for (let i = 0; i < 200; i++) {
            if (num1 != num2 && num2 != 0 && num1 > num2 && num1 % num2 == 0) {
                break;
            }
            num1 = Math.floor(Math.random() * 100);
            num2 = Math.floor(Math.random() * 100);
        }
    }
    let text = num1 + selectoperator + num2
    questionElement.innerHTML = "What is " + num1 + selectoperator + num2 + "?";
    if (eval(text) % 1 != 0) {
        correctAns = eval(text).toFixed(2)
        console.log(correctAns)
    } else {
        correctAns = eval(text)
    }
    getOptions()
    availableQuestion--
}

const getOptions = () => {
    correctOption = Math.floor(Math.random() * 3);
    for (let i = 0; i < 3; i++ && i != correctOption) {
        let randomAns = correctAns + Math.floor(Math.random() * correctAns * 1)
        if (randomAns != correctAns) {
            buttonElement[i].innerHTML = randomAns
            console.log('hello arr: ' + buttonElement[i].innerHTML)
            if (buttonElement[i].innerHTML.includes(randomAns)) {
                buttonElement[i].innerHTML = correctAns + 1 + Math.floor(Math.random() * correctAns * 1)
            }
        }
    }
    buttonElement[correctOption].innerHTML = correctAns
    buttonElement[correctOption].addEventListener("click", () => {
        acceptingAnswers = true
    })
}


/* ========== Check (red, green) ========= */
buttonElement.forEach(choice => {
    choice.addEventListener("click", evt => {
        if (acceptingAnswers = false) return
        acceptingAnswers = false
        const selectedButton = evt.target
        if (selectedButton.innerText == correctAns) {
            selectedButton.style.backgroundColor = '#006400' //green
            console.log(`Question ${currQuestionIndex}: CORRECT!`)
            getScore()
        } else {
            selectedButton.style.backgroundColor = '#8B0000' //red
            console.log(`Question ${currQuestionIndex}: WRONG! Correct Answer is: ${correctAns}`)
        }
        selectedButton.parentElement.classList.add(selectedButton.innerText)
        setTimeout(() => {
            selectedButton.style.backgroundColor = ''
            selectedButton.parentElement.classList.remove(selectedButton.innerText)
            QuestionRemaining()
        }, 300)
    })
})
const getScore = () => {
    currScoreElement.innerHTML = parseInt(currScoreElement.innerHTML) + 100
}
/* TIMER!!! */

const myTimer = () => {

    if (tempTime <= 0) {

        timerElement.innerHTML = "Time Up!!!"
        timerElement.style.color = "black"
        EndQuiz()
    } else {
        timerElement.innerHTML = "🕒    " + tempTime + "s"
    }
    tempTime--
}




