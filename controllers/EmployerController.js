const Employer = require("../models/Employer");

class EmployerController {
    static show(req, res){
        if(+req.params.id){
            Employer.getOneEmployer(+req.params.id)
            .then(result => {
                res.render('./employers/show.ejs', {
                    title: 'Employer Lists',
                    employer: result
                });
            })
            .catch(err => res.send(err.message));
        }else{
            Employer.getEmployers()
            .then(result => {
                res.render('./employers/show.ejs', {
                    title: 'Employer Lists',
                    employers: result
                });
            })
            .catch(err => res.send(err.message));
        }
    }

    static create(req, res){
        const newEmployer = req.body;
        Employer.create(newEmployer)
        .then(result => {
            const [newEmployer, employers] = result;
            res.redirect('/employers');        
        })
        .catch(err => res.send(err.message));
    }

    static delete(req, res){
        Employer.delete(+req.params.id)
        .then(result => {
            const [deletedEmployer, employers] = result;
            res.redirect('/employers');        
        })
        .catch(err => res.send(err.message));
    }

    static updateForm(req, res){
        const newEmployer = req.body;
        Employer.getOneEmployer(+req.params.id)
        .then(result => {
            res.render('./employers/updateForm.ejs',{
                title: 'Employer Update Form',
                employer: result
            })
        })
        .catch(err => res.send(err.message));
    }
    static update(req, res){
        const newEmployer = req.body;
        Employer.update(+req.params.id, newEmployer)
        .then(result => {
            const [updatedEmployer, employers] = result;
            res.redirect('/employers')
        })
        .catch(err => res.send(err.message));
    }
}

module.exports = EmployerController;