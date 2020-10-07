import React, {useState, useEffect} from 'react';
import {w3cwebsocket as W3CWebSocket} from 'websocket'
import './App.css';


const client = new W3CWebSocket('ws://127.0.0.1:8000')
function App() {
  let [init, setInit] = useState(false)
  let [board, setBoard] = useState([])
  let [player, setPlayer] = useState(false) // player 1 is false
  let [winnerMessage, setWinnerMessage] = useState(null)
  let [player1WinCount, setPlayer1WinCount] = useState(0)
  let [player2WinCount, setPlayer2WinCount] = useState(0)
  let [movesCount, setMovesCount] = useState(0)

  let [turn, setTurn] = useState(0)

  if(init == false){
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        board.push({x: i, y: j, bool: null})
      }
    }
    setInit(true)
  }

  const onButtonClicked = (value) => {
    client.send(JSON.stringify({
      type: 'message',
      turn: turn
    }))
  }

  client.onopen = () => {
    console.log('WebSocket Client Connected')
  }

  client.onmessage = (message) => {
    const dataFromServer = JSON.parse(message.data)
    console.log('got reply!!', dataFromServer)
    setTurn(dataFromServer.turn)
  }

  const onclick = (e, i, x, y) => {
    e.target.style.backgroundColor = 'lightgrey'

    if(board[i].bool === null && setWinnerMessage !== null){
      if(player === false){
        //player 1. add X
        setPlayer(true)
        e.target.textContent += 'X'
        board[i].bool = false
        setMovesCount(movesCount + 1)
        
      } else if(player === true){
        //player 2. add O
        setPlayer(false)
        e.target.textContent += 'O'
        board[i].bool = true
        setMovesCount(movesCount + 1)
      }
      check(e, i, x, y)
    }
  }

  const reset = () => {
    setMovesCount(0)
    setPlayer(false)
    setTimeout(() => {
      setWinnerMessage(null)
    }, 3000)
    setBoard([
      {x: 0, y: 0, bool: null},
      {x: 0, y: 1, bool: null},
      {x: 0, y: 2, bool: null},
      {x: 1, y: 0, bool: null},
      {x: 1, y: 1, bool: null},
      {x: 1, y: 2, bool: null},
      {x: 2, y: 0, bool: null},
      {x: 2, y: 1, bool: null},
      {x: 2, y: 2, bool: null}
    ])
    let box = document.getElementsByClassName('box')
    for(let i = 0; i < box.length; i++){
      box[i].style.backgroundColor = 'black'
      box[i].style.padding = '2rem 0'
      box[i].height = '2rem';
      box[i].textContent = ''
    }
  }

  const check = () => {
    // console.log(e.target,x,y)
    //needs to check l,r,u,d
    //also check in center and corners for diagnols
    // if next is same check same direction if exists or check the opposite way
    //rows check
    if((board[0].bool === true && board[1].bool === true && board[2].bool === true) || (board[0].bool === false && board[1].bool === false && board[2].bool === false)){
      console.log('Someone wins 1')
      board[0].bool === false ? setWinnerMessage('1p') :  setWinnerMessage('2p')
      board[0].bool === false ? setPlayer1WinCount(player1WinCount + 1) : setPlayer2WinCount(player2WinCount + 1)
      reset()
    } else if((board[3].bool === true && board[4].bool === true && board[5].bool === true) || (board[3].bool === false && board[4].bool === false && board[5].bool === false)){
      console.log('Someone wins 2')
      board[3].bool === false ? setWinnerMessage('1p') :  setWinnerMessage('2p')
      board[3].bool === false ? setPlayer1WinCount(player1WinCount + 1) : setPlayer2WinCount(player2WinCount + 1)
      reset()
    } else if((board[6].bool === true && board[7].bool === true && board[8].bool === true) || (board[6].bool === false && board[7].bool === false && board[8].bool === false)){
      console.log('Someone wins 3')
      board[6].bool === false ? setWinnerMessage('1p') :  setWinnerMessage('2p')
      board[6].bool === false ? setPlayer1WinCount(player1WinCount + 1) : setPlayer2WinCount(player2WinCount + 1)
      reset()
    }
    
    // columns check
    if((board[0].bool === true && board[3].bool === true && board[6].bool === true) || (board[0].bool === false && board[3].bool === false && board[6].bool === false)){
      console.log('Someone wins 4')
      board[0].bool === false ? setWinnerMessage('1p') :  setWinnerMessage('2p')
      board[0].bool === false ? setPlayer1WinCount(player1WinCount + 1) : setPlayer2WinCount(player2WinCount + 1)
      reset()
    } else if((board[1].bool === true && board[4].bool === true && board[7].bool === true) || (board[1].bool === false && board[4].bool === false && board[7].bool === false)){
      console.log('Someone wins 5')
      board[1].bool === false ? setWinnerMessage('1p') :  setWinnerMessage('2p')
      board[1].bool === false ? setPlayer1WinCount(player1WinCount + 1) : setPlayer2WinCount(player2WinCount + 1)
      reset()
    } else if((board[2].bool === true && board[5].bool === true && board[8].bool === true) || (board[2].bool === false && board[5].bool === false && board[8].bool === false)){
      console.log('Someone wins 6')
      board[2].bool === false ? setWinnerMessage('1p') :  setWinnerMessage('2p')
      board[2].bool === false ? setPlayer1WinCount(player1WinCount + 1) : setPlayer2WinCount(player2WinCount + 1)
      reset()
    }

    //diagonals 
    if((board[0].bool === true && board[4].bool === true && board[8].bool === true) || (board[0].bool === false && board[4].bool === false && board[8].bool === false)){
      console.log('Someone wins 7')
      board[0].bool === false ? setWinnerMessage('1p') :  setWinnerMessage('2p')
      board[0].bool === false ? setPlayer1WinCount(player1WinCount + 1) : setPlayer2WinCount(player2WinCount + 1)
      reset()
    } else if((board[2].bool === true && board[4].bool === true && board[6].bool === true) || (board[2].bool === false && board[4].bool === false && board[6].bool === false)){
      console.log('Someone wins 8')
      board[2].bool === false ? setWinnerMessage('1p') :  setWinnerMessage('2p')
      board[2].bool === false ? setPlayer1WinCount(player1WinCount + 1) : setPlayer2WinCount(player2WinCount + 1)
      reset()
    }

    if(movesCount === 9){
      //reset the board. Tie was reached.
      console.log('TIE! Reset board now')
      reset()
    } 
  }

  return (
    <div className="App">
      <button onClick={(e) => onButtonClicked(e)}>click mne</button>
      {console.log(winnerMessage)}
      <h1>Tic-tac-Toe</h1>
      <div>
        <h2>1P wins: {player1WinCount}</h2>
        <h2>2P wins: {player2WinCount}</h2>
      </div>
      <div className='board'>
        {board.length > 0 ? board.map((each, index) => <div className='box' onClick={(e) => onclick(e, index, each.x, each.y)}>&nbsp;</div>) : null}
      </div>
      {check()}
      <div>
  {winnerMessage === '1p' ? <div><p>{winnerMessage} wins!</p></div> : 
  winnerMessage === '2p' ? <div><p>{winnerMessage} wins!</p></div> :
  null}
      </div>
    </div>
  );
}

export default App;
