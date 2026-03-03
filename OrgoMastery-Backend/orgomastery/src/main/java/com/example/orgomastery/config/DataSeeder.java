// src/main/java/com/example/orgomastery/config/DataSeeder.java
package com.example.orgomastery.config;

import com.example.orgomastery.model.*;
import com.example.orgomastery.repository.LectureRepository;
import com.example.orgomastery.repository.QuizRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;

import java.io.InputStream;
import java.util.*;

@Component
public class DataSeeder implements CommandLineRunner {

    private final LectureRepository lectureRepository;
    private final QuizRepository quizRepository;
    private final ObjectMapper objectMapper;

    public DataSeeder(LectureRepository lectureRepository, QuizRepository quizRepository, ObjectMapper objectMapper) {
        this.lectureRepository = lectureRepository;
        this.quizRepository = quizRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {

        // Seed only if empty
        if (lectureRepository.count() > 0) {
            System.out.println("ℹ️ Seed skipped (lectures already exist).");
            return;
        }

        // 1) Load lectures + videos
        List<LectureSeed> lectureSeeds = readJson("seed/lectures.json", new TypeReference<>() {});
        Map<String, Lecture> lectureByTitle = new HashMap<>();

        int lectureOrder = 1;
        for (LectureSeed ls : lectureSeeds) {
            Lecture lecture = new Lecture(ls.title);
            lecture.setOrderIndex(lectureOrder++);

            if (ls.videos != null) {
                int videoOrder = 1;
                for (VideoSeed vs : ls.videos) {
                    LectureVideo v = new LectureVideo(vs.name, vs.url);
                    v.setOrderIndex(videoOrder++);
                    lecture.addVideo(v);
                }
            }

            Lecture saved = lectureRepository.save(lecture);
            lectureByTitle.put(saved.getTitle().trim(), saved);
        }

        // 2) Load notes and attach to lectures
        List<NotesSeed> notesSeeds = readJson("seed/notes.json", new TypeReference<>() {});
        for (NotesSeed ns : notesSeeds) {
            Lecture lecture = lectureByTitle.get(ns.title.trim());
            if (lecture == null) {
                System.out.println("⚠️ Notes skipped (no lecture found): " + ns.title);
                continue;
            }

            if (ns.notes != null) {
                int noteOrder = 1;
                for (NoteSeed note : ns.notes) {
                    LectureNote ln = new LectureNote(note.name, note.noteUrl, note.keyUrl);
                    ln.setOrderIndex(noteOrder++);
                    lecture.addNote(ln);
                }
                lectureRepository.save(lecture);
            }
        }

        // 3) Load quizzes + questions (map correct TEXT -> A/B/C/D)
        List<QuizSeed> quizSeeds = readJson("seed/quizzes.json", new TypeReference<>() {});

        for (QuizSeed qs : quizSeeds) {
            Lecture lecture = lectureByTitle.get(qs.title.trim());
            if (lecture == null) {
                System.out.println("⚠️ Quiz skipped (no lecture found): " + qs.title);
                continue;
            }

            // Support multiple quizzes per lecture: give them unique titles if needed
            // If your JSON quiz already has a distinct title, you can use qs.quizTitle instead.
            String quizTitle = qs.topic != null && !qs.topic.isBlank()
                    ? qs.topic + " — Quiz"
                    : lecture.getTitle() + " — Quiz";

            Quiz quiz = new Quiz(quizTitle, qs.description);
            quiz.setLecture(lecture);
            quiz.setPublished(true);

            if (qs.questions != null) {
                int qOrder = 1;
                for (QuizQuestionSeed qq : qs.questions) {
                    if (qq.options == null || qq.options.size() != 4) {
                        throw new IllegalStateException("Quiz question must have exactly 4 options: " + qq.question);
                    }

                    String correctChoice = mapCorrectTextToLetter(qq.options, qq.correct);

                    Question q = new Question();
                    q.setPrompt(qq.question);
                    q.setChoiceA(qq.options.get(0));
                    q.setChoiceB(qq.options.get(1));
                    q.setChoiceC(qq.options.get(2));
                    q.setChoiceD(qq.options.get(3));
                    q.setCorrectChoice(correctChoice);
                    q.setOrderIndex(qOrder++);
                    q.setQuiz(quiz);

                    quiz.addQuestion(q); // assumes your Quiz has addQuestion()
                }
            }

            quizRepository.save(quiz);
        }

        System.out.println("✅ Full seed complete: lectures + videos + notes + quizzes + questions.");
    }

    // ---------- helpers ----------

    private <T> T readJson(String path, TypeReference<T> type) throws Exception {
        ClassPathResource resource = new ClassPathResource(path);
        try (InputStream in = resource.getInputStream()) {
            return objectMapper.readValue(in, type);
        }
    }

    private String mapCorrectTextToLetter(List<String> options, String correctText) {
        if (correctText == null) {
            throw new IllegalStateException("Correct answer is missing.");
        }

        int idx = options.indexOf(correctText);
        if (idx == -1) {
            throw new IllegalStateException("Correct answer text not found in options. correct=" +
                    correctText + " options=" + options);
        }

        return switch (idx) {
            case 0 -> "A";
            case 1 -> "B";
            case 2 -> "C";
            case 3 -> "D";
            default -> throw new IllegalStateException("Invalid correct option index: " + idx);
        };
    }

    // ---------- Seed POJOs (match JSON structure) ----------

    static class LectureSeed {
        public int id;
        public String title;
        public List<VideoSeed> videos;
    }

    static class VideoSeed {
        public int id;
        public String name;
        public String url;
    }

    static class NotesSeed {
        public int id;
        public String title;
        public List<NoteSeed> notes;
    }

    static class NoteSeed {
        public int id;
        public String name;
        public String noteUrl;
        public String keyUrl;
    }

    static class QuizSeed {
        public int id;
        public String title;       // lecture title (in your JS this equals lecture title)
        public String topic;       // optional
        public String description;
        public List<QuizQuestionSeed> questions;
    }

    static class QuizQuestionSeed {
        public String question;
        public List<String> options;
        public String correct;     // correct answer TEXT
    }
}
