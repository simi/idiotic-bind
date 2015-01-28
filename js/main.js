function User( uid ) {
  var binder = new DataBinder( uid ),

  user = {
    attributes: {
    },

    // The attribute setter publish changes using the DataBinder PubSub
    set: function( attr_name, val ) {
      this.attributes[ attr_name ] = val;
      this.refreshAll();
    },

    get: function( attr_name ) {
      return this.attributes[ attr_name ].call();
    },

    refreshAll: function() {
      for(var key in this.attributes) {
        binder.trigger( uid + ":change", [ key, this.attributes[key], this ] );
      }
    },

    _binder: binder
  };

  // Subscribe to the PubSub
  binder.on( uid + ":change", function( evt, attr_name, new_val, initiator ) {
    if ( initiator !== user ) {
      user.set( attr_name, new_val );
    }
  });

  // set defaults
  user.set('fullname', function() {
    return user.attributes.firstname + ' ' + user.attributes.lastname;
  });

  return user;
}

// javascript
var user = new User( 'user123' );
user.set( "firstname", "Josef" );
user.set( "lastname", "Šlendr" );
