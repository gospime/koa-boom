const Boom = require('@hapi/boom');

module.exports = async (context, next) => {
  const boom = {};

  const mapper = key => {
    if (typeof Boom[key] !== 'function') return;
    boom[key] = function() {
      throw Boom[key].apply(Boom, arguments);
    };
  };

  Object.getOwnPropertyNames(Boom).map(mapper);

  context.boom = boom;

  await next();
};
