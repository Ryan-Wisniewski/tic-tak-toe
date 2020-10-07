import React, {useState} from 'react';
import {w3cwebsocket as W3CWebSocket} from 'websocket'
import Confetti from 'react-confetti'
import getWindowDemension from './getWindowDimensions'
import './App.css';

const client = new W3CWebSocket('ws://tic-tac-toe-be-fg32na12.herokuapp.com/')
function App() {
  let {width, height} = getWindowDemension()
  let [board, setBoard] = useState([])
  let [winnerMessage, setWinnerMessage] = useState(null)
  let [player1WinCount, setPlayer1WinCount] = useState(0)
  let [player2WinCount, setPlayer2WinCount] = useState(0)
  let [movesCount, setMovesCount] = useState(0)

  let [turn, setTurn] = useState(0)

  client.onopen = () => {
    console.log('WebSocket Client Connected')
  }

  client.onmessage = (message) => {
    const dataFromServer = JSON.parse(message.data)
    console.log('got reply!!', dataFromServer)
    console.log(dataFromServer.board , board)
    if (dataFromServer.board !== board){
      setBoard(dataFromServer.board)
    }
    setTurn(dataFromServer.turn)
  }

  const onclick = (e, i, x, y) => {
    if(board[i].bool === null && setWinnerMessage !== null){
      if(turn === 0){
        //player 1. add X
        board[i].bool = false
        setMovesCount(movesCount + 1)
      } else if(turn === 1){
        //player 2. add O
        board[i].bool = true
        setMovesCount(movesCount + 1)
      }
      // console.log("CURRENT BOARD", board, turn)
      client.send(JSON.stringify({
        type: 'message',
        board: board,
        turn: turn
      }))
    }
  }

  const reset = () => {
    setMovesCount(0)
    setTimeout(() => {
      setWinnerMessage(null)
      window.location.reload()
    }, 5000)
    let resetBoard = [
      {x: 0, y: 0, bool: null},
      {x: 0, y: 1, bool: null},
      {x: 0, y: 2, bool: null},
      {x: 1, y: 0, bool: null},
      {x: 1, y: 1, bool: null},
      {x: 1, y: 2, bool: null},
      {x: 2, y: 0, bool: null},
      {x: 2, y: 1, bool: null},
      {x: 2, y: 2, bool: null}
    ]
    setBoard(resetBoard)
    // let box = document.getElementsByClassName('box')
    // for(let i = 0; i < box.length; i++){
    //   let newBox = document.getElementById(i)
    //   newBox.style.backgroundColor = 'black'
    //   newBox.style.padding = '2rem 0'
    //   newBox.height = '2rem';
    //   newBox.textContent = ' '
    //   console.log(newBox)
    // }
    client.send(JSON.stringify({
      type: 'message',
      board: resetBoard,
      turn: turn
    }))
  }

  const checkNewMove = () => {
    // console.log(e.target,x,y)
    //needs to check l,r,u,d
    //also check in center and corners for diagnols
    // if next is same check same direction if exists or check the opposite way
    //rows check
    if(board.length > 0){
    
      if((board[0].bool === true && board[1].bool === true && board[2].bool === true) || (board[0].bool === false && board[1].bool === false && board[2].bool === false)){
        // console.log('Someone wins 1')
        board[0].bool === false ? setWinnerMessage('1P') :  setWinnerMessage('2P')
        board[0].bool === false ? setPlayer1WinCount(player1WinCount + 1) : setPlayer2WinCount(player2WinCount + 1)
        reset()
      } else if((board[3].bool === true && board[4].bool === true && board[5].bool === true) || (board[3].bool === false && board[4].bool === false && board[5].bool === false)){
        // console.log('Someone wins 2')
        board[3].bool === false ? setWinnerMessage('1P') :  setWinnerMessage('2P')
        board[3].bool === false ? setPlayer1WinCount(player1WinCount + 1) : setPlayer2WinCount(player2WinCount + 1)
        reset()
      } else if((board[6].bool === true && board[7].bool === true && board[8].bool === true) || (board[6].bool === false && board[7].bool === false && board[8].bool === false)){
        // console.log('Someone wins 3')
        board[6].bool === false ? setWinnerMessage('1P') :  setWinnerMessage('2P')
        board[6].bool === false ? setPlayer1WinCount(player1WinCount + 1) : setPlayer2WinCount(player2WinCount + 1)
        reset()
      }
      
      // columns check
      if((board[0].bool === true && board[3].bool === true && board[6].bool === true) || (board[0].bool === false && board[3].bool === false && board[6].bool === false)){
        // console.log('Someone wins 4')
        board[0].bool === false ? setWinnerMessage('1P') :  setWinnerMessage('2P')
        board[0].bool === false ? setPlayer1WinCount(player1WinCount + 1) : setPlayer2WinCount(player2WinCount + 1)
        reset()
      } else if((board[1].bool === true && board[4].bool === true && board[7].bool === true) || (board[1].bool === false && board[4].bool === false && board[7].bool === false)){
        // console.log('Someone wins 5')
        board[1].bool === false ? setWinnerMessage('1P') :  setWinnerMessage('2P')
        board[1].bool === false ? setPlayer1WinCount(player1WinCount + 1) : setPlayer2WinCount(player2WinCount + 1)
        reset()
      } else if((board[2].bool === true && board[5].bool === true && board[8].bool === true) || (board[2].bool === false && board[5].bool === false && board[8].bool === false)){
        // console.log('Someone wins 6')
        board[2].bool === false ? setWinnerMessage('1P') :  setWinnerMessage('2P')
        board[2].bool === false ? setPlayer1WinCount(player1WinCount + 1) : setPlayer2WinCount(player2WinCount + 1)
        reset()
      }

      //diagonals 
      if((board[0].bool === true && board[4].bool === true && board[8].bool === true) || (board[0].bool === false && board[4].bool === false && board[8].bool === false)){
        // console.log('Someone wins 7')
        board[0].bool === false ? setWinnerMessage('1P') :  setWinnerMessage('2P')
        board[0].bool === false ? setPlayer1WinCount(player1WinCount + 1) : setPlayer2WinCount(player2WinCount + 1)
        reset()
      } else if((board[2].bool === true && board[4].bool === true && board[6].bool === true) || (board[2].bool === false && board[4].bool === false && board[6].bool === false)){
        // console.log('Someone wins 8')
        board[2].bool === false ? setWinnerMessage('1P') :  setWinnerMessage('2P')
        board[2].bool === false ? setPlayer1WinCount(player1WinCount + 1) : setPlayer2WinCount(player2WinCount + 1)
        reset()
      }

      if(movesCount === 9){
        //reset the board. Tie was reached.
        console.log('TIE! Reset board now')
        reset()
      }
      
      for(let i = 0; i < board.length; i++){
        let newDiv = document.getElementById(i)
        // console.log(board[i])
        if(board[i].bool === false){
          //xMoved here
          if(newDiv){
            newDiv.style.backgroundColor = 'lightgrey'
            if(newDiv.textContent.length === 1){
              newDiv.textContent += "X"
            }
          }
          // newDiv.style.backgroundColor = 'lightgrey'
        } else if(board[i].bool === true){
          //O moved
          if(newDiv){
            newDiv.style.backgroundColor = 'lightgrey'
            if(newDiv.textContent.length === 1){
              newDiv.textContent += "O"
            }
          }
        }
      }
    }
  }

  return (
    <div className="App">
      {/* {console.log('render', board, turn, movesCount)} */}
      {/* {console.log(winnerMessage)} */}
      <h1 className='title'>Tic-tac-Toe</h1>
      <div>
        {/* <h2>1P wins: {player1WinCount / 2}</h2>
        <h2>2P wins: {player2WinCount / 2}</h2> */}
      </div>
      <div className='board'>
        {board.length > 0 ? board.map((each, index) => <div key={index} id={index} className='box' onClick={(e) => onclick(e, index, each.x, each.y)}>&nbsp;</div>) : null}
      </div>
      {checkNewMove()}
      <div>
        {winnerMessage === '1P' ? <div className='textDiv'><p className='text'>{winnerMessage} WINS!</p></div> : 
          winnerMessage === '2P' ? <div className='textDiv'><p className='text'>{winnerMessage} WINS!</p></div> :
          null}
        {winnerMessage ? 
        <div className='confetti'>
        <Confetti
          width={width}
          height={height}
          gravity={.2}
          wind={.01}
        /></div> : null }
        
      </div>
    </div>
  );
}

export default App;
