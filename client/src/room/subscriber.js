let handlerLookup = {
  "new:msg": msg => {
    console.log(msg);
  },

  "user:entered": msg => {
    var username = msg.user || "anonymous";
    console.log(`[${username} entered]`);
  }
};

export default function(chan) {
  Object.keys(handlerLookup).map(key => {
    chan.on(key, handlerLookup[key]);
  });
}
