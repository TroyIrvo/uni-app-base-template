import Request from '../plugins/request/js/index';

export default {
    // 获取token
    getToken(id) {
        return Request().get('/test/token/get?id=' + id);
    },
};