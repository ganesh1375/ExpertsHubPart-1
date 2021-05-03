require('dotenv').config();
const express = require('express');
const RegisterModel = require('../model/userRegModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const route = express.Router();
const mailjet = require('node-mailjet')
    .connect('954d5d1eaf2c2f6ed800fca137d5412c', 'fddf279acacaa33e31079eaac5855ea5')
//const request = mailjet
var token;
route.get('/enroll', async (req, res) => {

    try {

        const details = await RegisterModel.find({});

        res.json(details);

    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
})
// route.post('/enroll', async (req, res) => {

//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         // console.log(hashedPassword);

//         email = req.body.email;
//         RegisterModel.findOne({ email }).exec((err, userCheck) => {
//             if (userCheck) {
//                 return res.json({feedBack:"exist"});
//             }
//             let user = new RegisterModel();
//             user.email = req.body.email;
//             user.password = hashedPassword;
//             user.firstname = req.body.firstname;
//             user.lastname = req.body.lastname;
//             user.phoneNo = req.body.phoneNo;
//             user.save((err) => {
//                 if (err) {
//                     res.status(401).send("Invalid Data");
//                 }
//                 else {
//                     res.json(user);
//                 }
//             })
//         });
//     }
//     catch (err) {
//         res.status(400).json({ errMsg: err.message });

//     }
// });
route.post('/enroll', async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // console.log(hashedPassword);
        // //let user = new RegisterModel();
        // email = req.body.email;
        // password = hashedPassword;
        // firstname = req.body.firstname;
        // lastname = req.body.lastname;
        // phoneNo = req.body.phoneNo;
        const {email, password, firstname, lastname, phoneNo}=req.body;
        RegisterModel.findOne({ email }).exec((err, userCheck) => {
            if (userCheck) {
                return res.json({ feedBack: "exist" });
            }
            //let payload = { subject:email }
            token = jwt.sign({ email, password, firstname, lastname, phoneNo }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
            const request = mailjet
                .post("send", { 'version': 'v3.1' })
                .request({
                    "Messages": [
                        {
                            "From": {
                                "Email": "ranarohit800870@gmail.com",
                                "Name": "Ganesh"
                            },
                            "To": [
                                {   
                                    "Email": `${email}`,
                                    "Name": `${firstname} ${lastname}`
                                }
                            ],
                            "Subject": "Greetings from ExpertsHub.",
                            "TextPart": "Click on Below Link To Verify Your Account",
                            "HTMLPart": `<h3>Dear Aspriant, welcome to <a href='http://localhost:5500/api/verify/${token}'>ExpertsHub</a>!</h3><br />May the delivery force be with you!`,
                            "CustomID": "AppGettingStartedTest"
                        }
                    ]
                })
            request
                .then((result) => {
                    console.log("Please Check Your Email")
                })
                .catch((err) => {
                    console.log(err.statusCode)
                });
            res.json("Okay");
        });
    }
    catch (err) {
        res.status(400).json({ errMsg: err.message });

    }
});
route.post('/login', async (req, res) => {
    try {
        const user = await RegisterModel.findOne({ email: req.body.email });
        //console.log(user);
        if (user != null) {
            if ((req.body.password == user.password)) {
                // let payload = { subject: user._id }
                //  token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
                // const refreshToken = jwt.sign(payload, 'be129351a401866ebefa220b4e8c287ce5bb500fba80ad7d81de585bf444c9756241155052864504fdb24a6b62aea28c247872451f1e4d665745a2840b8cb70c')
                // lucky=token;
                // console.log(lucky);
                //res.json({ token: token,refreshToken:refreshToken });
                return res.json({ message: "SuccessFull" });
            }
            else {
                return res.json({ message: "Invalid Password" });
            }
        }
        else {
            res.json(user);
        }
    }
    catch
    {
        res.status(500).send("Invalid Login ");
    }

});

route.get(`/verify/:token`, (req, res) => {
    //console.log(token);
    const token = req.params.token;
    console.log("Uniq Key" + token);
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decodedToken) {
            if (err) {
                return res.status(400).json({ error: err });
            }
            console.log(decodedToken);
            const { email, password, firstname, lastname, phoneNo } = decodedToken;
            console.log(email);
            RegisterModel.findOne({ email }).exec((err, user) => {
                if (user) {
                    return res.json({ error: "Already Verified!!" })
                }
                const neWuser = new RegisterModel({ email, password, firstname, lastname, phoneNo });
                neWuser.save((err, success) => {
                    if (err) {
                        console.log("Error While Sing up");
                        return res.json({ message: "endko entto " });
                    }
                    res.json({ message: "Sign up Successfull" });
                })
            })
        })
    }
    else {
        req.json("No Access");
    }
});
module.exports = route;