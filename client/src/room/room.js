import {Socket} from '../vendor/phoenix';

export default class Room {
  ready: Promise;
  channel: phoenix.Channel;
  constructor(roomId){
    let deferred = Promise.defer();
    this.ready = deferred.promise;

    var socket = new Socket("ws://" + location.host +  "/ws")
    socket.connect();
    socket.onClose( e => console.log("CLOSE", e));
    let chan = socket.chan("rooms:" + roomId, {});
    chan.onError( e => console.log("something went wrong", e) )
    chan.onClose( e => console.log("channel closed", e) );
    chan.join("rooms:lobby", {})
    .receive("ok", messages => {
      deferred.resolve(messages)
    })
    .receive("ignore", () => console.log("auth error") )
    .after(10000, () => console.log("Connection interruption") );
    //
    this.channel = chan;
  }
}
