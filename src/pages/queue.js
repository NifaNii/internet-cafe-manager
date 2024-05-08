import axios from "axios";
import { useEffect, useState } from "react";

export default function Queue(){
    const [queueList, setQueueList] = useState([]);
    const [calledNumb, setCalledNumb] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/queue/getAllQueue")
            .then(response => {
                const nonPopped = response.data.filter(item => item.isPopped === 0);
                setQueueList(nonPopped);
                console.log(response)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

        axios.get("http://localhost:8080/queue/calledNumb")
            .then(responda => {
                // console.log(responda);
                setCalledNumb(responda.data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            })
    }, []);

    const handleCallNum = () => {
        axios.get("http://localhost:8080/queue/popQueue")
            .then(responseCallNum => {
                console.log(responseCallNum)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            })
    }

    return(
        <div className="queue-main">
            <div className="queue-area">
                <div className='queue-table-wrapper'>
                    <table>
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>User</th>
                            </tr>
                        </thead>

                        <tbody>
                            {queueList.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.firstname}</td>
                                </tr>        
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="functions-area">
                <div className='queue-number-box'>
                    {calledNumb ? (
                        <>
                            <p className='queue-called-number'>{calledNumb.id}</p>
                            <p className='queue-called-name'>{calledNumb.firstname}</p>
                        </>
                    ):(
                        <>
                            <p className='queue-called-number'>0</p>
                            <p className='queue-called-name'>none</p>
                        </>
                    )}
                </div>

                <button onClick={handleCallNum}>Call Number</button>
            </div>
        </div>
    );
}