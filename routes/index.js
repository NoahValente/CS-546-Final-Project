const mainRoutes = require('./main');
//const privateRoutes = require('./private');

const constructorMethod = (app) => {
  app.use('/', mainRoutes);
  //app.use('/private', privateRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;