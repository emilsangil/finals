// import express and router
const express = require('express');
const router = express.Router();

// Import Prisma
const { PrismaClient } = require('@prisma/client');
const { route } = require('.');
const prisma = new PrismaClient();

// Party List
router.get('/', (req,res) => {
    res.render('partylist')
})
router
    .route('/add')
    .get(isAuthenticated,(req,res) => {
        res.render('partylist_add')
    }).post(isAuthenticated,async(req,res) => {
        const {listName, image, memberList } = req.body;
        try{
            await prisma.partylist.create({
                data: {
                    name: listName,
                    image: image,
                    owner: {
                        connect: {
                            username: req.session.user.username
                        }
                    },
                    member: {
                        createMany:[(memberList.split(',')).forEach(value => {
                            return { 
                                memberName: value,
                            }
                        })] 
                    },
                    image: `/image${image}`
                }
            })
            res.render('partylist', {
                user:req.session.user,
                msg: 'Successfully created a list'
            })
        }catch(e) {
            res.render('partylist_add', {
                error: e.message,
                user: req.session.user
            })
        }
    })


function isAuthenticated(req,res,next) {
    if (req.session.authenticated) {
        return next();
    } else {
        res.render('login.pug', {
            errors: "Please login to access this page"
        })
    }
}

module.exports = router