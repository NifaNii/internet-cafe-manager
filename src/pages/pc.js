import React, { useState } from 'react';
import '../css/pc.css'; // Import the CSS file

export default function PCManagement() {
    const [selectedPC, setSelectedPC] = useState(''); // State to track the selected PC

    // Function to handle click on PC image
    const handleClick = (pcName) => {
        setSelectedPC(pcName); // Update the selected PC
    };

    return (
        <div className="bg-zinc-100 dark:bg-zinc-800 h-screen flex">
            {/* Left Part: PCs */}
            <div className="w-1/2 p-4 overflow-auto">
                <div className="grid grid-cols-4 gap-4">
                    {/* PC items */}
                    {Array.from({ length: 12 }, (_, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <img
                                src={`/images/${i % 3 + 1}.png`}
                                alt={`PC-${i + 1}`}
                                className="rounded-lg w-12 h-9"
                                onClick={() => handleClick(`PC-${i + 1}`)} // Click handler
                            />
                            <span className="text-sm mt-1">PC-{i + 1}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Part: PC Details */}
            <div className="w-1/2 bg-gray-200 p-4">
                <div className="bg-white dark:bg-zinc-700 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-3">{selectedPC}</h2> {/* Display selected PC */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Logged In User:</label>
                        <input type="text" className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Change Status:</label>
                        <select className="w-full p-2 border rounded-md">
                            <option>Vacant</option>
                            <option>Occupied</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Balance Remaining:</label>
                        <input type="text" className="w-full p-2 border rounded-md" />
                    </div>
                    <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md mb-2 w-full">
                        Reset PC
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md w-full">
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
}
