import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css'
import ProfileCard from './ProfileCard';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sliceIndex, setSliceIndex] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios.get('https://stribe-server.onrender.com/people');
      console.log(res);
      if (res.data.length >= 6) {
        setData(res.data.slice(0, 6));
      }
      else {
        setData(res.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        fetchMoreData(sliceIndex + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data]);

  const fetchMoreData = async (idx) => {
    if (isLoading) {
      return;
    }

    const response = await axios.get('https://stribe-server.onrender.com/people');

    if (response.data.length < idx) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setData(prevData => [...prevData, ...response.data.slice(prevData.length, prevData.length + 1)]);
    setSliceIndex(prevIndex => prevIndex + 1);
    setIsLoading(false);
  };

  return (
    <div className="homecontainer">
      <div className="ButtonContainer">
        <div className="OfferedButton" >

        </div>
      </div>
      <div className="ButtonContainer">
        <Link className="CreateButton" to="/form">
          CREATE PROFILE
        </Link>
      </div>

      <div className='ProfileContainer'>
        {data.map(item => (
          <ProfileCard props={item} />
        ))}
        <span>
          {isLoading && <p>Loading...</p>}
        </span>
      </div>
    </div>
  );
}

export default Home;
