var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var numCreeps = Game.spawns["Spawn1"].room.find(FIND_MY_CREEPS);
    //console.log("Creep Anzahl " + numCreeps.length);

     if(numCreeps.length < 5) {
            //console.log("Creating new Harvester");
            Game.spawns["Spawn1"].createCreep([WORK, CARRY, MOVE], null, {role: "harvester"});
        } else {
           // console.log("test");
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

       if(Game.spawns["Spawn1"].energy === Game.spawns["Spawn1"].energyCapacity) {
            roleUpgrader.run(creep);
        } else {
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
        }
       
        
    }
}