module.exports = function() {
    var addMemmory = "source: sourceid";
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName, sourceid) {
            // create a balanced body as big as possible with the given energy
            var body = [];
            var numberOfParts = Math.floor(energy / 200);
            var id = Math.floor((Math.random() * 1000) + 1);
            var name = roleName + '-' + id;
            if(roleName == "carry"){
                numberOfParts = Math.floor(energy / 100);
                // carry role doesnt need a "work" bodypart
                for (let i = 0; i < numberOfParts; i++) {
                    body.push(CARRY);
                }
                for (let i = 0; i < numberOfParts; i++) {
                    body.push(MOVE);
                }
            } else if(roleName == "harvester"){
                // 3xMOVE, 1x CARRY, 5xWORK
                for (let i = 0; i < 3; i++) {
                    body.push(MOVE);
                }
                body.push(CARRY);
                for (let i = 0; i < 5; i++) {
                    body.push(WORK);
                }

            } else {
                for (let i = 0; i < numberOfParts; i++) {
                    body.push(WORK);
                }
                for (let i = 0; i < numberOfParts; i++) {
                    body.push(CARRY);
                }
                for (let i = 0; i < numberOfParts; i++) {
                    body.push(MOVE);
                }
            }
            // create creep with the created body and the given role

            return this.createCreep(body, name, { role: roleName, working: false, gohome: false, id: sourceid, curTask: "spawning" });
        };
};
