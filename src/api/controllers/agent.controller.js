const httpStatus = require('http-status');
let agents = require('../../../agents.json');

/**
 * Get agent details
 * @public
 */
exports.get = (req, res) => {
  const {
    params: { id }
  } = req;
  const agentData = agents.find(agent => agent._id == id);
  res.json(agentData || '');
}


/**
 * Create new agent
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const agent = req.body;
    agents = { ...agents, agent };

    // generage new agent id
    res.status(httpStatus.CREATED);
    res.json(agent);
  } catch (error) {
    next();
  }
};

/**
 * Update existing agent
 * @public
 */
exports.update = (req, res, next) => {
  const { params: { id }, body = {} } = req;
  try {
    let agentData = agents.find(agent => agent._id === id);

    agentData.name = body.name || agentData.name;
    agentData.address = body.address || agentData.address;
    agentData.city = body.city || agentData.city;
    agentData.state = body.state || agentData.state;
    agentData.zipCode = body.zipCode || agentData.zipCode;
    agentData.tier = body.tier || agentData.tier;
    agentData.phone.primary = body.phone.primary || agentData.phone.primary;
    agentData.phone.mobile = body.phone.mobile || agentData.phone.mobile;
    res.json(agents);
  } catch (error) {
    next(error);
  }
};

/**
 * Get agents list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    res.json(agents);
  } catch (error) {
    next(error);
  }
};
