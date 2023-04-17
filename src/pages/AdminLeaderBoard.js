import React from 'react'
import Leaderboard from '../components/Leaderboard'

const AdminLeaderBoard = ({board}) => {
  return (
    <div>
      <div style={{ marginTop: '20px' }}>
          <Leaderboard board={board} />
      </div>
    </div>
  )
}

export default AdminLeaderBoard
