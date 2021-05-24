const express = require('express');
const customerRoutes = require('./customer.route');
const agentRoutes = require('./agent.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/agents', agentRoutes);
router.use('/customers', customerRoutes);

module.exports = router;
