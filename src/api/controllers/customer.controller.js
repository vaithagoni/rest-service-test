const httpStatus = require('http-status');
let customers = require('../../../customers.json');


/**
 * Get customers details
 * @public
 */
exports.get = (req, res) => {
  const {
    params: { id }
  } = req;
  const data = [];
  customers.forEach(customer => {
    if (customer.agent_id == id) {
      const { name: { last, first } = {}, address } = customer;
      const addressInfo = address.split(',');
      const retData = {
        id: customer._id,
        name: `${last}, ${first}`,
        city: addressInfo[1],
        state: addressInfo[2]
      }
      data.push(retData);
    }
  });
  res.json(data || '');
}


/**
 * Create new customer
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const customer = req.body;
    customers = { ...customers, customer };
    // generate new customer id
    res.status(httpStatus.CREATED);
    res.json(customer);
  } catch (error) {
    next();
  }
};

/**
 * Delete customer
 * @public
 */
exports.remove = (req, res, next) => {
  const {
    params: { id }
  } = req;
  customers = customers.filter(customer => customer._id !== id);
  res.status(httpStatus.DELETED);
  next();
}


/**
 * Update existing customer
 * @public
 */
exports.update = (req, res, next) => {
  const { params: { id }, body = {} } = req;
  try {
    let customerData = customers.find(customer => customer._id === id);

    customerData.name = body.name || customerData.name;
    customerData.address = body.address || customerData.address;
    customerData.city = body.city || customerData.city;
    customerData.state = body.state || customerData.state;
    customerData.zipCode = body.zipCode || customerData.zipCode;
    customerData.tier = body.tier || customerData.tier;
    customerData.phone.primary = body.phone.primary || customerData.phone.primary;
    customerData.phone.mobile = body.phone.mobile || customerData.phone.mobile;
    res.json(agents);
  } catch (error) {
    next(error);
  }
};

/**
 * Get customers list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    res.json(customers);
  } catch (error) {
    next(error);
  }
};
