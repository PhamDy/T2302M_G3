app.service('myService', function() {
    var data = {};
  
    return {
      getData: function() {
        return data;
      },
      setData: function(newData) {
        data = newData;
      }
    };
  });
  