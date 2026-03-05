import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import convertDriveUrl from "../utils/convertDriveUrl";
import Comments from "../components/Comments";
import "../styles/LectureVideos.css";

export default function LectureVideos() {
  const { lecture } = useOutletContext();
  const title = lecture?.title || "Lecture";
  const videos = lecture?.videos ?? [];

  // Track activity
  useEffect(() => {
    if (lecture?.title) {
      localStorage.setItem(`activity_${lecture.title}`, "Viewed Videos");
    }
  }, [lecture?.title]);

  return (
    <section>
      <h2>Videos — {title}</h2>

      {videos.length === 0 ? (
        <p className="muted">No videos available for this topic yet.</p>
      ) : (
        <ul className="video-list">
          {videos.map((v) => (
            <li key={v.id} style={{ marginBottom: "2rem", listStyle: "none" }}>
              <h3>{v.name}</h3>

              <div className="video-wrapper">
                <iframe
                  src={convertDriveUrl(v.url)}
                  title={v.name}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Comments for this video */}
              <Comments videoId={v.id} lectureTitle={lecture?.title || ""} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
