use('enrollment_system')

// User collection
db.createCollection("user", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "username", "password", "role_id"],
      properties: {
        _id: { bsonType: "string"},
        first_name: { bsonType: "string" },
        last_name: { bsonType: "string" },
        middle_name: { bsonType: "string" },
        suffix: { bsonType: "string" },
        email: { bsonType: "string", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" },
        contact_number: { bsonType: "string", pattern: "^(\+63|0)(2\d{8}|9\d{9})$" },
        username: { bsonType: "string", pattern: "^(([A-Za-z][A-Za-z0-9@._-]{7,})|(((18|19|20)\d{2})(10|11)\d{3}))$", description: "must start with a letter and content must be 8 letters above. for students, you must use your student id/number." },
        password: { bsonType: "string", pattern: "^[\x21-\x7E]{8,}$", description: "must contain letters and numbers. contents should be more than 8 in length." },
        role_id: { bsonType: "string", pattern: "^ROLE\d+$" }
      }
    }
  }
});

// Program collection
db.createCollection("program", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "abbreviation"],
      properties: {
        _id: { bsonType: "string", pattern: "^PROG\d+$"},
        abbreviation: { bsonType: "string", enum: ["BSIT", "BSCS"]},
        description: { bsonType: "string" }
      }
    }
  }
});

// Address collection
db.createCollection("address", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "city", "province"],
      properties: {
        _id: { bsonType: "string"},
        street: { bsonType: "string" },
        barangay: { bsonType: "string" },
        city: { bsonType: "string" },
        province: { bsonType: "string" }
      }
    }
  }
});

// Student collection
db.createCollection("student", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "first_name", "last_name", "old_or_new", "gender", "classification", "program_id"],
      properties: {
        _id: { bsonType: "string", pattern: "^((18|19|20)\d{2})(10|11)\d{3}$"},
        first_name: { bsonType: "string" },
        last_name: { bsonType: "string" },
        middle_name: { bsonType: "string" },
        suffix: { bsonType: "string" },
        year_level: { bsonType: "int" },
        section: { bsonType: "int" },
        program_id: { bsonType: "string"},
        address_id: { bsonType: "string"},
        old_or_new: { bsonType: "string", enum: ["OLD", "NEW"] },
        classification: { bsonType: "string", enum: ["REGULAR", "IRREGULAR", "TRANSFEREE", "RETURNEE", "NEW_STUDENT"] },
        birth_date: { bsonType: "date" },
        gender: { bsonType: "string", enum: ["MALE", "FEMALE", "PREFER_NOT_TO_SAY"] },
        contact_number: { bsonType: "string", pattern: "^(\+63|0)(2\d{8}|9\d{9})$" },
        email: { bsonType: "string", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" }
      }
    }
  }
});

// Instructor collection
db.createCollection("instrutor", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "first_name", "last_name"],
      properties: {
        _id: { bsonType: "string"},
        first_name: { bsonType: "string" },
        last_name: { bsonType: "string" },
        middle_name: { bsonType: "string" },
        suffix: { bsonType: "string" },
        email: { bsonType: "string", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" },
        contact_number: { bsonType: "string", pattern: "^(\+63|0)(2\d{8}|9\d{9})$" }
      }
    }
  }
});

// Course collection
db.createCollection("course", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "code", "program_id", "title", "year_level", "semester", "school_year", ],
      properties: {
        _id: { bsonType: "string", pattern: "^[A-Z]{4}(\d{2,3}[A-Z]?)$" },
        code: { bsonType: "string", pattern: "^[A-Z]{4}\d{1,3}[A-Z]?$" },
        program_id: { bsonType: "string", pattern: "^PROG\d+$" },
        title: { bsonType: "string" },
        lab_units: { bsonType: "int" },
        lec_units: { bsonType: "int" },
        total_units: { bsonType: "int" },
        year_level: { bsonType: "int" },
        semester: { bsonType: "int" },
        school_year: { bsonType: "string", pattern: "^(19|20)\d{2}-(19|20)\d{2}$" },
        pre_requisite: { bsonType: "string", pattern: "^[A-Z]{4}\d{1,3}[A-Z]?$" }
      }
    }
  }
});

// Enrollment collection
db.createCollection("enrollment", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "course_id", "student_id", "enrollment_date", "status", "school_year"],
      properties: {
        _id: { bsonType: "string", pattern: "^ENRL\d+$" },
        course_id: { bsonType: "string", pattern: "^[A-Z]{4}\d{1,3}[A-Z]?$" },
        student_id: { bsonType: "long", pattern: "^((18|19|20)\d{2})(10|11)\d{3}$" },
        enrollment_date: { bsonType: "date" },
        status: { bsonType: "string", enum: ["ENROLLED", "WAITLISTED"] },
        school_year: { bsonType: "string", pattern: "^(19|20)\d{2}-(19|20)\d{2}$" },
        checked_by: { bsonType: "int" },
        released_by: { bsonType: "int" }
      }
    }
  }
});

// Grade collection
db.createCollection("grade", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "student_id", "course_id", "grade", "instructor_id"],
      properties: {
        _id: { bsonType: "int" },
        student_id: { bsonType: "long", pattern: "^((18|19|20)\d{2})(10|11)\d{3}$" },
        course_id: { bsonType: "string", pattern: "^[A-Z]{4}(\d{2,3}[A-Z]?)$" },
        grade: { bsonType: "decimal" },
        instructor_id: { bsonType: "int", pattern: "^INST\d+$" },
        remarks: { bsonType: "string", enum: ["PASSED", "FAILED", "INCOMPOLETE", "UNCONDITIONAL_FAILURE", "NOT_GRADED_YET"] }
      }
    }
  }
});

// Permission collection
db.createCollection("permission", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "permission"],
      properties: {
        _id: { bsonType: "string", pattern: "^PERM\d+$" },
        permission: { bsonType: "string" },
        description: { bsonType: "string" }
      }
    }
  }
});

// Role collection
db.createCollection("role", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "role"],
      properties: {
        _id: { bsonType: "string", pattern: "^ROLE\d+$" },
        role: { bsonType: "string", enum: ["ADMIN", "REGISTRAR", "DEPARTMENT", "STUDENT"] },
        description: { bsonType: "string" }
      }
    }
  }
});

// Role_Permission collection
db.createCollection("role_Permission", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["permission_id", "role_id"],
      properties: {
        permission_id: { bsonType: "string", pattern: "^PERM\d+$" },
        role_id: { bsonType: "string", pattern: "^ROLE\d+$" }
      }
    }
  }
});

db.createCollection("schedule", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "course_id", "instructor_id"],
      properties: {
        _id: {bsonType: "string", pattern: "^SCED\d+$"},
        course_id: { bsonType: "string", pattern: "^[A-Z]{4}(\d{2,3}[A-Z]?)$" }, 
        instructor_id: { bsonType: "string", pattern: "^INST\d+$" }, 
        from_time: { bsonType: "string" },
        to_time: { bsonType: "string" },
        category: { bsonType: "string", enum: ["LAB", "LEC"] },
        day: { bsonType: "string", enum: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"] },
        room:{ bsonType: "string" }
      }
    }
  }
});