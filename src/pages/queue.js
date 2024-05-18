import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/queue.css";

function Queue() {
  const [queue, setQueue] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/queue/getAllQueue")
      .then((response) => {
        const nonPopped = response.data.filter((item) => item.isPopped === 0);
        setQueue(nonPopped);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });

    axios
      .get("http://localhost:8080/queue/calledNumb")
      .then((response) => {
        setCurrentCustomer(response.data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const handleCallNumber = () => {
    axios
      .get("http://localhost:8080/queue/popQueue")
      .then((response) => {
        setCurrentCustomer(response.data);
        setQueue(queue.filter((item) => item.id !== response.data.id));
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleSkipCustomer = () => {
    if (currentCustomer) {
      axios
        .post("http://localhost:8080/queue/skipQueue", currentCustomer)
        .then(() => {
          setCurrentCustomer(null);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
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
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.firstname}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No customers in queue.</p>
        )}
      </div>
      <div className="now-serving">
        <h2>NOW SERVING</h2>
        {currentCustomer ? (
          <div>
            <p className="number">{currentCustomer.id}</p>
            <p className="name">{currentCustomer.firstname}</p>
          </div>
        ) : (
          <p>No one is currently being served.</p>
        )}
        <div className="button-container">
          <button onClick={handleCallNumber}>Call Next</button>
          <button className="skip" onClick={handleSkipCustomer}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

export default Queue;
