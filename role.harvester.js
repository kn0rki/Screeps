var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
module.exports = {
    // a function to run the logic for this role
    run: function (creep) {
        var numberOfCarriers =   _.sum(Game.creeps, (c) => c.memory.role == 'carry');
        // if creep is bringing energy to the spawn or an extension but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
            // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
            //creep.drop(RESOURCE_ENERGY);
        }

        // if creep is supposed to transfer energy to the spawn or an extension
        if (creep.memory.working == true) {
               //find closest container which is not full
            var storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (c) => c.structureType == STRUCTURE_STORAGE
            });

            // find closest spawn or extension which is not full
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => (s.structureType == STRUCTURE_EXTENSION
                             || s.structureType == STRUCTURE_SPAWN
                             || s.structureType == STRUCTURE_TOWER)
                             && s.energy < s.energyCapacity
            });

/*
            if(numberOfCarriers == 0){
                console.log("no carry");
            } else {
                if(creep.carry.energy == creep.carryCapacity) {
                    creep.drop(RESOURCE_ENERGY);
                  // console.log(creep.name + " else");
                }
            }*/





            // if we found one
            if (structure != undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                    creep.memory.curTask = "bringIn";
                }
            } else if (storage != undefined) {
                if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(storage);
                }
            } else {
                //roleBuilder.run(creep);
                //creep.drop(RESOURCE_ENERGY);
            }
        } else {
            // use energy containers before source
            var containers = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER
            });
            // find source from memory.id
            var source = Game.getObjectById(creep.memory.id)
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
                creep.memory.curTask = "moveForHarvest";
            }
            // if(creep.carry.energy == creep.carryCapacity) {
              //  creep.drop(RESOURCE_ENERGY);
            //}
        }
    }
};
