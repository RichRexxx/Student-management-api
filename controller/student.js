import { db } from "../db/index.js";
import { studentTable } from "../db/schema.js";
import  { z } from "zod";
import { eq, and, ilike } from "drizzle-orm";

const studentBodySchema = z.object({
    fullName: z.string().min(2).max(100),
    email: z.string().email(),
    gender: z.string().min(3).max(10),
    dateOfBirth: z.string(),
    department: z.string().min(3).max(100),
    level: z.string().min(1).max(10),
    registrationNumber: z.string().min(2).max(50),
});

export async function registerStudent(req,res) {
    const result = studentBodySchema.safeParse(req.body);
    try {
        if (!result.success){
            return res.status(400).json({message: "Invalid student data"});
        }
        const newStudent = await db
        .insert(studentTable)
        .values(result.data)
        .returning();

        res.status(201).json({
            message: "Student registered sucessfully",
            student:newStudent[0],
        });
    } catch(error) {
        const dbError = error.cause || error;

        if (dbError.code === "23505") {
            return res.status(409).json({ message: "Email or registration number already exists"});
        } console.log(error);
        res.status(500).json({ message: " Server error, please try again later"});
    }
}

export async function getAllStudents(req, res) {
    try{
        const { department, level } = req.query;
        const conditions = [];
        if (department) {
            conditions.push(eq(studentTable.department, department));
        }
        if (level) {
            conditions.push(eq(studentTable.level, level));
    }
    const students = await db
    .select()
    .from(studentTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

    res.json({ count: students.length, students: students });
} catch(error) {
console.log(error);
res.status(500).json({message: "Server error, please try again later"});
    }
}

export async function getStudentById(req, res) {
    try {
        const studentId = Number(req.params.id);
        if(isNaN(studentId)) {
            return res.status(400).json({ message: "Invalid student ID"});
        }
        const result = await db
        .select()
        .from(studentTable)
        .where(eq(studentTable.id, studentId));

        if(result.length === 0) {
            return res.status(404).json({ message: "Student not found"});
        }
        res.json({ student: result[0] });
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Server error, please try again later"})
    }
}
export async function searchStudentsByName(req, res) {
    try{
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: "Please provide a valid name"});
        }
        const students = await db
        .select()
        .from(studentTable)
        .where(ilike(studentTable.fullName, `%${name}%`));
        res.json({count: students.length, students: students });
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: "Server error, please try again later"});
    }
}
export async function updateStudent(req, res) {
    const studentId = Number(req.params.id);
    const result = studentBodySchema.partial().safeParse(req.body);

    try{
        if(isNaN(studentId)) {
            return res.status(400).json({ message: "Invalid Student ID" });
        }
        if(!result.success || Object.keys(result.data).length === 0) {
            return res.status(400).json({ message: "Invalid Update data" });
        }
        const existing = await db
        .select()
        .from(studentTable)
        .where(eq(studentTable.id, studentId));

        if(existing.length === 0) {
            return res.status(404).json({ message: "Student not found"});
        }
        const updated = await db
        .update(studentTable)
        .set(result.data)
        .where(eq(studentTable.id, studentId))
        .returning();

        res.json({
            message: "Student updated successfully",
            student: updated[0],
        });
    } catch(error){
        const dbError = error.cause || error;

        if (dbError.code === "23505") {
            return res.status(409).json({ message: "Email or registration number already exists" });
        }
        console.log(error);
        res.status(500).json({ message: "Server error, please try again later" });

    }
}
export async function deleteStudent(req, res) {
    try{
        const studentId = Number(req.params.id);

        if(isNaN(studentId)) {
            return res.status(400).json({ message: "Invalid Student Id"});
        }
        const deleted = await db
        .delete(studentTable)
        .where(eq(studentTable.id, studentId))
        .returning();
        
        if(deleted.length === 0) {
             return res.status(404).json({ message: "Student not found"});
        }
        res.json({
            message: "Student deleted successfully",
            student: deleted[0],
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
}