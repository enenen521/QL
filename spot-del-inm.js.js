// spot-del-inm.js
// 作用：删除条件请求头 if-none-match / if-modified-since。
// 原因：Spotify iOS 9.1.98+ 通过 remote-config-resolver / nebula 刷新配置与账号属性，
//       若请求带 if-none-match，服务端返回 304，App 继续使用未改写的本地缓存，
//       导致 Premium 属性注入「看起来完全没生效」。
// 放置：文件 App → 我的 iPhone → Quantumult X → Scripts → spot-del-inm.js

let headers = $request.headers || {};

Object.keys(headers).forEach(function (key) {
  const lower = key.toLowerCase();
  if (lower === "if-none-match" || lower === "if-modified-since") {
    delete headers[key];
  }
});

$done({ headers: headers });
