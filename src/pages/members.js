import React, { useState, useEffect } from "react";
import "../css/members.css";
import axios from "axios";

export default function Members() {
    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMember, setSelectedMember] = useState(null);
    const [editedMember, setEditedMember] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const fetchMembers = async () => {
        const authToken = localStorage.getItem('access');

        // Set up Axios request configuration
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        };

        try {
            const response = await axios.get(`http://localhost:8000/api/accounts/`, config);
            setMembers(response.data.results);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        searchMembers();
    };

    const searchMembers = async () => {
        try {
            // const response = await axios.get(`http://localhost:8080/member/getAllMembers?term=${searchTerm}`);
            const foundMember = members.find(member => member.username === searchTerm);
            if (foundMember) {
                setSelectedMember(foundMember);
                setEditedMember({ ...foundMember });
            } else {
                setSelectedMember(null);
                setEditedMember({});
            }
            setMembers(response.data);
        } catch (error) {
            console.error('Error searching members:', error);
        }
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        // if (/^[a-zA-Z0-9]*$/.test(value) || value === ''){
        setEditedMember({ ...editedMember, [name]: value });
        // }else{
        //     alert('Input should contain only letters and numbers.');
        // }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const saveChanges = async () => {
        const isAlphaNumeric = (str) => /^[a-zA-Z0-9]*$/.test(str);

        const isValid = Object.values(editedMember).every(value => isAlphaNumeric(value));

        const isEmptyField = Object.values(editedMember).some(value => value === '');

        if (isEmptyField) {
            alert('Please fill in all fields.');
            return;
        }

        if (!isValid) {
            alert('Member details should only contain letters and Numbers.');
            return;
        }
        try {
            await axios.put(`http://localhost:80800/api/accounts/${editedMember.id}/`, editedMember);
            alert('Changes saved successfully!');
            fetchMembers();
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    const renderMembers = () => {
        return members.map(member => (
            <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.username}</td>
                <td>{member.first_name}</td>
                <td>{member.last_name}</td>
                <td>{member.balance}</td>
            </tr>
        ));
    };

    return (
        <div className="tab-content">
            <form onSubmit={handleSearchSubmit}> { }
                <div className="search-bar">
                    <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
                </div>
            </form>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderMembers()}
                    </tbody>
                </table>
            </div>
            <div className="user-details">
                <h2>User Details</h2>
                {selectedMember && (
                    <div className="details">
                        <p>
                            Username:{" "}
                            <input
                                type="text"
                                name="username"
                                value={editedMember.username}
                                onChange={handleEditChange}
                            />
                        </p>
                        <p>
                            Firstname:{" "}
                            <input
                                type="text"
                                name="firstname"
                                value={editedMember.firstname}
                                onChange={handleEditChange}
                            />
                        </p>
                        <p>
                            Lastname:{" "}
                            <input
                                type="text"
                                name="lastname"
                                value={editedMember.lastname}
                                onChange={handleEditChange}
                            />
                        </p>
                        <p>
                            Password:{" "}
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={editedMember.password || ""}
                                onChange={handleEditChange}
                            />
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={toggleShowPassword}
                            />
                        </p>
                        <p>
                            Balance:{" "}
                            <input
                                type="number"
                                name="balance"
                                value={editedMember.balance}
                                onChange={handleEditChange}
                            />
                        </p>
                    </div>
                )}
                <button onClick={saveChanges}>Save changes</button>
            </div>
        </div>
    );
}
