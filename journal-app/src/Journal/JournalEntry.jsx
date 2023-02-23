import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, deleteDoc, setDoc } from 'firebase/firestore';
import db from '../db';

export default function JournalEntry() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [entry, setEntry] = useState([])
    const nav = useNavigate()

    useEffect(() => {
        const entryRef = doc(db, 'journal-entries', id)
        getDoc(entryRef).then(docSnap => {
            setIsLoading(false);

            if (docSnap.exists()) {
                setEntry(docSnap.data())
            } else {
                console.log("No such document!");
                setHasError(true)
            }

        })
    }, [id])

    if (isLoading) {
        return <p>loading...</p>
    }

    if (hasError) {
        return <p>Has error!</p>
    }

    const handleDelete = () => {
        deleteDoc(doc(db, "journal-entries", id));
        alert('Deleted!')
        nav('/journal')
    }

    const showPrompt = () => {
        const newVal = window.prompt('New entry value')
        if (newVal !== '' || newVal !== entry.entry) {
            const entryRef = doc(db, 'journal-entries', id)
            setDoc(entryRef, {
                entry: newVal,
                createdAt: new Date()
            })
            alert('Edited!')
            nav('/journal')
        }
    }

    return (
        <div>
            <h1>Journal Entry: {id}</h1>
            {entry.entry}
            <br />
            <button onClick={handleDelete}>Delete</button>
            <button onClick={showPrompt}>Edit</button>

        </div>
    );
}
