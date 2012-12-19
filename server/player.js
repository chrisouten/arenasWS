var cls = require("./class");
    

module.exports = Player = cls.Class.extend({
    init: function(server, connection) {
        var self = this;
        console.log('making player');
        this.server = server;
        this.connection = connection;
        this.connection.on('message', function(message) {
            console.log('player got message');
            console.log(message);
            self.on_message(message);
        });
        this.authenticated = false;

    },

    send: function(message) {
        this.connection.send(JSON.stringify(message));
    },

    send_error_message: function(error_msg) {
        var error_message = {
            'type':99,
            'message': error_msg
        };
        this.send(error_message);
    },

    send_need_auth_message: function() {
        this.send_error_message('You need to be authenticated for that action');
    },

    on_message: function(message) {
        var msg = JSON.parse(message);
        if (msg.type == 0) {
            this.process_hello(msg);    
        }
        else if (msg.type == 2) {
            this.process_join_game(msg);
        }
    },

    process_hello: function(message) {
        this.name = message.name;
        var valid = this.server.add_player(this);
        if (valid) {
            var welcome_msg = {'type':1};
            this.send(welcome_msg);
        } else {
            this.send_error_message("That name is already taken");
        }
    },

    process_join_game: function(msg) {
        var game = this.server.join_game(this);
        this.current_game = game;
        var joined_game_msg = {};
        joined_game_msg.type = 3;
        joined_game_msg.game_id = this.current_game.id;
        this.send(joined_game_msg);

    }

    
    
});