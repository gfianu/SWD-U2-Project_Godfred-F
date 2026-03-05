import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import convertDriveUrl from "../utils/convertDriveUrl";
import Comments from "../components/Comments";
import "../styles/LectureVideos.css";

export default function LectureVideos() {
  const { lecture } = useOutletContext();

  const title = lecture?.title || "Lecture";
  const videos = lecture?.videos ?? [];

  // Track lecture activity
  useEffect(() => {
    if (lecture?.id) {
      localStorage.setItem(`activity_${lecture.id}`, "Viewed Videos");
    }
  }, [lecture?.id]);

  return (
    <section className="lecture-videos">
      <h2>Videos — {title}</h2>

      {videos.length === 0 ? (
        <p className="muted">No videos available for this topic yet.</p>
      ) : (
        <ul className="video-list">
          {videos.map((video) => (
            <li
              key={video.id}
              className="video-item"
              style={{ marginBottom: "2rem", listStyle: "none" }}
            >
              <h3>{video.name}</h3>

              <div className="video-wrapper">
                <iframe
                  src={convertDriveUrl(video.url)}
                  title={video.name}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Comments for this video */}
              <Comments
                videoId={video.id}
                lectureTitle={lecture?.title || ""}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
