import React from "react";
import "./style.css";

export default function Members() {
    return (
        <div className="tab-content">
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>rob</td>
                            <td>Roben</td>
                            <td>Navales</td>
                        </tr>
                        <tr>
                                <td>2</td>
                                <td>nik</td>
                                <td>Kin</td>
                                <td>Geonzon</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>char2</td>
                                <td>Charles</td>
                                <td>Salut</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>kris</td>
                                <td>Albrecht</td>
                                <td>Lanojan</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>jan123</td>
                                <td>Ethan</td>
                                <td>Acasio</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>john121</td>
                                <td>John</td>
                                <td>Sabejon</td>
                            </tr>
                    </tbody>
                </table>
            </div>
            <div className="user-details">
                <h2>User Details</h2>
                <div className="details">
                    <p>Username: rob</p>
                    <p>Firstname: Roben</p>
                    <p>Lastname: Navales</p>
                    <p>Password: ********</p>
                </div>
                <button>Save changes</button>
            </div>
        </div>
    );
}
