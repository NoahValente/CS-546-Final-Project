const mainRoutes = require('./main');
const exploreRoutes = require('./explore');
const accountRoutes = require('./account');
const businessRoutes = require('./business');
//for pull/push git issues
const constructorMethod = (app) => {

  app.use('/', mainRoutes);
  app.use('/explore', exploreRoutes);
  app.use('/settings', accountRoutes);
  app.use('/business', businessRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
