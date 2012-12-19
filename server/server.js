var WebSocketServer = require('ws').Server,
    Player = require('./player'),
    Game = require('./game');

var port = 8092;
var wss = new WebSocketServer({port:port});


wss.players = {};
wss.games = {};

var game_id = 0;

wss.add_player = function(player) {
    if (wss.players[player.name] === undefined) {
        wss.players[player.name] = player;
        return true;
    } else {
        return false;
    }
};

wss.join_game = function(player) {
    var game_to_join = null;
    Object.keys(wss.games).forEach(function(key) {
        var game = wss.games[key];
        if (game.is_full === false) {
            game_to_join = game;
        }
    });
    if (game_to_join === null) {
        game_to_join = wss.create_game(player);
    }
    return game_to_join;
};

wss.create_game = function(player) {
    var new_game = new Game(player, game_id);
    game_id++;
    console.log("creating new game");
    return new_game;
};

console.log('Listening on');
wss.on('connection', function(ws) {
    console.log('someone connected');
    ws.player = new Player(wss, ws);
});
