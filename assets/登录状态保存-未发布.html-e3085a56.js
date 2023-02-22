import{_ as e,Q as i,S as a,a5 as o}from"./framework-ec2af7a3.js";const s={},n=o('<h1 id="登录状态保存" tabindex="-1"><a class="header-anchor" href="#登录状态保存" aria-hidden="true">#</a> 登录状态保存</h1><h1 id="cookie" tabindex="-1"><a class="header-anchor" href="#cookie" aria-hidden="true">#</a> Cookie</h1><p>向服务器发起请求时，服务器会做 set-cookie 的操作，之后浏览器就可以保存得到的 cookie</p><br><h1 id="session" tabindex="-1"><a class="header-anchor" href="#session" aria-hidden="true">#</a> Session</h1><ul><li>浏览器与服务器连接后即是开启了会话 session</li><li>session 是后端定义的，过期时间也是后端决定的，同时也是存储在后端的</li><li>后端会将 session 存放到 cookie 中发送给浏览器</li><li>服务器会对 session 进行签名；无法通过 session 推断出密码</li></ul><br><h1 id="token-jwt-json-web-token" tabindex="-1"><a class="header-anchor" href="#token-jwt-json-web-token" aria-hidden="true">#</a> Token（JWT，Json Web Token）</h1><ul><li>token 是由后端生成的，但是后端只保存 token 的签名密文</li><li>token 存储在浏览器的 cookie 或 storage 中</li><li>token 组成：header.payload.signature <ul><li>header：声明需要适合用什么算法生成签名</li><li>payload：特定的数据</li><li>signature：签名信息，生成过程为：header 和 payload 进行 base64 编码（容易解码），服务器将保存的用户的密码和被编码的 header 和 payload 一起经过特定的加密算法（即 header 声明的算法）加密得到 signature</li></ul></li></ul><p>注：无论是 session 还是 token，被拿到了都可以登录对应的账户，但是一旦过期了就必须重新登录</p>',10),t=[n];function l(r,d){return i(),a("div",null,t)}const c=e(s,[["render",l],["__file","登录状态保存-未发布.html.vue"]]);export{c as default};
