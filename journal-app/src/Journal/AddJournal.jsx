import React, { useState } from 'react'
import { collection, addDoc } from "firebase/firestore";
import db from '../db';

export default function AddJournal() {
    const [entry, setEntry] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        console.log('submit')

        const entriesRef = collection(db, "journal-entries")
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



