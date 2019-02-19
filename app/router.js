'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.post('/article', controller.article.articleList);
  router.get ('/articleDetail', controller.article.articleDetail);
  router.post('/articleWrite', controller.article.articleWrite);
  router.get ('/articleDelete', controller.article.articleDelete);
  router.post('/articleUpdate', controller.article.articleUpdate);
};
