import React, { useEffect, useState } from 'react'
import "./DisplayUsers.css"
const DisplayUsers = () => {
    const [allUsers, setAllUsers]=useState([])
    useEffect(()=>{
        fetch("/allUsers")
        .then(res=>res.json())
        .then((data)=>{
            setAllUsers(data)
        })
    },[])
  return (
    <div>
    <h1>Submitted Forms</h1>
    <br></br>
    <table>
        <thead>

        <tr>
            <th>Name</th>
            <th>DOB (yyyy-mm-dd)</th>
            <th>Email</th>
            <th>Phone</th>
        </tr>
        </thead>
        <tbody>

    {
        allUsers.map((user,i)=>{
            return(
                <tr key={i}>
                    <td>{user.name}</td>
                    <td>{user.dob.split("T")[0]}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                </tr>
            )
        })
    }
    </tbody>
    </table>
    </div>
  )
}

export default DisplayUsers