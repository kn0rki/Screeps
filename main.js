var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleHealer = require('role.healer');
var roleBuilder = require('role.builder');

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
            console.log("Creating new Harvester");
            Game.spawns["Spawn1"].createCreep([WORK, CARRY, MOVE], null, {role: "harvester"});
        } else {
           // console.log("test");
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var carryTotal = _.sum(creep.carry);
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
        });
        console.log(creep.name + " " + carryTotal + "/" +creep.carryCapacity);

       if(Game.spawns["Spawn1"].energy === Game.spawns["Spawn1"].energyCapacity) {
         
           //if(carryTotal > 0){
                roleBuilder.run(creep);
                creep.say("Builder");
            //}
            
        
       } else {
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
                creep.say("Harvester");
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
        }
       
        
    }

    
    if(targets.length > 0) {
    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0]);    
    }
}

}