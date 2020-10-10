import './Messages.css';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../UserContext';
import { Link } from 'react-router-dom';

export const Messages = () => {

    const { userContext } = useContext(UserContext);
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getMessages() {
            const get = await fetch(`http://localhost:5000/api/v1/users/${userContext.jwtID}/messages`, {
                headers: { "Authorization": "Bearer " + userContext.jwt }
            });
            if(get.ok) {
                const res = await get.json();
                /*
                    we fetch all messages for the user, so we have to create threads
                    (put messages into groups for each sender)
                */
                const threads = [...new Set(
                    res.map(msg => msg.senderID+" "+msg.senderUsername+" "+ msg.senderPhotoUrl)
                )].map(sender => sender.split(" "));

                setThreads([...threads]);
                setLoading(false);
            } else {
                console.log(get.status, "Error");
            }
        }
        getMessages();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="page messages">
            <div className="content">
                <h1>Messages</h1>
                <ul>
                {
                    !loading && threads
                    .map((user, i) => 
                        // user[0] = ID
                        // user[1] = Username
                        // user[2] = PhotoUrl
                        <Link to={"threads/" + user[0]} className="thread-link" key={i}>
                            <p>{user[1]}</p>
                            <img src={user[2]} alt=""></img>
                        </Link>
                    )
                }
                </ul>
            </div>
        </div>
    )
}