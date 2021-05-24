const express = require('express');
const controller = require('../../controllers/customer.controller');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();


router
  .route('/:id')
  /**
   * @api {get} v1/customers/:id List all Customers for given agent id
   * @apiDescription Get customers information
   * @apiVersion 1.0.0
   * @apiName GetCustomers
   * @apiGroup customer

   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {String}  id         User's id
   * @apiSuccess {String}  name       User's name
   * @apiSuccess {String}  email      User's email
   * @apiSuccess {String}  role       User's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(controller.get)

  /**
   * @api {post} v1/customers/:id Create customer
   * @apiDescription Create a new customer
   * @apiVersion 1.0.0
   * @apiName CreateCustomer
   * @apiGroup customer
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}             email     User's email
   * @apiParam  {String{6..128}}     password  User's password
   * @apiParam  {String{..128}}      [name]    User's name
   * @apiParam  {String=user,admin}  [role]    User's role
   *
   * @apiSuccess (Created 201) {String}  id         User's id
   * @apiSuccess (Created 201) {String}  name       User's name
   * @apiSuccess (Created 201) {String}  email      User's email
   * @apiSuccess (Created 201) {String}  role       User's role
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(controller.create)

  /**
* @api {patch} v1/customers/:id Delete customer
* @apiDescription Delete a customer
* @apiVersion 1.0.0
* @apiName DeleteCustomer
* @apiGroup customer
*
* @apiHeader {String} Authorization   User's access token
*
* @apiSuccess (No Content 204)  Successfully deleted
*
* @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
* @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
* @apiError (Not Found 404)    NotFound      User does not exist
*/
  .delete(controller.remove)

  /**
 * @api {patch} v1/customers/:id Update customer
 * @apiDescription Update some fields of a customer document
 * @apiVersion 1.0.0
 * @apiName UpdateCustomer
 * @apiGroup customer
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {String}             email     User's email
 * @apiParam  {String{6..128}}     password  User's password
 * @apiParam  {String{..128}}      [name]    User's name
 * @apiParam  {String=user,admin}  [role]    User's role
 * (You must be an admin to change the user's role)
 *
 * @apiSuccess {String}  id         User's id
 * @apiSuccess {String}  name       User's name
 * @apiSuccess {String}  email      User's email
 * @apiSuccess {String}  role       User's role
 * @apiSuccess {Date}    createdAt  Timestamp
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
 * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
 * @apiError (Not Found 404)    NotFound     User does not exist
 */
  .patch(controller.update);

router
  .route('/')
  /**
   * @api {get} v1/customers List Customers
   * @apiDescription Get a list of customers
   * @apiVersion 1.0.0
   * @apiName ListCustomers
   * @apiGroup customers
   *
   * @apiHeader {String} Authorization   User's access token
   
   *
   * @apiSuccess {Object[]} customers List of customers.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.list);



module.exports = router;
