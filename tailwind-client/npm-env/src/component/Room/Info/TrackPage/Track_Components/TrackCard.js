import React from 'react';

const TrackCard = (props) => {
  console.log(props);

  return (
    <div
      id="tracks-section"
      className={` text-gray-200   mx-auto  py-1 md:py-2 w-full px-2 my-0 group`}
    >
      {/* header */}
      <div className=" group ">
        <div className="bg-white py-3 group dark:bg-dbeats-dark-primary dark:text-blue-300 shadow-md  flex p-2  mx-auto  rounded-lg  w-full hover:scale-101 transform transition-all">
          <div className=" flex items-center h-26 w-30 md:h-max md:w-52 cursor-pointer mr-4">
            <div
              onClick={() => {
                window.sessionStorage.setItem('Track_Array', JSON.stringify(''));
                window.sessionStorage.setItem('Track_Array_Size', 0);
                window.location.href = `/track/${props.username}/${props.index}`;
              }}
            >
              <img
                id="album-artwork"
                src={props.track.trackImage}
                className="mx-auto p-3 w-full h-full rounded"
                alt=""
              ></img>
            </div>
          </div>

          <div className="flex flex-col justify-center m-0 p-0 w-full">
            <p
              id="song-title"
              className="w-full max-w-full mt-0 mb-1 drop-shadow xl:text-lg  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
            >
              {props.track.trackName}
            </p>

            <p id="song-author" className="mt-0  mb-1 md:mb-2 text-gray-600 text-md font-semibold">
              {props.username}&nbsp;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
