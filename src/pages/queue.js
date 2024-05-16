import { useEffect, useState } from "react";
import axios from "axios";

export default function Queue() {
    const [queues, setQueues] = useState([]);

    const fetchQueues = async () => {
        const authToken = localStorage.getItem('access');

        // Set up Axios request configuration
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        };

        try {
            const response = await axios.get(`http://localhost:8000/api/queues/`, config);
            console.log(response.data.results);
            setQueues(response.data.results);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    useEffect(() => {
        fetchQueues();
    }, []);

    return (
        <div>
            {queues.map((queue, index) => (
                <p key={index}>{queue.account_details?.first_name} - {queue.number}</p>
            ))}
        </div>
    );
}