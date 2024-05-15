import React, { useEffect, useState } from 'react';
import '../css/pc.css'; // Import the CSS file
import axios from 'axios';

export default function PCManagement() {
    const [listOfPCs, setListOfPCs] = useState([]);
    const [selectedPC, setSelectedPC] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [updatedSelectedPC, setUpdatedSelectedPC] = useState();

    const handleChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    // gets the data of the selected PC
    const handleGridItemClick = (selectedPC) => {
        setSelectedPC(selectedPC);
    }

    // get list of pcs
    useEffect(() => {
        axios.get("http://localhost:8080/pc/getAllPC")
            .then(response => {
                return response.data;
            })
            .then(data => {
                setListOfPCs(data);
                setSelectedPC(data[0]);
                console.log(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    // changes the image depends on the status
    function getStatusImage(status){
        switch (status){
            case 'Vacant':
                return '../images/1.png';
            case 'Occupied':
                return '../images/2.png';
            case 'Maintenance':
                return '../images/3.png';
            default:
                return '';
        }
    }

    const handleSubmit = (execute) => {
        // const updatedSelectedPC = {...selectedPC, status: selectedStatus };
        // console.log(updatedSelectedPC)
        // updatePCStatus(updatedSelectedPC.id, updatedSelectedPC);

        switch(execute){
            case 1:
                setUpdatedSelectedPC({...selectedPC, status: "Maintenance", loggeduser: null});
                break;
            case 2:
                setUpdatedSelectedPC({...selectedPC, status: "Vacant", loggeduser: null});
                break;
            default:
                console.log("execute what order sire?");
                break;
        }

        // setTimeout(() => {
        //     window.location.reload();
        // }, 1000);
    }

    useEffect(() => {
        if(updatedSelectedPC){
            updatePCStatus(updatedSelectedPC.id, updatedSelectedPC);
        }
    }, [updatedSelectedPC])

    // updates the pc status
    const updatePCStatus = async(id, pc) => {
        try{
            await axios.put(`http://localhost:8080/pc/loggedInUser?id=${id}`, pc);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }catch(error){
            return console.log('error lmao');
        }
    }

    return (
        <div className='pc-main'>
            <div className='pc-area'>
                <div className='grid-container'>
                    {listOfPCs.map((item, index) => (
                        <div 
                            key={index} 
                            className={`grid-item ${selectedPC == item ? 'selected' : ''}`}
                            onClick={() => handleGridItemClick(item)}>
                                <div className='pc-n-num'>
                                    <div className='pc-icon'>
                                    <img src={getStatusImage(item.status)} alt={`PC ${item.pcNumber}`} />
                                    </div>
                                    <div className='pc-number'>
                                        <p>PC-{item.pcNumber}</p>
                                    </div>
                                </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='update-area'>
                <div className='update-area-pc-icon'>
                    <img src='../images/4.png'/>
                </div>

                <p className='pc-bold-me'>PC-{selectedPC.id}</p>
                {selectedPC.status === 'Vacant' && (
                <>
                    <p style={{ color: 'green' }} className='pc-bold-me'>{selectedPC.status}</p>
                    <button onClick={() => handleSubmit(1)}>Set to Maintenance</button>
                </>
                )}
                {selectedPC.status === 'Occupied' && (
                <>
                    <p style={{ color: 'red' }} className='pc-bold-me'>{selectedPC.status}</p>
                    <p>Logged In User: {selectedPC.loggeduser}</p>
                    <button onClick={() => handleSubmit(2)}>Force Log out</button>
                </>
                )}
                {selectedPC.status === 'Maintenance' && (
                    <>
                        <p style={{ color: 'orange' }} className='pc-bold-me'>{selectedPC.status}</p>
                        <button onClick={() => handleSubmit(2)}>Set to Vacant</button>
                    </>
                )}

                {/* <label htmlFor='statusDropdown'>Change Status:</label>
                <select id='statusDropdown' onChange={handleChange}>
                    <option value=''>Select Status</option>
                    <option value='Vacant'>Vacant</option>
                    <option value='Occupied'>Occupied</option>
                    <option value='Maintenance'>Maintenance</option>
                </select>
                <br/>
                <br/>
                <button onClick={handleSubmit} disabled={!selectedStatus}>Submit</button> */}
            </div>
        </div>
    );
}
