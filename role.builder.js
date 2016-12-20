var roleUpgrader = require('role.upgrader');

module.exports = {
    // a function to run the logic for this role
    run: function (creep) {
        // if creep is trying to complete a constructionSite but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
            // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to complete a constructionSite
        if (creep.memory.working == true) {
            // find closest constructionSite
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            // if one is found
            if (constructionSite != undefined) {
                // try to build, if the constructionSite is not in range
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    // move towards the constructionSite
                    creep.moveTo(constructionSite);
                }
            }
                // if no constructionSite is found
            else {
                // go upgrading the controller
                roleUpgrader.run(creep);
            }
        }
            // if creep is supposed to harvest energy from source
        else {
            // find dropped energy in the room and pickup rather than from source (in case a creep dies somewhere in the room)
            var droppedResources = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
            // use energy containers before source
            var containers = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER
                            && s.store[RESOURCE_ENERGY] > 0
            });

            if (containers != undefined) {
                //console.log("Pickup from container: " + creep.memory.role + " " + creep.name);
                if (creep.withdraw(containers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers);
                }

            } else {
                if (droppedResources != undefined) {
                    if (creep.pickup(droppedResources) == ERR_NOT_IN_RANGE) {
                        // move towards the source
                        creep.moveTo(droppedResources);
                        console.log(creep.name + " move to dropped resources");
                    }

                }
               /* console.log("harvests from source: "  + creep.name);
                // if creep is supposed to harvest energy from source
                //console.log("Drop res is undefined");
                // find closest source
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                // try to harvest energy, if the source is not in range
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(source);
                }*/
           }
        }
    }
};
