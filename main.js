// import modules
require('functions');
require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleTower   = require('tower');
var roleCarry   = require('role.carry');

module.exports.loop = function () {
    // bind harvester to an active source.
    var allSources = Game.rooms.E72S39.find(FIND_SOURCES_ACTIVE);




    roleTower.run("E72S39");
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }

    // for every creep name in Game.creeps
    for (let name in Game.creeps) {

        // get the creep object
        var creep = Game.creeps[name];

        // if creep is harvester, call harvester script
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
            // if creep is upgrader, call upgrader script
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
            // if creep is builder, call builder script
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        else if (creep.memory.role == 'carry') {
            roleCarry.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }


       /* var containers = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (c) => c.structureType == STRUCTURE_CONTAINER
                            && (_.sum(c.store)) < c.storageCapacity
        });
        for (let foo in containers) {
            console.log(_.sum(foo.store + "/" + foo.storageCapacity));
        };*/
    }

    // setup some minimum numbers for different roles
    var minimumNumberOfHarvesters = 2;
    var minimumNumberOfUpgraders = 1;
    var minimumNumberOfBuilders = 2;
    var minimumNumberOfRepairers = 1;
    var minimumNumberOfCarrier = 1;

    // count the number of creeps alive for each role
    // _.sum will count the number of properties in Game.creeps filtered by the
    //  arrow function, which checks for the creep being a harvester
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
    var numberOfCarriers = _.sum(Game.creeps, (c) => c.memory.role == 'carry');

    var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
    var name = undefined;

    // define which source the harveste go to.
    if(numberOfHarvesters % 1) {
        var sourceid = allSources[0].id;

    } else {
        var sourceid = allSources[1].id;
    }


    // if not enough harvesters
    if (numberOfHarvesters < minimumNumberOfHarvesters) {
        // try to spawn one
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester', sourceid);

        // if spawning failed and we have no harvesters left
        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
            // spawn one with what is available
            name = Game.spawns.Spawn1.createCustomCreep(
                Game.spawns.Spawn1.room.energyAvailable, 'harvester', sourceid);
        }
    }
    else if (numberOfCarriers < minimumNumberOfCarrier) {
        // try to spawn one
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'carry');
    }
        // if not enough upgraders
    else if (numberOfUpgraders < minimumNumberOfUpgraders) {
        // try to spawn one
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader');
    }
        // if not enough repairers
    else if (numberOfRepairers < minimumNumberOfRepairers) {
        // try to spawn one
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'repairer');
    }
        // if not enough builders
    else if (numberOfBuilders < minimumNumberOfBuilders) {
        // try to spawn one
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    }

    //else {
        // else try to spawn a builder
      //  name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    //}

    // print name to console if spawning was a success
    // name > 0 would not work since string > 0 returns false
    //if (!(name < 0)) {
      //  console.log("Spawned new creep: " + name);
    //}
};
