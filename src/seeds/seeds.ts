import mongoose from 'mongoose';
import connectDB from '../config/connection';
import User from '../models/user';
import Thought from '../models/thought';

const seedData = async () => {
  await connectDB();

  // Clear existing data
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Seed users
  const users = await User.insertMany([
    {
      username: 'user1',
      email: 'user1@example.com',
      thoughts: [],
      friends: []
    },
    {
      username: 'user2',
      email: 'user2@example.com',
      thoughts: [],
      friends: []
    },
    {
      username: 'user3',
      email: 'user3@example.com',
      thoughts: [],
      friends: []
    },
    {
      username: 'user4',
      email: 'user4@example.com',
      thoughts: [],
      friends: []
    }
  ]);

  // Seed thoughts
  const thoughts = await Thought.insertMany([
    {
      thoughtText: 'This is a thought from user1',
      username: 'user1',
      reactions: []
    },
    {
      thoughtText: 'This is a thought from user2',
      username: 'user2',
      reactions: []
    },
    {
      thoughtText: 'Another thought from user1',
      username: 'user1',
      reactions: []
    },
    {
      thoughtText: 'This is a thought from user3',
      username: 'user3',
      reactions: []
    },
    {
      thoughtText: 'This is a thought from user4',
      username: 'user4',
      reactions: []
    }
  ]);

  // Update users with thoughts
  await User.findByIdAndUpdate(users[0]._id, { $push: { thoughts: [thoughts[0]._id, thoughts[2]._id] } });
  await User.findByIdAndUpdate(users[1]._id, { $push: { thoughts: thoughts[1]._id } });
  await User.findByIdAndUpdate(users[2]._id, { $push: { thoughts: thoughts[3]._id } });
  await User.findByIdAndUpdate(users[3]._id, { $push: { thoughts: thoughts[4]._id } });

  console.log('Database seeded!');
  mongoose.connection.close();
};

seedData().catch(err => {
  console.error(err);
  mongoose.connection.close();
});