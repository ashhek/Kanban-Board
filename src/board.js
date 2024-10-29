import React, { useEffect, useState } from 'react';
import todo from './to do.png';
import Card from './Card.js';
import './Status.css';
import plusmore from './plusmore.png';
import nopriorityimg from './nopriority.png';

const Board = (props) => {
    const [todono, setTodonum] = useState(0);
    const [tick, setTick] = useState([{ id: "CAM" }]);
    const [inProgressno, setInProgressno] = useState(0);
    const [doneno, setDoneno] = useState(0);
    const [cancelled, setCancelled] = useState(0);
    const [backlog, setBacklog] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
                const result = await response.json();
                setTick(result.tickets);
                count(result.tickets);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, []);

    const count = (tickets) => {
        tickets.forEach((ticket) => {
            switch (ticket.status) {
                case "Todo":
                    setTodonum((prev) => prev + 1);
                    break;
                case "In Progress":
                    setInProgressno((prev) => prev + 1);
                    break;
                case "Done":
                    setDoneno((prev) => prev + 1);
                    break;
                case "cancelled":
                    setCancelled((prev) => prev + 1);
                    break;
                case "backlog":
                    setBacklog((prev) => prev + 1);
                    break;
                default:
                    break;
            }
        });
    };

    return (
        <div className='Board'>
            <div className='boardHeading'>
                <img src={nopriorityimg} className='headingImg' alt='' />
                <p className='cText' style={{ width: "190px" }}>No-Priority</p>
                <p className='cText'>{backlog}</p>
                <div className='boardHeading' id='pluske'>
                    <img src={plusmore} className='headingImg' alt='' />
                </div>
            </div>

            <div className='Cards'>
                {tick.length > 0 && tick.map((ticket) => (
                    ticket.priority === 0 && <Card key={ticket.id} ticket={ticket} />
                ))}
            </div>
        </div>
    );
};

export default Board;
