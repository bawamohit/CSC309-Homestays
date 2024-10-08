import { useState, useEffect } from "react";

function Comment(props) {
    const [user, setUser] = useState({})

    let justDate = props.date.split('T')[0]
    let justTime = props.date.split('T')[1]
    let justHour = justTime.split(':')[0]
    let justMinute = justTime.split(':')[1]
    console.log(justDate)

    useEffect(() => {
        fetch('http://localhost:8000/accounts/view-user/' + props.uid, {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
            }).then(response => response.json())
            .then(json => setUser(json))
    }, [props.uid])

    var padding = 0
    if (props.position > 0) {
        padding = 5
    }

    return (
        <div className={`px-${padding}`}>
            <div className="d-flex gap-3">
                <img src={user.avatars} alt="User" className="rounded-circle img-fluid" style={{maxHeight:'40px'}}></img>
                <div>
                    <div>{user.first_name} {user.last_name}  (Date: {justDate}/Time: {justHour}:{justMinute})</div>
                    {props.rating ? (<p>Rating: {props.rating} stars</p>) : ("")}
                    {props.uid === props.hostid ? (<p>(host)</p>) : ("")}
                </div>
            </div>
            <p>{props.body}</p>   
        </div>
    )
}

export default Comment;