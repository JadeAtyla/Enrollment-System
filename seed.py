from app.models import Course

def run():
    # BSCS Courses

    # year_level and semester legend:
    # 1 = 1st Year/Semester
    # 2 = 2nd Year/Semester
    # 3 = 3rd Year
    # 4 = 4th Year
    # 0 = Mid Year

    bscs_courses = [
        # First Year First Semester
        {"code": "GNED 02", "title": "Ethics", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 1, "semester": 1, "program": "BSCS"},
        {"code": "GNED 05", "title": "Purposive Communication", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 1, "semester": 1, "program": "BSCS"},
        {"code": "GNED 11", "title": "Kontekstwalisadong Komunikasyon sa Filipino", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 1, "semester": 1, "program": "BSCS"},
        {"code": "COSC 50", "title": "Discrete Structures I", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 1, "semester": 1, "program": "BSCS"},
        {"code": "DCIT 21", "title": "Introduction to Computing", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 6, "year_level": 1, "semester": 1, "program": "BSCS"},
        {"code": "DCIT 22", "title": "Computer Programming I", "lec_units": 1, "lab_units": 2, "contact_hr_lec": 1, "contact_hr_lab": 3, "year_level": 1, "semester": 1, "program": "BSCS"},
        {"code": "FITT 1", "title": "Movement Enhancement", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 1, "semester": 1, "program": "BSCS"},
        {"code": "NSTP 1", "title": "National Service Training Program 1", "lec_units": 2, "lab_units": 0, "contact_hr_lec": 2, "contact_hr_lab": 0, "year_level": 1, "semester": 1, "program": "BSCS"},
        {"code": "CvSU 101", "title": "Institutional Orientation", "lec_units": 1, "lab_units": 0, "contact_hr_lec": 1, "contact_hr_lab": 0, "year_level": 1, "semester": 1, "program": "BSCS"},
        
        # First Year Second Semester
        {"code": "GNED 01", "title": "Art Appreciation", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 1, "semester": 2, "program": "BSCS"},
        {"code": "GNED 03", "title": "Mathematics in the Modern World", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 1, "semester": 2, "program": "BSCS"},
        {"code": "GNED 06", "title": "Science, Technology and Society", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 1, "semester": 2, "program": "BSCS"},
        {"code": "GNED 12", "title": "Dalumat Ng/Sa Filipino", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 1, "semester": 2, "program": "BSCS"},
        {"code": "DCIT 23", "title": "Computer Programming II", "lec_units": 1, "lab_units": 2, "contact_hr_lec": 1, "contact_hr_lab": 6, "year_level": 1, "semester": 2, "program": "BSCS"},
        {"code": "ITEC 50", "title": "Web Systems and Technologies", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 1, "semester": 2, "program": "BSCS"},
        {"code": "FITT 2", "title": "Fitness Exercises", "lec_units": 2, "lab_units": 0, "contact_hr_lec": 2, "contact_hr_lab": 0, "year_level": 1, "semester": 2, "program": "BSCS"},
        {"code": "NSTP 2", "title": "National Service Training Program 2", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 1, "semester": 2, "program": "BSCS"},
        
        # Second Year First Semester
        {"code": "GNED 04", "title": "Mga Babasahin Hinggil sa Kasaysayan ng Pilipinas", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 2, "semester": 1, "program": "BSCS"},
        {"code": "MATH 1", "title": "Analytic Geometry", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 2, "semester": 1, "program": "BSCS"},
        {"code": "COSC 55", "title": "Discrete Structures II", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 2, "semester": 1, "program": "BSCS"},
        {"code": "COSC 60", "title": "Digital Logic Design", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 2, "semester": 1, "program": "BSCS"},
        {"code": "DCIT 50", "title": "Object Oriented Programming", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 2, "semester": 1, "program": "BSCS"},
        {"code": "DCIT 24", "title": "Information Management", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 2, "semester": 1, "program": "BSCS"},
        {"code": "INSY 50", "title": "Fundamentals of Information Systems", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 2, "semester": 1, "program": "BSCS"},
        {"code": "FITT 3", "title": "Physical Activities towards Health and Fitness", "lec_units": 1, "lab_units": 2, "contact_hr_lec": 0, "contact_hr_lab": 2, "year_level": 2, "semester": 1, "program": "BSCS"},
        
        # Second Year Second Semester
        {"code": "GNED 08", "title": "Understanding the Self", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 2, "semester": 2, "program": "BSCS"},
        {"code": "GNED 14", "title": "Panitikang Panlipunan", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 2, "semester": 2, "program": "BSCS"},
        {"code": "MATH 2", "title": "Calculus", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 2, "semester": 2, "program": "BSCS"},
        {"code": "COSC 65", "title": "Architecture and Organization", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 2, "semester": 2, "program": "BSCS"},
        {"code": "COSC 70", "title": "Software Engineering I", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 2, "semester": 2, "program": "BSCS"},
        {"code": "DCIT 25", "title": "Data Structures and Algorithms", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 2, "semester": 2, "program": "BSCS"},
        {"code": "DCIT 55", "title": "Advanced Database Management System", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 2, "semester": 2, "program": "BSCS"},
        {"code": "FITT 4", "title": "Physical Activities towards Health and Fitness 2", "lec_units": 2, "lab_units": 2, "contact_hr_lec": 0, "contact_hr_lab": 2, "year_level": 2, "semester": 2, "program": "BSCS"},
        
        # Third Year First Semester
        {"code": "MATH 3", "title": "Linear Algebra", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 3, "semester": 1, "program": "BSCS"},
        {"code": "COSC 75", "title": "Software Engineering II", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 3, "semester": 1, "program": "BSCS"},
        {"code": "COSC 80", "title": "Operating Systems", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 3, "semester": 1, "program": "BSCS"},
        {"code": "COSC 85", "title": "Networks and Communication", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 3, "semester": 1, "program": "BSCS"},
        {"code": "COSC 101", "title": "CS Elective 1 (Computer Graphics and Visual Computing)", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 3, "semester": 1, "program": "BSCS"},
        {"code": "DCIT 26", "title": "Applications Dev't and Emerging Technologies", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 3, "semester": 1, "program": "BSCS"},
        {"code": "DCIT 65", "title": "Social and Professional Issues", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 3, "semester": 1, "program": "BSCS"},
        
        # Third Year Second Semester
        {"code": "GNED 09", "title": "Life and Works of Rizal", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 3, "semester": 2, "program": "BSCS"},
        {"code": "MATH 4", "title": "Experimental Statistics", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 3, "semester": 2, "program": "BSCS"},
        {"code": "COSC 90", "title": "Design and Analysis of Algorithm", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 3, "semester": 2, "program": "BSCS"},
        {"code": "COSC 95", "title": "Programming Languages", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 3, "semester": 2, "program": "BSCS"},
        {"code": "COSC 106", "title": "CS Elective 2 (Introduction to Game Development)", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 3, "semester": 2, "program": "BSCS"},
        {"code": "DCIT 60", "title": "Methods of Research", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 3, "semester": 2, "program": "BSCS"},
        {"code": "ITEC 85", "title": "Information Assurance and Security", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 3, "semester": 2, "program": "BSCS"},
        
        # Mid Year
        {"code": "COSC 199", "title": "Practicum (240 hours)", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 0, "contact_hr_lab": 0, "year_level": 0, "semester": 0, "program": "BSCS"},
        
        # Fourth Year First Semester
        {"code": "ITEC 80", "title": "Human Computer Interaction", "lec_units": 1, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 4, "semester": 1, "program": "BSCS"},
        {"code": "COSC 100", "title": "Automata Theory and Formal Languages", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 4, "semester": 1, "program": "BSCS"},
        {"code": "COSC 105", "title": "Intelligent Systems", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 4, "semester": 1, "program": "BSCS"},
        {"code": "COSC 111", "title": "CS Elective 3 (Internet of Things)", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 4, "semester": 1, "program": "BSCS"},
        {"code": "COSC 200A", "title": "Undergraduate Thesis I", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 1, "contact_hr_lab": 0, "year_level": 4, "semester": 1, "program": "BSCS"},

        # Fourth Year Second Semester
        {"code": "GNED 07", "title": "The Contemporary World", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 4, "semester": 1, "program": "BSCS"},
        {"code": "GNED 10", "title": "Gender and Society", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 4, "semester": 1, "program": "BSCS"},
        {"code": "COSC 110", "title": "Numerical and Symbolic Computation", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 4, "semester": 1, "program": "BSCS"},
        {"code": "COSC 200B", "title": "Undergraduate Thesis II", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 1, "contact_hr_lab": 0, "year_level": 4, "semester": 1, "program": "BSCS"},
    ]

    bsit_courses = [
        # First Year First Semester
        {"code": "GNED 02", "title": "Ethics", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 1, "semester": 1, "program": "BSIT"},
        {"code": "GNED 05", "title": "Purposive Communication", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 1, "semester": 1, "program": "BSIT"},
        {"code": "GNED 11", "title": "Kontekstwalisadong Komunikasyon sa Filipino", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 1, "semester": 1, "program": "BSIT"},
        {"code": "COSC 50", "title": "Discrete Structure", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 1, "semester": 1, "program": "BSIT"},
        {"code": "DCIT 21", "title": "Introduction to Computing", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 1, "semester": 1, "program": "BSIT"},
        {"code": "DCIT 22", "title": "Computer Programming 1", "lec_units": 1, "lab_units": 2, "contact_hr_lec": 1, "contact_hr_lab": 6, "year_level": 1, "semester": 1, "program": "BSIT"},
        {"code": "FITT 1", "title": "Movement Enhancement", "lec_units": 2, "lab_units": 0, "contact_hr_lec": 2, "contact_hr_lab": 0, "year_level": 1, "semester": 1, "program": "BSIT"},
        {"code": "NSTP 1", "title": "National Service Training Program 1", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 1, "semester": 1, "program": "BSIT"},
        {"code": "ORNT 1", "title": "Institutional Orientation", "lec_units": 0, "lab_units": 1, "contact_hr_lec": 0, "contact_hr_lab": 0, "year_level": 1, "semester": 1, "program": "BSIT"},
        
        # First Year Second Semester
        {"code": "GNED 01", "title": "Arts Appreciation", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 1, "semester": 2, "program": "BSIT"},
        {"code": "GNED 06", "title": "Science, Technology and Society", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 1, "semester": 2, "program": "BSIT"},
        {"code": "GNED 12", "title": "Dalumat Ng/Sa Filipino", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 1, "semester": 2, "program": "BSIT"},
        {"code": "GNED 03", "title": "Mathematics in the Modern World", "lec_units": 3, "lab_units": 0, "contact_hr_le c": 3, "contact_hr_lab": 0, "year_level": 1, "semester": 2, "program": "BSIT"},
        {"code": "DCIT 23", "title": "Computer Programming 2", "lec_units": 1, "lab_units": 2, "contact_hr_lec": 1, "contact_hr_lab": 6, "year_level": 1, "semester": 2, "program": "BSIT"},
        {"code": "ITEC 50", "title": "Web System and Technologies 1", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 1, "semester": 2, "program": "BSIT"},
        {"code": "FITT 2", "title": "Fitness Exercise", "lec_units": 2, "lab_units": 0, "contact_hr_lec": 2, "contact_hr_lab": 0, "year_level": 1, "semester": 2, "program": "BSIT"},
        {"code": "NSTP 2", "title": "National Service Training Program 2", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 1, "semester": 2, "program": "BSIT"},
        
        # Second Year First Semester
        {"code": "GNED 04", "title": "Mga Babasahin Hinggil sa Kasaysayan ng Pilipinas", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 2, "semester": 1, "program": "BSIT"},
        {"code": "GNED 07", "title": "The Contemporary World", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 2, "semester": 1, "program": "BSIT"},
        {"code": "GNED 10", "title": "Gender and Society", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 2, "semester": 1, "program": "BSIT"},
        {"code": "GNED 14", "title": "Panitikang Panlipunan", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 2, "semester": 1, "program": "BSIT"},
        {"code": "ITEC 55", "title": "Platform Technologies", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 2, "semester": 1, "program": "BSIT"},
        {"code": "DCIT 24", "title": "Information Management", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 2, "semester": 1, "program": "BSIT"},
        {"code": "DCIT 50", "title": "Object Oriented Programming", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 2, "semester": 1, "program": "BSIT"},
        {"code": "FITT 3", "title": "Physical Activities towards Health and Fitness I", "lec_units": 2, "lab_units": 0, "contact_hr_lec": 2, "contact_hr_lab": 0, "year_level": 2, "semester": 1, "program": "BSIT"},
        
        # Second Year Second Semester
        {"code": "GNED 08", "title": "Understanding the Self", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 2, "semester": 2, "program": "BSIT"},
        {"code": "DCIT 25", "title": "Data Structures and Algorithms", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 2, "semester": 2, "program": "BSIT"},
        {"code": "ITEC 60", "title": "Integrated Programming and Technologies 1", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 2, "semester": 2, "program": "BSIT"},
        {"code": "ITEC 65", "title": "Open Source Technology", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 2, "semester": 2, "program": "BSIT"},
        {"code": "DCIT 55", "title": "Advanced Database System", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 2, "semester": 2, "program": "BSIT"},
        {"code": "ITEC 70", "title": "Multimedia Systems", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 2, "semester": 2, "program": "BSIT"},
        {"code": "FITT 4", "title": "Physical Activities towards Health and Fitness II", "lec_units": 2, "lab_units": 0, "contact_hr_lec": 2, "contact_hr_lab": 0, "year_level": 2, "semester": 2, "program": "BSIT"},
        
        # Mid Year
        {"code": "STAT 2", "title": "Applied Statistics", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 0, "semester": 0, "program": "BSIT"},
        {"code": "ITEC 75", "title": "System Integration and Architecture 1", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 0, "semester": 0, "program": "BSIT"},

        # Third Year First Semester
        {"code": "ITEC 80", "title": "Introduction to Human Computer Interaction", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 3, "semester": 1, "program": "BSIT"},
        {"code": "ITEC 85", "title": "Information Assurance and Security 1", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 3, "semester": 1, "program": "BSIT"},
        {"code": "ITEC 90", "title": "Network Fundamentals", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 3, "semester": 1, "program": "BSIT"},
        {"code": "INSY 55", "title": "System Analysis and Design", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 3, "semester": 1, "program": "BSIT"},
        {"code": "DCIT 26", "title": "Application Development and Emerging Technologies", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 3, "semester": 1, "program": "BSIT"},
        {"code": "DCIT 60", "title": "Methods of Research", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 3, "semester": 1, "program": "BSIT"},
        
        # Third Year Second Semester
        {"code": "GNED 09", "title": "Rizal: Life, Works, and Writings", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 3, "semester": 2, "program": "BSIT"},
        {"code": "ITEC 95", "title": "Quantitative Methods (Modeling & Simulation)", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 3, "semester": 2, "program": "BSIT"},
        {"code": "ITEC 101", "title": "IT ELECTIVE 1 (Human Computer Interaction 2)", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 3, "semester": 2, "program": "BSIT"},
        {"code": "ITEC 106", "title": "IT ELECTIVE 2 (Web System and Technologies 2)", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 3, "semester": 2, "program": "BSIT"},
        {"code": "ITEC 100", "title": "Information Assurance and Security 2", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 3, "semester": 2, "program": "BSIT"},
        {"code": "ITEC 105", "title": "Network Management", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 3, "semester": 2, "program": "BSIT"},
        {"code": "ITEC 200A", "title": "Capstone Project and Research 1", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 3, "semester": 2, "program": "BSIT"},
        
        # Fourth Year First Semester
        {"code": "ITEC 200B", "title": "Capstone Project and Research 2", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 4, "semester": 1, "program": "BSIT"},
        {"code": "DCIT 65", "title": "Social and Professional Issues", "lec_units": 3, "lab_units": 0, "contact_hr_lec": 3, "contact_hr_lab": 0, "year_level": 4, "semester": 1, "program": "BSIT"},
        {"code": "ITEC 111", "title": "IT ELECTIVE 3 (Integrated Programming and Technologies 2)", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 4, "semester": 1, "program": "BSIT"},
        {"code": "ITEC 116", "title": "IT ELECTIVE 4 (Systems Integration and Architecture 2)", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 4, "semester": 1, "program": "BSIT"},
        {"code": "ITEC 110", "title": "Systems Administration and Maintenance", "lec_units": 2, "lab_units": 1, "contact_hr_lec": 2, "contact_hr_lab": 3, "year_level": 4, "semester": 1, "program": "BSIT"},
        
        # Fourth Year Second Semester
        {"code": "ITEC 199", "title": "Practicum (minimum 486 hours)", "lec_units": 6, "lab_units": 0, "contact_hr_lec": 0, "contact_hr_lab": 0, "year_level": 4, "semester": 2, "program": "BSIT"},
    ]

    for course in bscs_courses:
        Course.objects.create(**course)
    for course in bsit_courses:
        Course.objects.create(**course)

# Ensure to run this script to populate the database with the complete course list for the BSCS program.