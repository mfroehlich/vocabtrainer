
angular.module('voctrainerApp')
  .constant('dbModel', {
    database : {
      name: 'voctrainerdb',
      version : 21
    },
    accessTypes : {
      readonly: 'readonly',
      readwrite: 'readwrite'
    },
    objectStores: {
      voc: {
        name: 'vocabulary',
        properties: {
          keyPath: 'id',
          autoincrement: false
        },
        indices: {
          voc_by_level: 'voc_by_level'
        }
      }
    },
  });