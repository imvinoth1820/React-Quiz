import { useState,useEffect } from 'react'
import './App.css'
import questionData from './question.json'
function App(){
 const[currentQuestion,setCurrentQuestion] = useState(0)
 const[score,setScore] = useState(0)
 const[showScore,setShowScore] = useState(false)
 const[timer,setTimer] = useState(10)
  
  useEffect(()=>{
    let interval
   if(timer>0 && !showScore){
    interval = setInterval(()=>{
       setTimer(timer - 1)
    },1000)
   }else{
    clearInterval(interval)
    setShowScore(true)
   }

   return()=> clearInterval(interval)
  },[timer,showScore])
 
  
  const handleAnswerClick=(selectedOption)=>{ 
    if(selectedOption === questionData[currentQuestion].CorrectOption){
         setScore((prevScore)  => prevScore + 1)
    }
    if(currentQuestion < questionData.length - 1){
      setCurrentQuestion((prevQuestion) => 
      prevQuestion + 1)
      setTimer(10)
    }else{
      setShowScore(true)
    }

  }

  const handleRestartQuiz=()=>{
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(0)
    setTimer(10)
  }

  

  return(
    <>
       <div className="quiz-app">
        {showScore ? (<div className="score-section"> 
        <h2>Your Score : {score}/{questionData.length}</h2>
        <button onClick={handleRestartQuiz} className='score-btn'>Restart</button>
        </div>): (
           <div className="Question_Section">
           <h2>Questions {currentQuestion + 1}</h2>
           <p>{questionData[currentQuestion].question}</p>
           <div className="options">
             {
              questionData[currentQuestion].options.map((option,index)=>{
                return <button key={index} onClick={()=> handleAnswerClick(option)}>{option}</button>
              })
             }
              </div>
              <div className="timer">
               Time Left: <span>{timer}</span>

              </div>
       </div>
        ) }
            
      </div>
    </>
  )
}
export default App