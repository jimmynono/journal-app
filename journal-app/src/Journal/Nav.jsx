import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';

export default function Nav() {
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            setUser(user.uid)
        })

        return () => unregisterAuthObserver();
    }, [user])

    return (
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/journal">Journal</Link></li>
                <li><Link to="/journal/1">Journal Entry</Link></li>
                {user && <div>
                    <p>{user.displayName}</p>
                    <img src={user.photoURL} alt={user.displayName} />
                    <button onClick={() => {
                        firebase.auth().signOut();
                        navigate('/')
                    }}>Sign Out</button>

                </div>}
            </ul>
        </div>
    );
}
