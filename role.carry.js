
module.exports = {
    // a function to run the logic for this role
    run: function (creep) {
         if(Game.getObjectById(creep.memory.id)) {
             var base = Game.getObjectById(creep.memory.id);
        };
        var posX = creep.pos.x;
        var posY = creep.pos.y;
        // if creep is bringing energy to the spawn or an extension but has no energy left
        if ((creep.memory.working == true) && (creep.carry.energy == 0)) {
            // switch state
            creep.memory.working = false;
            creep.memory.curTask = "Loading";
        }
            // if creep is harvesting energy but is full
        else if ((creep.memory.working == false) && (_.sum(creep.carry) == creep.carryCapacity)) {
            // switch state
            creep.memory.working = true;
            creep.memory.curTask = "unloading";
        }

        // if creep is supposed to transfer energy to the spawn or an extension
        if (creep.memory.working == true) {
            // find nearest carry creep with 0 energy
            var nearestEmptyCarry = creep.pos.findInRange(FIND_MY_CREEPS,1, {
                filter: (oc) => (oc.memory.role == "carry")
            });
            if(nearestEmptyCarry != undefined) {
                console.log(creep.name + " true " + nearestEmptyCarry);
                creep.say("hi");
            } else {
                console.log(creep.name + " else " +nearestEmptyCarry);
            }


            // find closest spawn or extension which is not full
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => ((s.structureType == STRUCTURE_SPAWN
                             || s.structureType == STRUCTURE_EXTENSION
                             || s.structureType == STRUCTURE_TOWER)
                             && s.energy < s.energyCapacity)
            });
             var storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (c) => c.structureType == STRUCTURE_STORAGE
            });

            // if we found one
            if (structure != undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                    creep.memory.curTask = "movingStructure";
                }
            }  else if(storage != undefined){
                for(var resourceType in creep.carry) {
                    if (creep.transfer(storage, resourceType) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(storage);
                    creep.memory.curTask = "movingStorage";
                    }
                }
            }
        } else {

            var storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (c) => c.structureType == STRUCTURE_CONTAINER
            });

            // find dropped energy in the room and pickup rather than from source (in case a creep dies somewhere in the room)
            var droppedResources = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
            // use energy storage before source
            if ((droppedResources != undefined) && (creep.memory.gohome != true)) {
                if (creep.pickup(droppedResources) == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(droppedResources);
                    //console.log(creep.name + " move to dropped resources");
                    }
                } else if(base != undefined){
                        creep.moveTo(base);
                      //  console.log(creep.name + ": move to Base");
                    if(creep.pos.inRangeTo(base,1)) {
                        creep.memory.gohome = false;
                       //console.log(creep.name + ": base erreicht gohome false");
                    }
                } else{
                    //console.log(creep.name + " else")
                ;}
                //if any storage found
            }/* else if (storage != undefined) {
            //should the harvester pickup from storage to spawn/ext?
                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }*/
    }
};
