import React from 'react';
import {
    BOARD_BORDER_COLOR,
    BOARD_BORDER_SIZE,
    BOARD_COLUMNS,
    BOARD_ROWS,
    CELL_TYPES,
    GOAL_INDEX,
} from '../constants/constants';
import {
    CoinCell,
    CurrentPosition,
    EmptyCell,
    GoalCell,
    HintCell,
    WallCell,
} from './Cells';

export const MazeBoard = ({top,bottom,right,left,  state }) => {
   
  

   
    // useEffect(() => {
    //     window.addEventListener('keydown', (event) => {
    //         switch (event.code) {
    //             case 'ArrowUp':
    //                 event.preventDefault();
    //                 top();
    //                 break;
    //             case 'ArrowDown':
    //                 event.preventDefault();
    //                 bottom();
    //                 break;
    //             case 'ArrowRight':
    //                 event.preventDefault();
    //                 right();
    //                 break;
    //             case 'ArrowLeft':
    //                 event.preventDefault();
    //                 left();
    //                 break;
    //             default:
    //                 break;
    //         }
    //     });

    //     return () => {
    //         window.removeEventListener('keydown', window);
    //     };
    // }, [top,bottom,right,left,state]);
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                border: BOARD_BORDER_SIZE + ' solid ' + BOARD_BORDER_COLOR,
            }}
        >
            {Array.from(new Array(BOARD_ROWS)).map((_, row_index) => {
                return (
                    <div key={row_index} style={{ display: 'flex' }}>
                        {Array.from(new Array(BOARD_COLUMNS)).map(
                            (_x, col_index) => {
                                const CELL_TYPE = state.BOARD[row_index][col_index];

                                const key = row_index + " "+col_index+' '+CELL_TYPE
                                //GOAL CELL

                                if (
                                    row_index === GOAL_INDEX[0] &&
                                    col_index === GOAL_INDEX[1]
                                ) {
                                    return <GoalCell key={key} />;
                                }

                                if (
                                    row_index === state.currentPosition[0] &&
                                    col_index === state.currentPosition[1]
                                ) {
                                    return <CurrentPosition key={key}/>;
                                }

                                if (CELL_TYPE === CELL_TYPES.WALL)
                                    return <WallCell key={key}/>;

                                if (CELL_TYPE === CELL_TYPES.COIN)
                                    return <CoinCell key={key}/>;

                                if (CELL_TYPE === CELL_TYPES.HINT)
                                    return <HintCell key={key}/>;
                                return <EmptyCell key={key}/>;
                            }
                        )}
                    </div>
                );
            })}
        </div>
    );
};
