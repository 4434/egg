'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.post('/article', controller.article.articleList);
  router.get ('/articleDetail', controller.article.articleDetail);
  router.post('/articleWrite', controller.article.articleWrite);
  router.post('/articleUs', controller.article.articleUs);
  router.get ('/articleDelete', controller.article.articleDelete);
  router.post('/articleUpdate', controller.article.articleUpdate);
  router.post('/articleStatus', controller.article.articleStatus);

  router.post('/login', controller.user.login);
  router.post('/register', controller.user.register);
  router.post('/userInfo', controller.user.userInfo);
  router.get('/getUse', controller.user.getUse);
  router.get ('/getQiniuToken', controller.qiniu.getToken);

  router.post('/addData', controller.echart.addData);
  router.post('/listData', controller.echart.listData);
  router.get('/dataDelete', controller.echart.dataDelete);
  router.post('/dataUpdate', controller.echart.dataUpdate);
};
