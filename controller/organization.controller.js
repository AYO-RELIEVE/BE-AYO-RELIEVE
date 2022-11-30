const { Program, User } = require("../models")

const listApplicant = async (req, res) => {
    const id = req.params.id;
    const program = await Program.findByPk(id, {
        include: [{
            model: User,
            as: "applicant",
            attributes: {
                exclude: ["password"]
            },
            through: {
                attributes: ["status"]
            }
        }]
    });

    res.status(200).json({
        data: program
    })
}

const listProgram = async (req, res) => {
    console.log("id", req.user.id)
    const programs = await Program.findAll({
        where: {
            organization_id: req.user.id
        }
    })

    res.status(200).json({
        data: programs
    })
}


module.exports = { listApplicant, listProgram }
