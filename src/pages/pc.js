import React, { useEffect, useState } from 'react';
import '../css/pc.css'; // Import the CSS file
import axios from 'axios';

export default function PCManagement() {
    const [listOfPCs, setListOfPCs] = useState([]);
    const [selectedPC, setSelectedPC] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');

    const handleChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    // gets the data of the selected PC
    const handleGridItemClick = (selectedPC) => {
        setSelectedPC(selectedPC);
    }

    // get list of pcs
    useEffect(() => {
        const authToken = localStorage.getItem('access');

        // Set up Axios request configuration
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        };

        axios.get("http://localhost:8000/api/computers/", config)
            .then(response => {
                return response.data.results;
            })
            .then(data => {
                setListOfPCs(data);
                // setSelectedPC(data[0]);
                console.log(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    // changes the image depends on the status
    function getStatusImage(status) {
        switch (status) {
            case 1:
                return '../images/1.png';
            case 2:
                return '../images/2.png';
            case 3:
                return '../images/3.png';
            default:
                return '';
        }
    }

    const handleSubmit = () => {
        const updatedSelectedPC = { status: selectedStatus };
        // const updatedSelectedPC = { ...selectedPC, status: selectedStatus };
        console.log(updatedSelectedPC)
        updatePCStatus(selectedPC.id, updatedSelectedPC);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    // updates the pc status
    const updatePCStatus = async (id, pc) => {
        const authToken = localStorage.getItem('access');

        // Set up Axios request configuration
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        };

        try {
            await axios.put(`http://localhost:8000/api/computers/${id}/update_status/`, pc, config);
        } catch (error) {
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
                                    <img src={getStatusImage(item.status)} alt={`PC ${item.name}`} />
                                </div>
                                <div className='pc-number'>
                                    <p>PC-{item.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='update-area'>
                <div className='update-area-pc-icon'>
                    <img src='../images/4.png' />
                </div>

                <p>PC-{selectedPC.name}</p>
                {selectedPC.status === 1 && (
                    <p style={{ color: 'green' }}>{selectedPC.status}</p>
                )}
                {selectedPC.status === 2 && (
                    <p style={{ color: 'red' }}>{selectedPC.status}</p>
                )}
                {selectedPC.status === 3 && (
                    <p style={{ color: 'orange' }}>{selectedPC.status}</p>
                )}

                <label htmlFor='statusDropdown'>Change Status:</label>
                <select id='statusDropdown' onChange={handleChange}>
                    <option value=''>Select Status</option>
                    <option value='1'>Available</option>
                    <option value='2'>In Use</option>
                    <option value='3'>Maintenance</option>
                </select>
                <br />
                <br />
                <button onClick={handleSubmit} disabled={!selectedStatus}>Submit</button>
            </div>
        </div>
    );
}
