import subscriber from './room/subscriber';
import Room from './room/room';

window.addEventListener("load", () => {
  console.log('application loaded');
  let room = new Room('lobby');
  room.ready.then(obj => {
    room.channel.push("new:msg", {user: 'a', body: 'body'})
    subscriber(room.channel);
  });
});
