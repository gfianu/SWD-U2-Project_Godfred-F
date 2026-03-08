import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InstructorDashboard from "./pages/InstructorDashboard";
import MyProgress from "./pages/MyProgress";

import LectureList from "./components/LectureList";
import LectureTopicLayout from "./pages/LectureTopicLayout";
import LectureNotes from "./pages/LectureNotes";
import LectureVideos from "./pages/LectureVideos";
import LectureQuizzes from "./pages/LectureQuizzes";
import LectureDashboard from "./pages/LectureDashboard";
import QuizPage from "./components/QuizPage";

import InstructorLectureManager from "./pages/InstructorLectureManager";
import InstructorQuestionManager from "./pages/InstructorQuestionManager";
import InstructorQuizAnalytics from "./pages/InstructorQuizAnalytics";

function App() {
  return (
    <div id="body-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/lectures" element={<LectureList />} />

          <Route path="/lectures/:id/*" element={<LectureTopicLayout />}>
            <Route index element={<LectureVideos />} />
            <Route path="notes" element={<LectureNotes />} />
            <Route path="videos" element={<LectureVideos />} />
            <Route path="quizzes" element={<LectureQuizzes />} />
            <Route path="quizzes/:quizId" element={<QuizPage />} />
            <Route path="dashboard" element={<LectureDashboard />} />
          </Route>

          <Route
            path="/progress"
            element={
              <ProtectedRoute>
                <MyProgress />
              </ProtectedRoute>
            }
          />

          <Route
            path="/instructor"
            element={
              <ProtectedRoute requireInstructor={true}>
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/instructor/lectures"
            element={
              <ProtectedRoute requireInstructor={true}>
                <InstructorLectureManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/instructor/questions"
            element={
              <ProtectedRoute requireInstructor={true}>
                <InstructorQuestionManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/instructor/analytics"
            element={
              <ProtectedRoute requireInstructor={true}>
                <InstructorQuizAnalytics />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
