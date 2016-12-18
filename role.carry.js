
module.exports = {
    // a function to run the logic for this role
    run: function (creep) {
        // if creep is bringing energy to the spawn or an extension but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
            // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to the spawn or an extension
        if (creep.memory.working == true) {
            // find closest spawn or extension which is not full
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => ((s.structureType == STRUCTURE_SPAWN
                             || s.structureType == STRUCTURE_EXTENSION)
                             && s.energy < s.energyCapacity)
            });

                      
            // if we found one
            if (structure != undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                    //console.log(creep.name + " bring to spawn/ext");
                }
            }  else {
                roleRepairer.run(creep);
                console.log(creep.name + ":  idle");
            }
        }
           
        else {

            // find dropped energy in the room and pickup rather than from source (in case a creep dies somewhere in the room)
            var droppedResources = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
            // use energy containers before source
            if (droppedResources != undefined) {
                //console.log(creep.name + ":" + creep.memory.role + " founds dropped energy");
                if (creep.pickup(droppedResources) == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(droppedResources);
                }
                //if any containers found
            } /*else if (containers != undefined) {
            //should the harvester pickup from containers to spawn/ext?
                console.log(creep.name + " pickup from container");
                if(creep.withdraw(containers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers);
                }
                
            }*/ else {
                //console.log(creep.name + ":" + creep.memory.role + ": harvests from source");
                // if creep is supposed to harvest energy from source
                //console.log("Drop res is undefined");
                // find closest source
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                // try to harvest energy, if the source is not in range
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(source);
                }
            }
        }
    }
};