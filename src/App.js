import "./App.css";
import { useState, useEffect } from "react";

const Box = ({ value, onClick }) => {
  return (
    <button className="box" onClick={onClick}>
      {value}
    </button>
  );
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(0));
  const [isX, setIsX] = useState(true);
  const [status, setStatus] = useState("Next player : 1");
  // console.log("ค่าเช็ควิน " + checkWin(board));

  const hadleClick = (i) => {
    if (board[i] !== 0) {
      return;
    }

   //! เช็คไม่ให้คลิก เมื่อ 
    if (checkWin(board) || board[i]) {
      return ;
    }

    board[i] = isX ? 1 : 2;
    setBoard(board);
    setIsX(!isX);

    // console.log(board);

    //! winner
 
    const winner = checkWin(board);
    console.log('checkWin Board  '+checkWin(board))
    // console.log('WINNER IS  '+ winner)
    if (winner) {
      setStatus(`Winner : ${winner} Win`);
      console.log("**********");
    } else {
      //! turn
      setStatus(`Next player : ${isX ? "2" : "1"}`);
    }
    console.log(status);
  };

  //! Reset
  const handleReset = () => {
    setIsX(true);
    setBoard(Array(9).fill(0));
    setStatus("Next player : 1");
  };

  //! UseEffect
  useEffect(() => {
    checkDraw();
    // console.log('useEffect active')
  });

  //! loop for check fill in array
  const checkDraw = () => {
    let filled = true;
    board.forEach((inBoard) => {
      // console.log('inBoard - -'+inBoard)
      if (inBoard === 0) {
        filled = false;
        // console.log(filled)
      }
    });
    // ถ้าคลิกแล้ว board ไม่มี null filled ก็จะเป็น true
    if (filled) {
      setStatus("Draw !!");
    }
  };

  const renderBox = (i) => {
    return <Box value={board[i]} onClick={() => hadleClick(i)} />;
  };

  return (
    <div className="App">
      <div className="containner">
        <h1 className="name">
          Tic <span>Tac</span> Toe
        </h1>
        <div className="status">
          <h1 className="nextPlayer">{status}</h1>
          <button className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
        <div className="boardGame">
          {renderBox(0)}
          {renderBox(1)}
          {renderBox(2)}
          {renderBox(3)}
          {renderBox(4)}
          <Box value={board[5]} onClick={() => hadleClick(5)} />
          <Box value={board[6]} onClick={() => hadleClick(6)} />
          <Box value={board[7]} onClick={() => hadleClick(7)} />
          <Box value={board[8]} onClick={() => hadleClick(8)} />
        </div>
      </div>
    </div>
  );
}

const checkWin = (board) => {
  const winnigPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winnigPattern.length; i++) {
    const [a, b, c] = winnigPattern[i];
    // console.log('a  '+board[a])
    // console.log('b  '+board[b])
    // console.log('c  '+board[c])
    // console.log(`ดูผล board a '${board[a]}' - board b '${board[b]}' - board c '${board[c]}'`);
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      // return board[a]
      // console.log('return board +++ '+ board[a]);
      // if(board[a] === 1){
      //   return 'X'
      // }else{
      //  return 'O'
      // }
      return board[a] === 1 ? 'X' : 'O'
    }
  }
  return null;
};

export default App;
