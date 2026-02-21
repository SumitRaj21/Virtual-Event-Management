const express = require('express');

const authRoutes = require('./auth.route');
const eventRoutes = require('./event.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/event',
        route: eventRoutes,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;