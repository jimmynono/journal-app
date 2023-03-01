import React, { useState, useEffect } from 'react'
import { collection, addDoc } from "firebase/firestore";
import db from '../db';
import firebase from 'firebase/compat/app';


export default function AddJournal() {
    const [entry, setEntry] = useState('');
    const [user, setUser] = useState({})

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            setUser(user)
        })

        return () => unregisterAuthObserver();
    }, [])

    const submitForm = (e) => {
        e.preventDefault();
        console.log('submit')

        // const userId = 'BuQm7gs4XxvIPPh4tAAx'

        const entriesRef = collection(db, 'users', user.uid, 'journal-entries')
        addDoc(entriesRef, {
            entry,
            createdAt: new Date()
        }).then(setEntry(''));
    }

    return (
        <div>
            <h2>Add Journal Entry</h2>
            <form onSubmit={submitForm}>
                <label htmlFor="entry-input">Entry: </label>
                <textarea id="entry-input" onChange={e => setEntry(e.target.value)} value={entry} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}



