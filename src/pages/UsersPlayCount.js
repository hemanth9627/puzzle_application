import React, { useEffect, useState } from "react";
import { getuserdata, leaderbord } from "../service/firebase/auth";
import { userId } from "../service/firebase/auth";
import { get1user } from "../service/firebase/auth";
// import "../styles/leaderboard.modules.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "@mui/material";
import AdminLeaderBoard from "./AdminLeaderBoard";


const UsersPlayCount = () => {
  const [board, setboard] = useState([]);
const [leaders,setleaders] = useState([])
  const [display,setdisplay] = useState(false);

  const getData = async () => {
    const response = await getuserdata();
    setboard(response);
  };
  const fetchLeaderboard=async()=>{
    const data = await leaderbord()
    console.log('leader board data ',data)
    setleaders(data)
  }
 

  useEffect(() => {
    getData();
    fetchLeaderboard()
  }, []);

  const uId = userId();

  // if (uId == null) {
    console.log("This is", uId);
  // }

  const displayBoard = ()=>{
    setdisplay(true);
  }
  
  const displayBoard1 = ()=>{
    setdisplay(false);
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around",width : "100%",margin : "0 auto" ,padding : "50px"}}>
        <Button variant="contained" onClick={displayBoard1}>userBoard</Button>
        <Button variant="contained" onClick={displayBoard}>Leaderboard</Button>
       
      </div>
      {
        display?(
           <AdminLeaderBoard board={leaders} />
        ):(
         <div>
           <h3 className="text-center text-danger">UserBoard</h3>
         <div style={{ display: "flex", justifyContent: "center" }}>
          {board ? (
            <div className="row">
              <div className="col-md-6">
                 <table
            
              style={{
                borderCollapse: "collapse",
                textAlign: "center",
                
                boxShadow:
                  "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px",
              }}
            >
              <tr
                style={{
                  backgroundColor: "#143d59",
                  color : "white",
                  borderRadius: "10px"
                }}
                
              >
                <td>S.NO</td>
                <td>Username</td>
                <td>Games played</td>
              </tr>
              {board.map((data, idx) => {
                return (
                  <tr
                  
                    style={{
                      backgroundColor: "#feda14",
                      borderBottom: "1px solid #B9EDDD",
                    }}
                    key={idx}
                  >
                    <td>{idx + 1}</td>
                    <td style={{ fontFamily: "fantasy", fontSize: "20px" }}>
                      {data.username}
                    </td>
                    <td>{data.gamesplayed}</td>
                  </tr>
                );
              })}
            </table>
              </div>
            </div>
        ) : (
          "leaderboard"
        )}
      </div>  
         </div>
        )
      }
    </div>
  );
};

export default UsersPlayCount;
