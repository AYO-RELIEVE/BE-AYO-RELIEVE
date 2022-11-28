const {Program, User} = require("../models")

const listApplicant = async (req, res) => {
    const id = req.params.id;
    const program = await Program.findByPk(id, {
        include : [{
            model : User, 
            as : "applicant", 
            attributes : {
                exclude : ["password"]     
            }, 
            through : {
                attributes : ["status"]
            }
        }]
    });

    res.json({
        data: program
    })
}

const listProgram = async (req, res) => {
    console.log("id", req.user.id)
    const programs = await Program.findAll({
        where : {
          organization_id : req.user.id  
        }
        
    })

    res.json({
        data: programs
    })
}


module.exports = {listApplicant, listProgram}
