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

    const handleSubmit = () => {
        const updatedSelectedPC = {...selectedPC, status: selectedStatus };
        console.log(updatedSelectedPC)
        updatePCStatus(updatedSelectedPC.id, updatedSelectedPC);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    // updates the pc status
    const updatePCStatus = async(id, pc) => {
        try{
            await axios.put(`http://localhost:8080/pc/updatePCStatus?id=${id}`, pc);
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

                <p>PC-{selectedPC.id}</p>
                {selectedPC.status === 'Vacant' && (
                <p style={{ color: 'green' }}>{selectedPC.status}</p>
                )}
                {selectedPC.status === 'Occupied' && (
                <p style={{ color: 'red' }}>{selectedPC.status}</p>
                )}
                {selectedPC.status === 'Maintenance' && (
                <p style={{ color: 'orange' }}>{selectedPC.status}</p>
                )}

                <label htmlFor='statusDropdown'>Change Status:</label>
                <select id='statusDropdown' onChange={handleChange}>
                    <option value=''>Select Status</option>
                    <option value='Vacant'>Vacant</option>
                    <option value='Occupied'>Occupied</option>
                    <option value='Maintenance'>Maintenance</option>
                </select>
                <br/>
                <br/>
                <button onClick={handleSubmit} disabled={!selectedStatus}>Submit</button>
            </div>
        </div>
    );
}
