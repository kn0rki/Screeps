var roleHealer = {

    /** @param {Creep} creep **/
    run: function(creep) {
       var structures = game.spawns["Spawn1"].room.find(FIND_STRUCTURES);
       console.log(structures);
    }
};

module.exports = roleHealer;
