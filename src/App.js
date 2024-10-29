import './App.css';
import Navbar from './Navbar.js';
import Status from './Status.js';
import Priority from './Priority';
import Byuser from './Byuser.js';
import { useState, useEffect } from 'react';

const App = () => {
    const [Grouping, setGrouping] = useState(() => localStorage.getItem('grouping'));
    const [Order, setOrder] = useState(() => localStorage.getItem('order'));

    const setGroupingValue = (newValue) => {
        if (['status', 'priority', 'user'].includes(newValue)) {
            setGrouping(newValue);
        } else {
            console.error('Invalid grouping value provided:', newValue);
        }
    };

    const setOrderingValue = (newValue) => {
        if (['Priority', 'Title'].includes(newValue)) {
            setOrder(newValue);
        } else {
            console.error('Invalid ordering value provided:', newValue);
        }
    };

    const content = (() => {
        switch (Grouping) {
            case 'status':
                return <Status order={Order} />;
            case 'priority':
                return <Priority order={Order} />;
            default:
                return <Byuser order={Order} />;
        }
    })();

    return (
        <div className='fullBody'>
            <Navbar 
                order={Order} 
                grouping={Grouping} 
                setGroupingValue={setGroupingValue} 
                setOrderingValue={setOrderingValue} 
            />
            {content}
        </div>
    );
};

export default App;
