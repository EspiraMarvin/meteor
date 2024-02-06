import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../imports/api/TasksCollection";

const insertTask = (taskText) => TasksCollection.insert({ text: taskText });

async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

Meteor.startup(async () => {
  if (TasksCollection.find().count() == 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach(insertTask);
  }

  // We publish the entire tasks collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("tasks", function () {
    return TasksCollection.find();
  });
});
