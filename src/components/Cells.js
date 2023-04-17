import React from 'react'
import {
  CELL_SIZE,
  EMPTY_CELL_COLOR,
  WALL_COLOR,
} from '../constants/constants';

function EmptyCell() {
  return (
      <div
          style={{
              height: CELL_SIZE,
              width: CELL_SIZE,
              backgroundColor: EMPTY_CELL_COLOR,
          }}
      ></div>
  );
}
function WallCell() {
  return (
      <div
          style={{
            border:'1px solid black',
              height: CELL_SIZE,
              width: CELL_SIZE,
              backgroundColor: WALL_COLOR,
          }}
      ></div>
  );
}
function GoalCell() {
  return (
      <div
          style={{
              height: CELL_SIZE,
              width: CELL_SIZE,
              backgroundColor: EMPTY_CELL_COLOR,
          }}
      >
          <img alt='goal' width={CELL_SIZE} src='images/goal.jpg' />
      </div>
  );
}
function CurrentPosition() {
  return (
      <div  style={{
          height: CELL_SIZE,
          width: CELL_SIZE,
          backgroundColor: EMPTY_CELL_COLOR,
      }}>
          <img alt='my-position' src='images/position.png' width={CELL_SIZE} />
      </div>
  );
}
function CoinCell(){
  return ( <div  style={{
      height: CELL_SIZE,
      width: CELL_SIZE,
      backgroundColor: EMPTY_CELL_COLOR,
  }}>
      <img alt='coin' src='images/coin.gif' width={CELL_SIZE} />
  </div>)
}
function HintCell(){
    return ( <div  style={{
        height: CELL_SIZE,
        width: CELL_SIZE,
        backgroundColor: EMPTY_CELL_COLOR,
    }}>
        <img alt='coin' src='images/hint.png' width={CELL_SIZE} />
    </div>)
  }
  
  
export {
  CoinCell,CurrentPosition,EmptyCell,GoalCell,WallCell,HintCell
}