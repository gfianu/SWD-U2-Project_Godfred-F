import { Routes, Route } from "react-router-dom";
import "./App.css";

// Persistent layout
import Header from "./components/Header";
import Footer from "./components/Footer";

// Static pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Lecture system
import LectureList from "./components/LectureList";
import LectureTopicLayout from "./pages/LectureTopicLayout";
import LectureNotes from "./pages/LectureNotes";
import LectureVideos from "./pages/LectureVideos";
import LectureQuizzes from "./pages/LectureQuizzes";
import LectureDashboard from "./pages/LectureDashboard";

// Quizzes
import QuizPage from "./components/QuizPage";

// Data
import lecturesData from "./data/lecturesData";

function App() {
  return (
    <div id="body-container">
      <Header />
      <main>
        <Routes>
          {/* Landing pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Lecture list page */}
          <Route
            path="/lectures"
            element={<LectureList lectures={lecturesData} />}
          />

          {/* Topic layout with sidebar NavBar */}
          <Route path="/lectures/:id/*" element={<LectureTopicLayout />}>
            <Route index element={<LectureVideos />} /> {/* default = videos */}
            <Route path="notes" element={<LectureNotes />} />
            <Route path="videos" element={<LectureVideos />} />
            <Route path="quizzes" element={<LectureQuizzes />} />
            {/* nested quiz route */}
            <Route
              path="quizzes/:quizId"
              element={<QuizPage />}
            />
            <Route path="dashboard" element={<LectureDashboard />} />
          </Route>

        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
