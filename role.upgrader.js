module.exports = {
    // a function to run the logic for this role
    run: function (creep) {
        // if creep is bringing energy to the controller but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
            // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to the controller
        if (creep.memory.working == true) {
            // instead of upgraderController we could also use:
            // if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
               // var foo = creep.moveTo(9,38);
            // try to upgrade the controller
            if (creep.upgradeController(Game.rooms.E75S38.controller) == ERR_NOT_IN_RANGE) {
                // if not in range, move towards the controller
                creep.moveTo(Game.rooms.E75S38.controller);
            }

        }
            // if creep is supposed to harvest energy from source
        else {
            // find dropped energy in the room and pickup rather than from source (in case a creep dies somewhere in the room)
            var droppedResources = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
            // use energy containers before source
            var containers = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_STORAGE)

            });

             if (containers != undefined) {
                if (creep.withdraw(containers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers);
                }
            } else {
                // use energy containers before source


                 if (containers != undefined) {
                    if (creep.withdraw(containers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containers);
                    }

                 }
               // console.log(creep.name + ":" + creep.memory.role + ": ll");
               // var foo = creep.moveTo(9,38);
               // console.log(foo + "----");
                var posX = creep.pos.x;
                var posY = creep.pos.y;

               // if(posX == 9 && posY == 38) {
                  //  console.log(creep.name + ":" + creep.memory.role + " pickup from container");
                    //var picked = creep.pickup(droppedResources);
                /*} else {
                     //console.log("harvests from source: " + creep.name);
                    // if creep is supposed to harvest energy from source
                    //console.log("Drop res is undefined");
                    // find closest source*/
                    var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                    // try to harvest energy, if the source is not in range
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        // move towards the source
                        creep.moveTo(source);
                    }
                //}
            }
        }
    }
};
