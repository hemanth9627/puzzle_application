import React, { useEffect, useState } from 'react';
import { MazeBoard } from '../components/MazeBoard';
import { BOARD as BoardData } from '../data/boardStructure';
import {
    BOARD_COLUMNS,
    BOARD_ROWS,
    CELL_TYPES,
    GOAL_INDEX,
    START_INDEX,
} from '../constants/constants';
import { useNavigate } from 'react-router-dom';
import { HintQuestionDialog } from '../components/HintQuestionDialog';
import { HintDialog } from '../components/HintDialog';
// import { updateleadboard } from '../service/firebase/auth';
const GameInfo = ({ time, coins, score }) => {
    return (
        <div
            style={{
                display: 'flex',
                fontSize: '1.1rem',
                fontWeight: '700',
                justifyContent: 'space-around',
                margin: '1rem 0',
            }}
        >
            <div
                style={{
                    backgroundColor: '#38b6ff',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '0.5rem',
                }}
            >
                <div>
                    Time : <span>{time}</span>
                </div>
            </div>
            <div
                style={{
                    backgroundColor: '#38b6ff',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div style={{ marginRight: '5px' }}>Coins </div>{' '}
                <img width={'20px'} src='/images/coin.gif' alt='coin' />{' '}
                <span> {coins}</span>
            </div>
            <div
                style={{
                    backgroundColor: '#38b6ff',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '0.5rem',
                }}
            >
                <div>
                    Score :<span>{score}</span>
                </div>
            </div>
        </div>
    );
};
export const GameScreen = () => {
    const navigate = useNavigate()
    const [timer, settimer] = useState(0);
    const [state, setstate] = useState({
        wrongAnswers:0,
        coins: 0,
        score: 0,
        questionNo: 0,
        dialogOpen: false,
        hintDialogOpen: false,
        hintOptionIndex: null,
        BOARD: BoardData,
        currentPosition: [START_INDEX[0], START_INDEX[1]],
    });

    useEffect(() => {
        const id = setInterval(() => {
            settimer((prevState) => prevState + 1);
        }, 1000);

        return () => clearInterval(id);
    }, []);



    const fillWall = async (newPosition) => {



        if(newPosition[0] === GOAL_INDEX[0] && newPosition[1] === GOAL_INDEX[1]){
            console.log('hi')
            
            try{
              //  const userdata = JSON.parse( localStorage.getItem('userdata'))
                // const data = await updateleadboard(userdata.uid,state.score,timer
                //    ,state.coins)
                console.log('naviating')
                navigate('/profile',{
                    state:{
                        coins: state.coins,
                        score:state.score,
                        time: timer,
                    }
                })
            }catch(err){
                console.log(err)
            }

            return;
        }
        switch (state.BOARD[newPosition[0]][newPosition[1]]) {
            case CELL_TYPES.COIN:
                setstate((prevState) => {
                    const currentPosition = prevState.currentPosition;

                    const board = state.BOARD.map((row, row_index) => {
                        return row.map((col, col_index) => {
                            if (
                                row_index === newPosition[0] &&
                                col_index === newPosition[1]
                            ) {
                                return CELL_TYPES.EMPTY;
                            }
                            if (
                                row_index === currentPosition[0] &&
                                col_index === currentPosition[1]
                            ) {
                                return CELL_TYPES.WALL;
                            }
                            return col;
                        });
                    });
                    return {
                        ...prevState,
                        currentPosition: [...newPosition],
                        BOARD: board,
                        coins: prevState.coins + 1,
                        score: prevState.score + 10,
                    };
                });
                break;

            case CELL_TYPES.HINT:
                setstate((prevState) => {
                    const currentPosition = prevState.currentPosition;

                    const board = prevState.BOARD.map((row, row_index) => {
                        return row.map((col, col_index) => {
                            if (
                                row_index === newPosition[0] &&
                                col_index === newPosition[1]
                            ) {
                                return CELL_TYPES.EMPTY;
                            }
                            if (
                                row_index === currentPosition[0] &&
                                col_index === currentPosition[1]
                            ) {
                                return CELL_TYPES.WALL;
                            }
                            return col;
                        });
                    });

                    return {
                        ...prevState,
                        currentPosition: [...newPosition],
                        dialogOpen: true,
                        hintOptionIndex: [...newPosition],
                        BOARD: board,
                    };
                });
                break;

            case CELL_TYPES.EMPTY:
                setstate((prevState) => {
                    const currentPosition = prevState.currentPosition;
                    const board = prevState.BOARD.map((row, row_index) => {
                        return row.map((col, col_index) => {
                            if (
                                row_index === currentPosition[0] &&
                                col_index === currentPosition[1]
                            ) {
                                return CELL_TYPES.WALL;
                            }
                            return col;
                        });
                    });
                    return {
                        ...prevState,
                        BOARD: board,
                        currentPosition: [...newPosition],
                    };
                });
                break;

            default:
                break;
        }
    };

    const isSafePosition = (row, col) => {
        return (
            row >= 0 &&
            row < BOARD_ROWS &&
            col >= 0 &&
            col < BOARD_COLUMNS &&
            state.BOARD[row][col] !== CELL_TYPES.WALL
        );
    };
    const handleHintClose = (isCorrect) => {

        if(!isCorrect && state.wrongAnswers === 1) {
            navigate('/profile',{
                state:{
                    coins: state.coins,
                    score:state.score,
                    time: timer,
                }
            })
            return
        }
        setstate((prevState) => ({
            ...prevState,
            hintDialogOpen: true,
            dialogOpen: false,
            questionNo: prevState.questionNo + 1,
            score: isCorrect ? prevState.score + 20 : prevState.score,
            wrongAnswers:isCorrect ? prevState.wrongAnswers : prevState.wrongAnswers+1
        }));
    };

    const top = () => {
        const [row, col] = state.currentPosition;
        const new_row = row - 1;
        const new_col = col;

        if (isSafePosition(new_row, new_col)) {
            fillWall([new_row, new_col]);
        }
    };

    const right = () => {
        const [row, col] = state.currentPosition;
        const new_row = row;
        const new_col = col + 1;

        if (isSafePosition(new_row, new_col)) {
            fillWall([new_row, new_col]);
        }
    };
    const left = () => {
        const [row, col] = state.currentPosition;
        const new_row = row;
        const new_col = col - 1;

        if (isSafePosition(new_row, new_col)) {
            fillWall([new_row, new_col]);
        }
    };
    const bottom = () => {
        const [row, col] = state.currentPosition;
        const new_row = row + 1;
        const new_col = col;

        if (isSafePosition(new_row, new_col)) {
            fillWall([new_row, new_col]);
        }
    };

    const ArrowBtn = ({ symbol, onClick }) => {
        return <button style={{backgroundColor:'skyblue',borderRadius:'10px'}} onClick={onClick}>{symbol}</button>;
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                minWidth: '100vw',

                backgroundColor: 'white',
            }}
        >
            {state.dialogOpen && (
                <HintQuestionDialog
                    open={state.dialogOpen}
                    questionNo={state.questionNo}
                    handleClose={handleHintClose}
                />
            )}
            {state.hintDialogOpen && (
                <HintDialog
                    open={state.hintDialogOpen}
                    hintIndex={state.hintOptionIndex}
                    handleClose={() =>
                        setstate((prevState) => ({
                            ...prevState,
                            hintDialogOpen: false,
                        }))
                    }
                />
            )}
            <div
                style={{
                    maxWidth: '900px',
                    width: '100%',
                    marginBottom: '5rem',
                }}
            >
                <GameInfo
                    score={state.score}
                    coins={state.coins}
                    time={timer}
                />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <MazeBoard
                        fillWall={fillWall}
                        state={state}
                        isSafePosition={isSafePosition}
                        top={top}
                        left={left}
                        right={right}
                        bottom={bottom}
                    />
                </div>
                <ArrowBtn onClick={left} symbol={'Left'} />
                <ArrowBtn onClick={right} symbol={'Right'} />
                <ArrowBtn onClick={top} symbol={'Top'} />
                <ArrowBtn onClick={bottom} symbol={'Down'} />
            </div>
        </div>
    );
};
