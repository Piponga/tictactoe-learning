var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
 
var app = express();
var jsonParser = bodyParser.json();

// app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public", {extensions:['html']}));

// get games list for menu
app.get("/games/list", function (req, res) {
    var content = fs.readFileSync("games.json", "utf8");
    var games = JSON.parse(content);
    res.send(games);
});

app.post("/games/new", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    var userName = req.body.userName;
    var fieldSize = req.body.size;
    var newGame = {
        gameToken: '0',
        owner: userName,
        opponent: '',
        size: fieldSize,
        gameDuration: 0,
        gameResult: '',
        state: 'ready'
    };

    var data = fs.readFileSync('games.json', 'utf8');
    var games = JSON.parse(data);

    var gameToken = 0;
    for(var i=0; i< games.games.length; i++) {
        gameToken = Math.max(gameToken, games.games[i].gameToken);
    }
    newGame.gameToken = gameToken + 1 + '';

    games.games.unshift(newGame);
    var data = JSON.stringify(games);

    fs.writeFileSync('games.json', data);
    res.send({
        "status": "ok",
        "code": 0,
        "accessToken": "768b762c8c28",
        "gameToken": "" + gameToken
    });

});





app.listen(3000, function () {
    console.log('Server waiting for any connections...');
});