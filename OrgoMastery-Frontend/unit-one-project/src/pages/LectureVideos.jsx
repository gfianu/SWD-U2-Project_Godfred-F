import { useOutletContext } from "react-router-dom";
import convertDriveUrl from "../utils/convertDriveUrl";
import Comments from "../components/Comments";
import "../styles/LectureVideos.css";


export default function LectureVideos() {
  const { lecture } = useOutletContext();
  const videos = lecture.videos || [];

  return (
    <section>
      <h2>Videos — {lecture.title}</h2>

      {videos.length === 0 ? (
        <p className="muted">No videos available for this topic yet.</p>
      ) : (
        <ul className="video-list">
          {videos.map((v, idx) => (
            <li key={idx} style={{ marginBottom: "2rem", listStyle: "none" }}>
              <h3>{v.name}</h3>

              <div className="video-wrapper">
                <iframe
                  src={convertDriveUrl(v.url)}
                  title={v.title}
                  allowFullScreen
                />
              </div>

              {/* Comments for this video */}
              <Comments videoId={idx} lectureTitle={lecture.title} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
