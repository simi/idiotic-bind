function User(uid) {
  var binder = new DataBinder(uid),

  var user = {
    'attributes': {
      'firstname': "Josef",
      'lastname': "Šlendr",
      'fullname': function() {
        return user.attributes.firstname + ' ' + user.attributes.lastname;
      }
    },

    'set': function(attr_name, val) {
      this.attributes[attr_name ] = val;
      this.refreshAll();
    },

    'get': function(attr_name) {
      return this.attributes[attr_name].call();
    },

    'refreshAll': function() {
      var key;
      for(key in this.attributes) {
        binder.trigger(uid + ":change", [key, this.attributes[key], this]);
      }
    },

    '_binder': binder
  };

  // Subscribe to the PubSub
  binder.on( uid + ":change", function(evt, attr_name, new_val, initiator) {
    if (initiator !== user) {
      user.set(attr_name, new_val);
    }
  });

  // load initials
  user.refreshAll();

  return user;
}

// javascript
var user = new User('user123');
// user.set( "firstname", "Josef" );
// user.set( "lastname", "Šlendr" );
