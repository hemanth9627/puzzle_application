import React, { useEffect, useState } from 'react';
import Leaderboard from '../components/Leaderboard';
import { useLocation } from 'react-router';
import { leaderbord } from '../service/firebase/auth';

function Profile() {
    const location = useLocation();
    const [state, setstate] = useState({
        time: 0,
        coins: 0,
        score: 0,
        leaderboard: [],
    });

    const fetchLeaderBoard = async()=>{
      const data = await leaderbord()
      setstate(prevState=>({...prevState,leaderboard:data}))
    }

    useEffect(() => {
      if(location.state)
        setstate((prevState) => ({
            ...prevState,
            time: location.state.time,
            coins: location.state.coins,
            score: location.state.score,
        }));

      fetchLeaderBoard()

      


    }, []);


    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    margin: '30px 0 80px 0',
                }}
            >
                <div
                    style={{
                        width: '150px',
                        height: '150px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#577D86',
                        boxShadow:
                            'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                        borderRadius: '4px',
                        color: 'white',
                    }}
                >
                    <div style={{ fontSize: '25px', marginBottom: '10px' }}>
                        Time
                    </div>
                    <div>{state.time}</div>
                </div>
                <div
                    style={{
                        width: '150px',
                        height: '150px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#577D86',
                        boxShadow:
                            'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                        borderRadius: '4px',
                        color: 'white',
                    }}
                >
                    <div style={{ fontSize: '25px', marginBottom: '10px' }}>
                        Coins
                    </div>
                    <div>{state.coins}</div>
                </div>
                <div
                    style={{
                        width: '150px',
                        height: '150px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#577D86',
                        boxShadow:
                            'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                        borderRadius: '4px',
                        color: 'white',
                    }}
                >
                    <div style={{ fontSize: '25px', marginBottom: '10px' }}>
                        Score
                    </div>
                    <div>{state.score}</div>
                </div>
            </div>
            <Leaderboard board={state.leaderboard}/>
        </div>
    );
}

export default Profile;
