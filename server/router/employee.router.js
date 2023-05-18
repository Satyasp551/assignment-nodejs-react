import express from 'express';
import { createEmployee, getEmployee, getEmployeeById } from "../controllers/employee.controller.js";

const router = express.Router();

router.get("/getEmployee", getEmployee);
router.post("/createEmployee" , createEmployee);
router.get("/:id", getEmployeeById);

export default router;