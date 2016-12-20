
module.exports = {
    // a function to run the logic for this role
    run: function (creep) {
        // if creep is bringing energy to the spawn or an extension but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
            // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy > 0) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to the spawn or an extension
        if (creep.memory.working == true) {
            //console.log(creep.name + " else");
            creep.drop(RESOURCE_ENERGY);



          /*  //find closest container which is not full
            var containers = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (c) => c.structureType == STRUCTURE_CONTAINER
            });

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


            // if we found one
            if (structure != undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                    //console.log(creep.name + " bring to spawn/ext");
                }
            } else if (containers != undefined) {
                console.log(creep.name + ": container found");
                if (creep.transfer(containers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(containers);
                    console.log(creep.name + ": bring to container");
                }

            } else {
                console.log(creep.name + ":  idle");
            }*/
        }

        else {


            // use energy containers before source
            var containers = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER
                            && s.store[RESOURCE_ENERGY] < s.storageCapacity
            });

            // find closest source
            var source = Game.getObjectById(creep.memory.id)
            // try to harvest energy, if the source is not in range

            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);

            }

        }
    }
};
