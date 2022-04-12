// import express and router
const express = require('express');
const router = express.Router();

// Import Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//import bcrypt for ahsing password
const bcrpyt = require('bcrypt');

// Login Page
router
    .route('/')
    .get((req,res) => {
        res.render('login');
    }).post(async(req,res) => {
        const {userName, pass} = req.body
        try{
            const user = await prisma.user.findUnique({
                where: {
                    username: userName
                }
            })
            if(!userName || !pass){
                throw new Error('Please input username and password');
            }
            if(!user) {
                throw new Error('Username does not exist');
            }
            const validPass = await bcrpyt.compare(pass, user.password)
            if(!validPass) {
                throw new Error('Password in incorrect');
            }
            else{
                req.session.authenticated = true;
                req.session.user = user;
                res.render('partylist', {
                    msg: "You have successfully login",
                    user: user
                })
            }
        }catch(e) {
            res.render('partylist', {
                error: e.message,
            })
        }
    })

// Register Page
router
    .route('/register')
    .get((req, res) => {
    res.render('register');
}).post(async(req, res) => {
    try{
        const {userName, pass, confirm_pass} = req.body
        hashedPassword = await bcrpyt.hash(pass, 10)
        const user = await prisma.user.findUnique({
            where: {
                username: userName
            } 
        })
        if(user || typeof userName !== 'string' || !userName.trim() || userName.length < 4){
            throw new Error('Username should be at least 4 characters long')
        }
        if(typeof pass !== 'string' || !pass.trim() || pass.length < 8){
            throw new Error('Password should be at least 8 characters long')
        }
        if(pass !== confirm_pass){
            throw new Error('Password and Confirm Password does not match')
        }
        await prisma.user.create({
            data: {
                username: userName,
                password: hashedPassword
            }
        })
        res.render('login.pug', {
            msg: 'You have successfully registered'
        })
    } catch(e) {
        res.render('register.pug', {
            error: e.message,
        })
    }
})

// Logout
// referenced https://cesare.substack.com/p/how-to-implement-a-logout-method?s=r
router.get('/logout', (req, res) => {
    try {
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    throw new Error(`Unable to logout`)
                } else {
                    res.render('login', {
                        message: "Logout successful",
                        user: null
                    })

                }
            });
        } else {
            res.end()
        }

    } catch (error) {
        res.render('login.pug', {
            errors: error.message
        })
    }
})


module.exports = router;