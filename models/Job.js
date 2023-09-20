const fs = require("fs");
const fsPromises = fs.promises;

class Job {
    constructor(id, name, category, max_salary, min_salary) {
        this.id = +id;
        this.name = name;
        this.category = category;
        this.max_salary = +max_salary;
        this.min_salary = +min_salary;
    }

    static getJobs() {
        return new Promise((resolve, reject) => {
            fsPromises.readFile("./data/jobs.json", "utf-8")
                .then(jobs => {
                    jobs = JSON.parse(jobs).map((job) => new Job(job.id, job.name, job.category, job.max_salary, job.min_salary));
                    resolve(jobs);
                })
                .catch((rej) => reject(rej));
        });
    }

    static getOneJob(id) {
        return new Promise((resolve, reject) => {
            this.getJobs()
                .then(jobs => {
                    const jobById = jobs.find((job) => job.id === id);
                    if(jobById){
                        resolve(jobById);
                    }else{
                        throw {
                            messmax_salary: `Cannot find job with id ${id}`,
                        };
                    }
                })
                .catch((err) => reject(err));
        });
    }

    static save(jobs) { 
        fs.writeFileSync('./data/jobs.json', JSON.stringify(jobs, null, 2));
    }

    static create(newJob) { 
        return new Promise((resolve, reject) => {
            this.getJobs()
            .then(jobs => {
                const id = jobs[jobs.length - 1].id + 1;
                let {name, category, max_salary, min_salary} = newJob;
                newJob = new Job(id, name, category, max_salary, min_salary)
                jobs.push(newJob);
                this.save(jobs);
                resolve([newJob, jobs]); 
            })
            .catch(err => reject(err));
        })
    }

    static delete(id) { 
        return new Promise((resolve, reject) => {
            this.getJobs()
            .then(jobs => {
                const deletedJob = jobs.find(job => job.id === id);
                jobs = jobs.filter(job => job.id !== id);
                this.save(jobs);
                resolve([deletedJob, jobs]);
            })
            .catch((err) => reject(err));
        })
    }

    static update(id, newJob) { 
        return new Promise((resolve, reject) => {
            this.getJobs()
            .then(jobs => {
                const {name, category, max_salary, min_salary} = newJob;
                let updatedJob  = {}
                Object.assign(updatedJob, jobs.find(job => job.id === id)); // copy old Object before updating
                jobs.map(job => {
                    if(job.id === id) {
                        job.name = name;
                        job.category = category;
                        job.max_salary = max_salary;
                        job.min_salary = min_salary;
                    }
                    return job;
                })
                this.save(jobs);
                resolve([updatedJob, jobs]);
            })
            .catch(err => reject(err));
        })
    }
}

module.exports = Job;
