package com.example.orgomastery.config;

import com.example.orgomastery.model.*;
import com.example.orgomastery.repository.LectureRepository;
import com.example.orgomastery.repository.QuizRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final LectureRepository lectureRepository;
    private final QuizRepository quizRepository;

    public DataSeeder(LectureRepository lectureRepository, QuizRepository quizRepository) {
        this.lectureRepository = lectureRepository;
        this.quizRepository = quizRepository;
    }

    @Override
    public void run(String... args) {
        // Seed only if empty
        if (lectureRepository.count() > 0) return;

        // -------------------------
        // LECTURE 1
        // -------------------------
        Lecture lec1 = new Lecture("A Review of General Chemistry");
        lec1.setOrderIndex(1);

        // Videos
        lec1.addVideo(new LectureVideo(
                "A Review of General Chemistry_1",
                "https://drive.google.com/file/d/1-6OqpqQdbuXS3wlNpKbiy5N9t-XMDhhw/view?usp=sharing"
        ));
        lec1.getVideos().get(0).setOrderIndex(1);

        lec1.addVideo(new LectureVideo(
                "A Review of General Chemistry_2",
                "https://drive.google.com/file/d/1pWipQ9xGlwn16QU5wE9-SNJAtsf9-Pvc/view?usp=drive_link"
        ));
        lec1.getVideos().get(1).setOrderIndex(2);

        // Notes
        LectureNote n1 = new LectureNote(
                "A Review of General Chemistry_1",
                "https://drive.google.com/file/d/1mxH3WO52qC3H-ruLGpQNt30zUJfVTAH9/view?usp=sharing",
                "https://drive.google.com/file/d/1lv55ounkVkxM76LTeCkHedQsiUlIGLVt/view?usp=sharing"
        );
        n1.setOrderIndex(1);
        lec1.addNote(n1);

        // Save lecture first (cascades videos/notes)
        lec1 = lectureRepository.save(lec1);

        // Quiz 1 (linked to lecture)
        Quiz q1 = new Quiz(
                "Gen Chem Foundations — Quiz A",
                "Check your foundation in key general chemistry ideas that support organic chemistry."
        );
        q1.setLecture(lec1);
        q1.setPublished(true);

        // Questions
        Question q1a = new Question(
                "Which subatomic particles are found in the nucleus of an atom?",
                "Protons and electrons",
                "Protons and neutrons",
                "Neutrons and electrons",
                "Electrons only",
                "B"
        );
        q1a.setOrderIndex(1);
        q1.addQuestion(q1a);

        Question q1b = new Question(
                "Which element is the most electronegative?",
                "Oxygen",
                "Fluorine",
                "Nitrogen",
                "Chlorine",
                "B"
        );
        q1b.setOrderIndex(2);
        q1.addQuestion(q1b);

        quizRepository.save(q1);

        // -------------------------
        // LECTURE 2
        // -------------------------
        Lecture lec2 = new Lecture("Molecular Representations");
        lec2.setOrderIndex(2);

        lec2.addVideo(new LectureVideo(
                "Molecular Representations_1",
                "https://drive.google.com/file/d/15Lzyfp_TZfFI5iFLG7RcGFQHC2H7kPih/view?usp=drive_link"
        ));
        lec2.getVideos().get(0).setOrderIndex(1);

        LectureNote n2 = new LectureNote(
                "Molecular Representations_1",
                "https://drive.google.com/file/d/1_1Bm17jFXW-vQhcj20d2Sqqpz84vYg97/view?usp=drive_link",
                "https://drive.google.com/file/d/1xV8TqMIkqhZz1f9HBJW3oREzlxI0k4U8/view?usp=drive_link"
        );
        n2.setOrderIndex(1);
        lec2.addNote(n2);

        lec2 = lectureRepository.save(lec2);

        Quiz q2 = new Quiz(
                "Molecular Representations — Quiz A",
                "Practice reading and drawing condensed, Lewis, and line-angle structures."
        );
        q2.setLecture(lec2);
        q2.setPublished(true);

        Question q2a = new Question(
                "Which representation shows ALL atoms and bonds explicitly?",
                "Line-angle formula",
                "Condensed formula",
                "Skeletal structure",
                "Lewis structure",
                "D"
        );
        q2a.setOrderIndex(1);
        q2.addQuestion(q2a);

        quizRepository.save(q2);

        System.out.println("✅ Seeded OrgoMastery data (lectures, videos, notes, quizzes, questions).");
    }
}
