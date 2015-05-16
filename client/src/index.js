import {Socket} from "./vendor/phoenix"
class App {
  static init(){
    var socket = new Socket("ws://" + location.host +  "/ws")
    socket.connect();
    socket.onClose( e => console.log("CLOSE", e));
    socket.join("rooms:lobby", {})
      .receive("ignore", () => console.log("auth error") )
      .receive("ok", chan => {
        chan.onError( e => console.log("something went wrong", e) )
        chan.onClose( e => console.log("channel closed", e) );
        chan.push("new:msg", {user: 'a', body: 'body'})
        //receiver
        chan.on("new:msg", msg => {
          console.log(msg);
        });
        chan.on("user:entered", msg => {
          var username = msg.user || "anonymous";
          console.log(`[${username} entered]`);
        });
      })
      .after(10000, () => console.log("Connection interruption") )
  }
}
console.log('application loaded');
window.addEventListener("load", () => App.init() );
