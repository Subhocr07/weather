import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherDB = () => {
    const [recent, setRecent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getUsers = () => {
        const token = localStorage.getItem('user');
        axios.get('http://localhost:3032/saved', {
            params: { nocache: new Date().getTime() },
            headers: { Authorization: token }
        })
            .then(response => {
                console.log(response.data.reverse())
                setRecent(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    };


    useEffect(() => {
        getUsers()
    }, []);


    if (isLoading) {
        return <div>Loading... </div>
    }
    return (
        <>
            <div className='pastRecord'>
                <div className='left'>
                    <h2>Recent Searches</h2>
                </div>
                <div className='right'>
                    <ul>
                        {recent.map((user, i) => (
                            <li key={i}>
                                <h3>city:{user.city}</h3>
                                <p>temperature:{user.temperature}</p>
                                <p>description:{user.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default WeatherDB