const axios = require('axios');
const chalk = require('chalk');

const USERS_URL = 'https://jsonplaceholder.typicode.com/users/';

const getUsers = (id = '', callback) => {
  const infoMsg = (id) ? `User ${id} requested!` : 'All users requested!';
  console.log(`${new Date().toString()} :: ${chalk.bold.yellow(infoMsg)}`);

  const url = `${USERS_URL}${id}`;
  axios.get(url)
    .then((response) => {
      if (response && response.data) {
        const successMsg = (id) ? `User ${id} returned!` : 'Users returned!';
        console.log(`${new Date().toString()} :: ${chalk.bold.green(successMsg)}`);
        callback(null, response.data);
      } else {
        console.error(`${new Date().toString()} :: ${chalk.bold.red('No user found!')}`);
        callback('No user found!');
      }
    })
    .catch((err) => {
      console.error(`${new Date().toString()} :: ${chalk.bold.red(err.message)}`);
      callback('No user found!');
    });
};

module.exports = getUsers;
