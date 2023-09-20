//import modules
import db from "../config/sequelize-config.js";

/******************* Mail Controllers *****************/

/***************** ADD MAIL *********************/
async function addMail(req, res) {
    try {
        const {
            id,
            firstname,
            lastname,
            email,
            phone,
            subject,
            message,
            isRead,
        } = req.body;

        //Check if datas are valid
        if (
            !firstname ||
            !lastname ||
            !email ||
            !phone ||
            !subject ||
            !message
        ) {
            return res.send("Des données sont manquantes");
        }

        //Check if mail exist
        const mail = await db.Mail.findByPk(id);
        if (mail) {
            return res
                .status(409)
                .json({ message: "Ce mail est déjà répertorié" });
        }

        //Generate date
        const generatedDate = new Date();

        //Add mail
        const newMail = await db.Mail.create({
            id: id,
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            date: generatedDate,
            subject: subject,
            message: message,
            isRead: isRead,
        });

        console.log(newMail);
        return res.status(200).json({
            message: "Mail créé",
            data: newMail,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur lors de la création du mail" });
    }
}

/******************* GET ALL MAILS ****************/
async function getAllMails(req, res) {
    try {
        const mails = await db.Mail.findAll();
        res.status(200).json(mails);
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

/******************* GET ONE MAIL *****************/
async function getOneMail(req, res) {
    try {
        const id = req.params.id;
        let mail = await db.Mail.findByPk(id);
        if (!mail) {
            res.status(404).json({
                message: "Ce mail n'existe pas",
            });
        }

        res.status(200).json(mail);
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

/*************** UPDATE MAIL ********************/
async function updateMail(req, res) {
    try {
        const id = req.params.id;
        let { isRead } = req.body;

        //retrieve the mail
        let updatedMail = await db.Mail.findByPk(id);
        if (!updatedMail) {
            res.status(404).json({
                message: "Le mail recherché n'existe pas",
            });
        }
        console.log(updatedMail);

        updatedMail = await db.Mail.update(
            {
                ...updatedMail,
                isRead: true,
            },
            {
                where: { id: id },
            }
        );

        console.log("mail mis à jour", updatedMail);

        return res.json({
            message: "Mail mis à jour",
            data: { updatedMail, isRead: isRead },
        });
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}
/******************* DELETE MAIL *****************/
async function deleteMail(req, res) {
    try {
        const id = req.params.id;
        //Check if id is OK
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //mail deletation
        const mail = await db.Mail.destroy({
            where: { id: id },
            force: true,
        });
        if (!mail) {
            return res
                .status(404)
                .json({ message: "Le mail recherché n'existe pas" });
        }
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

export { addMail, getAllMails, getOneMail, updateMail, deleteMail };
