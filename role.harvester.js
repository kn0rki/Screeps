var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.carry.energy < creep.carryCapacity) {
            var targets = creep.room.find(FIND_DROPPED_RESOURCES);
            if(targets.length) {
                creep.moveTo(targets[0]);
                creep.pickup(targets[0]);
               // console.log("foo0");
            }else{
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
                //console.log(creep.name + " foo1");
            }
        } else {
            //console.log(creep.name + " foo2");
            var structargets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            //console.log("foo " + structargets.length);
            if(structargets.length > 0) {
                if(creep.transfer(structargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structargets[0]);
                   // console.log("foo " + structargets.length);
                }
            }
        }
    }
};

module.exports = roleHarvester;
