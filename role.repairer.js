var roleBuilder = require('role.builder');

module.exports = {
    // a function to run the logic for this role
    run: function (creep) {
        // if creep is trying to repair something but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
            // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to repair something
        if (creep.memory.working == true) {
            // find closest structure with less than max hits
            // Exclude walls because they have way too many max hits and would keep
            // our repairers busy forever. We have to find a solution for that later.
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            });

            var wall = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => s.hits < s.hitsMax && s.structureType == STRUCTURE_WALL
            });

            // if we find one
            if (structure != undefined) {
                // try to repair it, if it is out of range
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                }
            } else if(wall != undefined) {
                console.log("wall found");
                if (creep.repair(wall) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(wall);
                }
            } else {
                // look for construction sites
                roleBuilder.run(creep);
            }
        }
            // if creep is supposed to harvest energy from source
        else {
            // container search
            var containers = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_STORAGE
            });
            // use energy containers before source
            if (containers != undefined) {
                //console.log(creep.name + ":" + creep.memory.role + " pickup from container");
                if (creep.withdraw(containers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers);
                }

            } else {
                 // if creep is supposed to harvest energy from source
               // find closest source
               var source = Game.getObjectById("5836b8e78b8b9619519f2dde");
               // try to harvest energy, if the source is not in range
               if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                   // move towards the source
                   creep.moveTo(source);
               }
            }
        }
    }
};
