const path = require('path');

const express = require('express');
const hbs = require('hbs');

const getUsers = require('./utils/users');

const app = express();
const PORT = process.env.PORT || 3000;

const tabIndex = {
  HOME: 0,
  ABOUT: 1
};
const templateData = {
  tabs: [
    {
      href: '/',
      content: 'Home'
    },
    {
      href: '/about',
      content: 'About'
    }
  ],
  copyYear: new Date().getUTCFullYear()
};
let users = null;

// Define paths for Express config
const staticDirectoryPath = path.join(__dirname, '../public');
const viewTemplatesPath = path.join(__dirname, '../templates/views');
const partialTemplatesPath = path.join(__dirname, '../templates/partials');

// Set up static directory
app.use(express.static(staticDirectoryPath));

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewTemplatesPath);
hbs.registerPartials(partialTemplatesPath);

// Handlebars custom helpers
hbs.registerHelper('equals', (val1, val2) => (val1 === val2));

// Set up URL mapping
app.get('/', (req, res) => {
  if (users) {
    res.render('home', {
      activeTabIndex: tabIndex.HOME,
      templateData,
      users
    });
  } else {
    getUsers('', (err, data) => {
      if (err) {
        users = [];
      } else {
        const response = (Array.isArray(data)) ? data : [data];
        users = response;
      }

      res.render('home', {
        activeTabIndex: tabIndex.HOME,
        templateData,
        users
      });
    });
  }
});

app.get('/about', (req, res) => {
  res.render('about', {
    activeTabIndex: tabIndex.ABOUT,
    templateData
  });
});

// Set up default error handling
app.get('*', (req, res) => {
  res.render('404', {
    templateData
  });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
