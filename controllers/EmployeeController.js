const Employee = require("../models/Employee");

class EmployeeController {
    static show(req, res){
        if(req.params.id){
            Employee.getOneEmployee(+req.params.id)
            .then(result => {
                res.send(result);
            })
            .catch(err => res.send(err.message));
        }else{
            Employee.getEmployees()
            .then(result => {
                res.send(result);
            })
            .catch(err => res.send(err.message));
        }
    }

    static create(req, res){
        const newEmployee = req.body;
        Employee.create(newEmployee)
        .then(result => {
            res.send(`${result.name} has been registered into employees data`);
        })
        .catch(err => res.send(err.message));
    }

    static delete(req, res){
        Employee.delete(+req.params.id)
        .then(result => {
            const [deletedEmployee, employees] = result;
            res.send(`${deletedEmployee.name} has been deleted!`);
        })
        .catch(err => res.send(err.message));
    }

    static update(req, res){
        const newEmployee = req.body;
        Employee.update(+req.params.id, newEmployee)
        .then(result => {
            const [updatedEmployee, employees] = result;
            res.send(`${updatedEmployee.name} has been updated to ${newEmployee.name}`);
        })
        .catch(err => res.send(err.message));
    }
}

module.exports = EmployeeController;