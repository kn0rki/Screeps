function getAllProperties(obj) {
  var properties = '';
  for (property in obj) {
    properties += '\n' + property;
  }
  alert('Properties of object:' + properties);
}
