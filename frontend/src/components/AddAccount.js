import React, { useState } from 'react';
import axios from 'axios';

const AddAccount = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAddAccount = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/accounts/add', { email, password });
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert('Failed to add account');
        }
    };

    return (
        <div>
            <h2>Add Account</h2>
            <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleAddAccount}>Add Account</button>
        </div>
    );
};

export default AddAccount;
