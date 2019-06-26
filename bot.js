var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var str = "Commands: ";
str.bold();
var res = str + "/mood for a surprise!";

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      someMood = /^\/mood/; someCorgi = /^\/corgis/; nwqIG = /^\/instagram/; commandList = /^\/commands/
      c1 = 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/25201637/day_2_dec_14_085.jpg'; c2 = 'https://en.wikipedia.org/wiki/Welsh_Corgi#/media/File:WelshCorgi.jpeg'
      c3 = 'https://thehappypuppysite.com/wp-content/uploads/2018/10/miniature-corgi-long.jpg';

  if(request.text && someMood.test(request.text)) {
    this.res.writeHead(200);
    postMessage(cool());
    this.res.end();
  }
  else if(request.text && nwqIG.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://www.instagram.com/uarkquad/?hl=en");
    this.res.end();
  } 
  
  else if(request.text && commandList.test(request.text)) {
    this.res.writeHead(200);
    postMessage(res);
    this.res.end();
  }

  else if(request.text && someCorgi.test(request.text)) {
    this.res.writeHead(200);
    if(0.6 >= Math.random() > 0.3)
      postMessage(c1);
    else if(Math.random() >0.6)
      postMessage(c2)
    else
      postMessage(c3);
    this.res.end();
  }
  
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(response) {
  var botResponse,options, body, botReq;

  botResponse = response

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


exports.respond = respond;
