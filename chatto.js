Messages = new Meteor.Collection('messages');

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.history.messages = function () {
    return Messages.find({}, {sort: {cdate: -1}, limit: 30});
  }

  Template.send.events({
      'click #send': function (evt, tmpl) {
        Messages.insert({
            user_name: tmpl.find('#user_name').value,
            message: tmpl.find('#message').value,
            cdate: new Date()
        });
      }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    if(Messages.find().count() === 0) {
      Messages.insert(
        {user_name: "ADMIN", message: "Welcome to TheCat's chat system", date: new Date()}
      );
    }
  });
}
