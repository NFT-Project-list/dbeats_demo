import Playback from "./Info/Playback_Info";

const PlaybackRoomPage = (props) => {
  return (
    <>
      <div id="outer-container" style={{ height: "100%" }}>
        <main id="page-wrap">
          <Playback
            stream_id={props.match.params.username}
            video_id={props.match.params.video_id}
          />
        </main>
      </div>
    </>
  );
};

export default PlaybackRoomPage;