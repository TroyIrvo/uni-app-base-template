const GzConfig = {};


// 小程序 后台部署服务器域名 或ip地址
GzConfig.MP_DOMAIN = ""

// 小程序 后台部署服务器端口
GzConfig.MP_PORT = ""

// 小程序 APPID
GzConfig.MP_APPID = ""

//推送服务器地址 
GzConfig.SignalR = "";

//高德地图key
GzConfig.AMapKey = ""

//服务网关ip
GzConfig.WG_DOMAIN = "103.56.76.161"

//服务网关端口
GzConfig.WG_PORT = "7007"

//服务网关网络请求完整地址
GzConfig.WG_URL = "http://" + GzConfig.WG_DOMAIN + ":" + GzConfig.WG_PORT + "/api/ServiceGateway/DataService"

// 项目系统id
GzConfig.SYS_SYSTEMID = "638396FA-AEC9-45D1-A1F5-F83B7BAFA5D9"

//目标系统id
GzConfig.SYS_TARGET_SYSTEMID = ""

export default GzConfig;
