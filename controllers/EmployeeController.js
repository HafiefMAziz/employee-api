const Employee = require("../models/Employee");

class EmployeeController {
    static show(req, res){
        if(+req.params.id){
            Employee.getOneEmployee(+req.params.id)
            .then(result => {
                res.render('./employees/show.ejs', {
                    title: 'Employee Lists',
                    employee: result
                });
            })
            .catch(err => res.send(err.message));
        }else{
            Employee.getEmployees()
            .then(result => {
                res.render('./employees/show.ejs', {
                    title: 'Employee Lists',
                    employees: result
                });
            })
            .catch(err => res.send(err.message));
        }
    }

    static create(req, res){
        const newEmployee = req.body;
        Employee.create(newEmployee)
        .then(result => {
            const [newEmployee, employees] = result;
            res.redirect('/employees');        
        })
        .catch(err => res.send(err.message));
    }

    static delete(req, res){
        Employee.delete(+req.params.id)
        .then(result => {
            const [deletedEmployee, employees] = result;
            res.redirect('/employees');        
        })
        .catch(err => res.send(err.message));
    }

    static updateForm(req, res){
        const newEmployee = req.body;
        Employee.getOneEmployee(+req.params.id)
        .then(result => {
            res.render('./employees/updateForm.ejs',{
                title: 'Employee Update Form',
                employee: result
            })
        })
        .catch(err => res.send(err.message));
    }
    static update(req, res){
        const newEmployee = req.body;
        console.log(newEmployee);
        Employee.update(+req.params.id, newEmployee)
        .then(result => {
            const [updatedEmployee, employees] = result;
            res.redirect('/employees')
        })
        .catch(err => res.send(err.message));
    }
}

module.exports = EmployeeController;