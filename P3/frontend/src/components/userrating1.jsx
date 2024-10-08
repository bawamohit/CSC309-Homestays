import { useEffect, useState } from "react";
import '../style.css'
import Comment from "./comment";

function UserRating(props) {

    const [userThatWasRated, setUserThatWasRated] = useState([])
    const [users, setUsers] = useState({})
    const [loggedIn, setLoggedIn] = useState([])
    const [reviews, setReviews] = useState([])
    const [page, setPage] = useState(1)
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null)

    useEffect(() => {
        console.log(props)
        var queryString = "accounts/view-comment-user/" + props.requester + "?page=" + `${page}`
        fetch('http://localhost:8000/' + queryString, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        })
            .then(response => response.json())
            .then(json => {
                setReviews([...json.results])
                setNext(json.next)
                setPrevious(json.previous)
            })
    }, [page, props.requester])

    // useEffect(() => {
    //     if (Object.keys(reviews).length !== 0) {
    //         fetch('http://localhost:8000/accounts/view-user/' + reviews[0].user +'/', {
    //             headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
    //         })
    //             .then(response => response.json())
    //             .then(json => {
    //                 setUsers(json)
    //             })
    //     }
    // }, [reviews])

    useEffect(() => {
            fetch('http://localhost:8000/accounts/view-user/' + props.requester + '/', {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    setUserThatWasRated(json)
                })
        
    }, [props.requester])

    useEffect(() => {
        fetch('http://localhost:8000/accounts/see-logged-in-user', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        })
            .then(response => response.json())
            .then(json => {
                setLoggedIn(json)
            })
    }, [])

    return (
        <div>
            <button className="btn float-right" style={{ background: '#85bded' }} data-bs-toggle="modal" data-bs-target={`#guests-modal-${props.requester}`}>User Rating</button>
            <div class="modal fade" id={`guests-modal-${props.requester}`} tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" style={{ color: '#85bded' }}>
                                <img src={userThatWasRated.avatars}
                                    class="profile1css img-fluid rounded-circle"></img>
                                &nbsp; {userThatWasRated.first_name}'s Ratings
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body justify-content-between">
                            <div class="card card-body border-0">
                                <div class="row">
                                    <div class="col-sm-2 col-3 p-0 ">
                                    </div>
                                    <div class="col-sm-10 col-9 p-0">
                                        <div class="text-secondary">
                                            {reviews.map(review =>
                                                //     <div>
                                                // <div>Rating:  {review.rating} Stars</div>
                                                // <div>{review.body}</div></div>
                                                <Comment uid={review.user} hostid={null} position={0} body={review.body} rating={review.rating}  date={review.date} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="ms-auto me-auto" style={{ maxWidth: "700px" }}>
                                <div className="d-flex justify-content-between" style={{ maxWidth: "700px" }}>
                                    <button className="btn btn-secondary my-5" type="button" onClick={() => { if (previous) setPage(page - 1) }}>Previous Page</button>
                                    <button className="btn btn-secondary my-5" type="button" onClick={() => { if (next) setPage(page + 1) }}>Next Page</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserRating;
