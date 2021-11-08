import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import TrackCard from './Track_Components/TrackCard';
import AudioPlayer from './Track_Components/AudioPlayer';

const TrackInfo = (props) => {
  const username = props.match.params.username;
  const track_id = props.match.params.track_id;
  const user = JSON.parse(window.localStorage.getItem('user'));
  const darkMode = useSelector((darkmode) => darkmode.toggleDarkMode);
  const [userData, setUserData] = useState(null);

  const [arrayData, setArrayData] = useState([]);

  const get_User = async () => {
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${username}`).then((value) => {
      setUserData(value.data);
    });
  };

  const fetchData = async () => {
    const fileRes = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user`);
    let track_data = [];
    for (let i = 0; i < fileRes.data.length; i++) {
      if (fileRes.data[i].tracks) {
        if (user ? fileRes.data[i].username === user.username : false) {
          continue;
        }
        if (fileRes.data[i].username !== username && fileRes.data[i].tracks.length > 0) {
          setArrayData((prevState) => [...prevState, fileRes.data[i]]);
          track_data.push(fileRes.data[i]);
        }
      }
    }
    console.log('fetch', track_data);
    if (
      JSON.parse(window.sessionStorage.getItem('Track_Array')) !== '' ||
      !JSON.parse(window.sessionStorage.getItem('Track_Array'))
    ) {
      window.sessionStorage.setItem('Track_Array', JSON.stringify(track_data));
      window.sessionStorage.setItem('Track_Array_Size', track_data.length);
    }
  };

  useEffect(() => {
    get_User();
    fetchData();
  }, []);

  return (
    <div className="w-full p-12 dark:text-white">
      <div
        className={`${
          darkMode && 'dark'
        }  grid sm:grid-cols-1 lg:grid-cols-3 grid-flow-row pb-50  mt-10 lg:ml-12  bg-gradient-to-b from-blue-50 via-blue-50 to-white  dark:bg-gradient-to-b dark:from-dbeats-dark-secondary  dark:to-dbeats-dark-primary`}
      >
        <div className=" lg:col-span-2 dark:bg-dbeats-dark-alt h-screen text-black   dark:text-white">
          <div className="pl-7 pt-5">
            {userData ? (
              <>
                <p className="overflow-ellipsis  w-full max-w-full mt-0 mb-1 md:mb-2 drop-shadow xl:text-3xl  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                  {userData.tracks[track_id].trackName}
                </p>
                <p className="mt-0  mb-1 md:mb-2   text-gray-600 tracking-widest  text-lg flex font-semibold">
                  {userData.username}
                </p>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="self-center lg:px-8 lg:w-full lg:mt-3 mt-0.5">
            {userData ? <AudioPlayer userData={userData.tracks[track_id]} /> : <></>}
          </div>
        </div>
        <div className="  w-full col-span-1 px-5 lg:pt-3 dark:bg-dbeats-dark-secondary text-black  dark:text-white">
          <div className=" w-full  grid grid-cols-1 grid-flow-row gap-3  ">
            {arrayData.map((value, index) => {
              let trackid = value.tracks.length - 1;
              console.log(value.username, ' ', value.tracks.length, '=', trackid);
              return (
                <div key={index}>
                  <TrackCard
                    track={value.tracks[trackid]}
                    index={trackid}
                    username={value.username}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackInfo;