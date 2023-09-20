const fs = require("fs");
const fsPromises = fs.promises;

class Employee {
    constructor(id, name, job, age, city) {
        this.id = +id;
        this.name = name;
        this.job = job;
        this.age = +age;
        this.city = city;
    }

    static getEmployees() {
        return new Promise((resolve, reject) => {
            fsPromises.readFile("./data/employees.json", "utf-8")
                .then(employees => {
                    employees = JSON.parse(employees).map((employee) => new Employee(employee.id, employee.name, employee.job, employee.age, employee.city));
                    resolve(employees);
                })
                .catch((rej) => reject(rej));
        });
    }

    static getOneEmployee(id) {
        return new Promise((resolve, reject) => {
            this.getEmployees()
                .then(employees => {
                    const employeeById = employees.find((employee) => employee.id === id);
                    if(employeeById){
                        resolve(employeeById);
                    }else{
                        throw {
                            message: `Cannot find employee with id ${id}`,
                        };
                    }
                })
                .catch((err) => reject(err));
        });
    }

    static save(employees) { 
        fs.writeFileSync('./data/employees.json', JSON.stringify(employees, null, 2));
    }

    static create(newEmployee) { 
        return new Promise((resolve, reject) => {
            this.getEmployees()
            .then(employees => {
                const id = employees[employees.length - 1].id + 1;
                let {name, job, age, city} = newEmployee;
                newEmployee = new Employee(id, name, job, age, city)
                employees.push(newEmployee);
                this.save(employees);
                resolve([newEmployee, employees]); 
            })
            .catch(err => reject(err));
        })
    }

    static delete(id) { 
        return new Promise((resolve, reject) => {
            this.getEmployees()
            .then(employees => {
                const deletedEmployee = employees.find(employee => employee.id === id);
                employees = employees.filter(employee => employee.id !== id);
                this.save(employees);
                resolve([deletedEmployee, employees]);
            })
            .catch((err) => reject(err));
        })
    }

    static update(id, newEmployee) { 
        return new Promise((resolve, reject) => {
            this.getEmployees()
            .then(employees => {
                const {name, job, age, city} = newEmployee;
                let updatedEmployee  = {}
                Object.assign(updatedEmployee, employees.find(employee => employee.id === id)); // copy old Object before updating
                employees.map(employee => {
                    if(employee.id === id) {
                        employee.name = name;
                        employee.job = job;
                        employee.age = age;
                        employee.city = city;
                    }
                    return employee;
                })
                this.save(employees);
                resolve([updatedEmployee, employees]);
            })
            .catch(err => reject(err));
        })
    }
}

module.exports = Employee;
