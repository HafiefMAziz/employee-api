const fs = require("fs");
const fsPromises = fs.promises;

class Employer {
    constructor(id, name, type, total_employee, city) {
        this.id = +id;
        this.name = name;
        this.type = type;
        this.total_employee = +total_employee;
        this.city = city;
    }

    static getEmployers() {
        return new Promise((resolve, reject) => {
            fsPromises.readFile("./data/employers.json", "utf-8")
                .then(employers => {
                    employers = JSON.parse(employers).map((employer) => new Employer(employer.id, employer.name, employer.type, employer.total_employee, employer.city));
                    resolve(employers);
                })
                .catch((rej) => reject(rej));
        });
    }

    static getOneEmployer(id) {
        return new Promise((resolve, reject) => {
            this.getEmployers()
                .then(employers => {
                    const employerById = employers.find((employer) => employer.id === id);
                    if(employerById){
                        resolve(employerById);
                    }else{
                        throw {
                            messtotal_employee: `Cannot find employer with id ${id}`,
                        };
                    }
                })
                .catch((err) => reject(err));
        });
    }

    static save(employers) { 
        fs.writeFileSync('./data/employers.json', JSON.stringify(employers, null, 2));
    }

    static create(newEmployer) { 
        return new Promise((resolve, reject) => {
            this.getEmployers()
            .then(employers => {
                const id = employers[employers.length - 1].id + 1;
                let {name, type, total_employee, city} = newEmployer;
                newEmployer = new Employer(id, name, type, total_employee, city)
                employers.push(newEmployer);
                this.save(employers);
                resolve([newEmployer, employers]); 
            })
            .catch(err => reject(err));
        })
    }

    static delete(id) { 
        return new Promise((resolve, reject) => {
            this.getEmployers()
            .then(employers => {
                const deletedEmployer = employers.find(employer => employer.id === id);
                employers = employers.filter(employer => employer.id !== id);
                this.save(employers);
                resolve([deletedEmployer, employers]);
            })
            .catch((err) => reject(err));
        })
    }

    static update(id, newEmployer) { 
        return new Promise((resolve, reject) => {
            this.getEmployers()
            .then(employers => {
                const {name, type, total_employee, city} = newEmployer;
                let updatedEmployer  = {}
                Object.assign(updatedEmployer, employers.find(employer => employer.id === id)); // copy old Object before updating
                employers.map(employer => {
                    if(employer.id === id) {
                        employer.name = name;
                        employer.type = type;
                        employer.total_employee = total_employee;
                        employer.city = city;
                    }
                    return employer;
                })
                this.save(employers);
                resolve([updatedEmployer, employers]);
            })
            .catch(err => reject(err));
        })
    }
}

module.exports = Employer;
