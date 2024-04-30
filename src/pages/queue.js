import React, { useState } from "react";
import "../css/queue.css";
import axios from "axios";

export default function Queue() {
  const [queue, setQueue] = useState([
    { number: 68, name: "John" },
    { number: 69, name: "Kin" },
    { number: 70, name: "Ethan" },
    { number: 71, name: "Albercht" },
    { number: 72, name: "Roben" },
  ]);
  const [currentCustomer, setCurrentCustomer] = useState(
    queue.length > 0 ? queue[0] : null
  );

  const handleCallNumber = () => {
    if (queue.length > 0) {
      const newCustomer = queue.shift();
      setCurrentCustomer(newCustomer);
      setQueue([...queue]); // Ensure to create a new array to trigger state update
    }
  };

  const handleSkipCustomer = () => {
    if (currentCustomer) {
      setQueue([...queue, currentCustomer]);
      setCurrentCustomer(null);
    }
  };

  return (
    <div className="queue-system">
      <div className="queue-list">
        {queue.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Number</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((customer) => (
                <tr key={customer.number}>
                  <td>{customer.number}</td>
                  <td>{customer.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No customers in queue.</p>
        )}
      </div>
      <div className="now-serving">
        <h2>NOW SERVING</h2>{" "}
        {currentCustomer ? (
          <div>
            <p className="number">{currentCustomer.number}</p>
            <p className="name">{currentCustomer.name}</p>
            <div className="button-container">
              <button onClick={handleCallNumber}>Call Next</button>
              <button className="skip" onClick={handleSkipCustomer}>
                Skip
              </button>
            </div>
          </div>
        ) : (
          <p>No one is currently being served.</p>
        )}
      </div>
    </div>
  );
}
