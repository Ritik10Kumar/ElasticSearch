import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmailList = () => {
    const [email, setEmail] = useState('');
    const [emails, setEmails] = useState([]);

    const fetchEmails = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/emails', { params: { email } });
            setEmails(response.data.emails);
        } catch (error) {
            console.error(error);
            alert('Failed to fetch emails');
        }
    };

    useEffect(() => {
        if (email) fetchEmails();
    }, [email]);

    return (
        <div>
            <h2>Email List</h2>
            <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <button onClick={fetchEmails}>Fetch Emails</button>
            <ul>
                {emails.map((email, index) => (
                    <li key={index}>
                        <strong>{email.subject}</strong> - {email.from}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmailList;
