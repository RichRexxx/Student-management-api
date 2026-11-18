import express from "express";
import { registerStudent, getAllStudents, getStudentById,  searchStudentsByName, updateStudent, deleteStudent } from "./controller/student.js";

const app = express();
app.use(express.json());

app.post("/api/students", registerStudent);
 app.get("/api/students", getAllStudents);
 app.get("/api/students/search", searchStudentsByName);
 app.get("/api/students/:id", getStudentById);
 app.put("/api/students/:id", updateStudent);
app.delete("/api/students/:id", deleteStudent);
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`Server running on Port ${PORT}`);
});