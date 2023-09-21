const Job = require("../models/Job");

class JobController {
    static show(req, res){
        if(+req.params.id){
            Job.getOneJob(+req.params.id)
            .then(result => {
                res.render('./jobs/show.ejs', {
                    title: 'Job Lists',
                    job: result
                });
            })
            .catch(err => res.send(err.message));
        }else{
            Job.getJobs()
            .then(result => {
                res.render('./jobs/show.ejs', {
                    title: 'Job Lists',
                    jobs: result
                });
            })
            .catch(err => res.send(err.message));
        }
    }

    static create(req, res){
        const newJob = req.body;
        Job.create(newJob)
        .then(result => {
            const [newJob, jobs] = result;
            res.redirect('/jobs');        
        })
        .catch(err => res.send(err.message));
    }

    static delete(req, res){
        Job.delete(+req.params.id)
        .then(result => {
            const [deletedJob, jobs] = result;
            res.redirect('/jobs');        
        })
        .catch(err => res.send(err.message));
    }

    static updateForm(req, res){
        const newJob = req.body;
        Job.getOneJob(+req.params.id)
        .then(result => {
            res.render('./jobs/updateForm.ejs',{
                title: 'Job Update Form',
                job: result
            })
        })
        .catch(err => res.send(err.message));
    }
    static update(req, res){
        const newJob = req.body;
        Job.update(+req.params.id, newJob)
        .then(result => {
            const [updatedJob, jobs] = result;
            res.redirect('/jobs')
        })
        .catch(err => res.send(err.message));
    }
}

module.exports = JobController;