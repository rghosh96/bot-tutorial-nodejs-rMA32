var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var str = "♬ ᴄᴏᴍᴍᴀɴᴅs! ♬ \n~version : see when was last updated \n~duty : view duty calendar \n~mood : surprise! \n~corgis: for a smile :) \n~instagram: NWQ official IG \n~Which RA? : draw for a lucky RA! \n~important dates : list of fall 2019 breaks, holidays, etc";
var fall = "☀ 𝕗𝕒𝕝𝕝 2019 ☀ \nAug 26: First day of classes \nSep 2: Labor Day \nOct 21-22: Fall Break \nNov 27-29: Thanksgiving Break/Holiday \nDec 13: Dead Day xx"

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      someMood = /^~mood/; someCorgi = /^~corgis/; nwqIG = /^~instagram/; commandList = /^~commands/; 
      chooseRA = /^~Which RA?/; dates = /^~important dates/; calendar = /^~duty/;
      update = /^~version/;
      c1 = 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/25201637/day_2_dec_14_085.jpg'; c2 = 'https://en.wikipedia.org/wiki/Welsh_Corgi#/media/File:WelshCorgi.jpeg'
      c3 = 'https://thehappypuppysite.com/wp-content/uploads/2018/10/miniature-corgi-long.jpg';

  if(request.text && someMood.test(request.text)) {
    this.res.writeHead(200);
    postMessage(cool());
    this.res.end();
  }
  
 else if(request.text && update.test(request.text)) {
    this.res.writeHead(200);
    postMessage("✰ version ✰ 6.26.19");
    this.res.end();
  }
  
  else if(request.text && calendar.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://drive.google.com/file/d/18Kj_3lp9tDZD_dqjhWfLczfk89lp1bMj/view?usp=sharing");
    this.res.end();
  }
  
 else if(request.text && dates.test(request.text)) {
    this.res.writeHead(200);
    postMessage(fall);
    this.res.end();
  }
  
  else if(request.text && chooseRA.test(request.text)) {
    this.res.writeHead(200);
    if (Math.floor(Math.random() * Math.floor(14)) == 0)
      postMessage("it's vincent!");
    else if (Math.floor(Math.random() * Math.floor(14)) == 1)
      postMessage("it's rashi!");
    else if (Math.floor(Math.random() * Math.floor(14)) == 2)
      postMessage("it's abigail!");
    else if (Math.floor(Math.random() * Math.floor(14)) == 3)
      postMessage("it's anna!");
    else if (Math.floor(Math.random() * Math.floor(14)) == 4)
      postMessage("it's christa!");
    else if (Math.floor(Math.random() * Math.floor(14)) == 5)
      postMessage("it's ellie!");
    else if (Math.floor(Math.random() * Math.floor(14)) == 6)
      postMessage("it's grace!");
    else if (Math.floor(Math.random() * Math.floor(14)) == 7)
      postMessage("it's joe!");
    else if (Math.floor(Math.random() * Math.floor(14)) == 8)
      postMessage("it's jordan!");
    else if (Math.floor(Math.random() * Math.floor(14)) == 9)
      postMessage("it's molly!");
    else if (Math.floor(Math.random() * Math.floor(14)) == 10)
      postMessage("it's quincy!");
    else if (Math.floor(Math.random() * Math.floor(14)) == 11)
      postMessage("it's sophia!");
    else if (Math.floor(Math.random() * Math.floor(14)) == 12)
      postMessage("it's trip!");
    else
      postMessage("it's dad???!");
    this.res.end();
  } 
  
  else if(request.text && nwqIG.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://www.instagram.com/uarkquad/?hl=en");
    this.res.end();
  } 
  
  else if(request.text && commandList.test(request.text)) {
    this.res.writeHead(200);
    postMessage(str);
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



exports.respond = respond;
