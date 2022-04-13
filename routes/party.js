// import express and router
const express = require('express');
const router = express.Router();

// Import Prisma
const { PrismaClient } = require('@prisma/client');
const { route } = require('.');
const prisma = new PrismaClient();

// Party List
router.get('/', (req, res) => {
    res.render('partylist')
})
router
    .route('/add')
    .get(isAuthenticated, (req, res) => {
        res.render('partylist_add')
    }).post(isAuthenticated, async (req, res) => {
        try {
            const { listName, image, memberList } = req.body;
            memberArray = memberList.split(',')
            await prisma.partylist.create({
                data: {
                    name: listName,
                    image: image,
                    owner: {
                        connect: {
                            username: req.session.user.username
                        }
                    },
                    Member: memberArray,
                    image: `/images/${image}`
                }
            })
            res.render('partylist', {
                user: req.session.user,
                msg: 'Successfully created a list'
            })
        } catch (e) {
            res.render('partylist_add', {
                error: e.message,
                user: req.session.user
            })
        }
    })

// api to get all party
router.get('/all', async (req, res) => {
    const party = await prisma.partylist.findMany({
        where: {
            partyOwner: req.session.user.username
        }
    })
    res.json(party);
})

// get a specific party
router.get('/:id', isAuthenticated, async (req, res) => {
    const party = await prisma.partylist.findUnique({
        where: {
            id: +req.params.id
        }
    })
    res.render('secretsanta', {
        party: party,
        member: party.Member
    })
})

// delete a party
router.delete('/delete/:id', async (req, res) => {
    await prisma.partylist.delete({
        where: {
            id: +req.params.id
        }
    })
    res.render('partylist', {
        msg: 'Party successfully deleted'
    })
})

// function to make sure you are logged in
function isAuthenticated(req, res, next) {
    if (req.session.authenticated) {
        return next();
    } else {
        res.render('login.pug', {
            errors: "Please login to access this page"
        })
    }
}

module.exports = router