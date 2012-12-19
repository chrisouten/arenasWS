var cls = require("./class");
    

module.exports = Game = cls.Class.extend({
    init: function(player, game_id) {
        var self = this;
        this.players = {};
        this.ups = 50;
        this.is_full = false;
        this.players[player.name] = player;
        this.id = game_id;
        setInterval(function() {
            self.game_loop();
            self.processQueues();
        }, 1000 / this.ups);

    },

    game_loop: function() {

    },

    update_players: function(msg) {
        var self = this;
        Object.keys(this.players).forEach(function(key) {
            var player = self.players[key];
            player.send(msg);
        });
    }

    

    
    
});