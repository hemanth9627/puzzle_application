import React from 'react'
// import { leaderbord } from '../service/firebase/auth'
import '../styles/leaderboard.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Leaderboard = ({board}) => {
  

  return (
    <div>

    <h3 className="text-center text-danger">LeaderBoard</h3>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {board ? (
        <table
          style={{
            borderCollapse: 'collapse',
            textAlign: 'center',
            borderRadius: " 50%",
            boxShadow:
              'rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px',
          }}
        >
          <tr
            style={{
              backgroundColor: '#143d59',
              color: "white",
              
            }}
          >
            <td>Rank</td>
            <td>Username</td>
            <td>Coins</td>
            <td>Time</td>
            <td>Score</td>
          </tr>
          {board.map((data, idx) => {
            return (
              <tr
                style={{
                  backgroundColor: '#feda14',
                  borderBottom: '1px solid #B9EDDD',
                }}
                key={idx}
              >
                <td>{idx + 1}</td>
                <td style={{ fontFamily: 'fantasy', fontSize: '20px' }}>
                  {data.username}
                </td>
                <td>{data.coins}</td>
                <td>{data.time}</td>
                <td>{data.score}</td>
              </tr>
            )
          })}
        </table>
      ) : (
        ''
      )}
    </div>
    </div>
  )
}

export default Leaderboard
