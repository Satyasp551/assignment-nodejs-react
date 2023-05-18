import Employee from "../models/employee.model.js";


//Controller for creating an employee
export const createEmployee = async(req, res) => {
    try {
        const { name, email, dob, department, designation, salary, address } = req.body;
        const employee = new Employee({
            ...req.body
        });
        await employee.save();
        res.status(201).json({ success: true, data: employee });
    } catch (error) {
        console.log(error)
        res.status(500).send("Error while creating employee in database");
    }
}

//Controller to retrive all the employee from the database
export const getEmployee = async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    try {

        //Get employees with pagination
        const employees = await Employee.find()
        .skip((page - 1) * limit)
        .limit(limit);

        //Get total count of employees
        const totalEmployees = await Employee.countDocuments();

        if (!employees || employees.length === 0) {
            res.status(404).json({ success: false, error: "No employees found" });
        } else {
            res.status(200).json({ 
                success: true, 
                data: employees,
                pagination: {
                    total: totalEmployees,
                    page: page,
                    limit: limit,
                    totalPages: Math.ceil(totalEmployees / limit)
                }
            });
        }
    } catch (error) {
        res.status(500).send("Error while retrieving employee in database");
    }
}

//Controller to retrive the employee by id from the database
export const getEmployeeById = async(req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee){
            res.status(404).json({ success: false, error: "Employee not found" });
        } else {
            res.status(200).json({ success: true, data: employee });
        }
    } catch (error) {
        res.status(500).send("Error while retrieving employee in database");
    }
}

