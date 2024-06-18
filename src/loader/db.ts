import mongoose from 'mongoose';
import Users from '../schema/users';
import Actors from '../schema/actors';
import Areas from '../schema/areas';
import Bookmarks from '../schema/bookmarks';
import Castings from '../schema/castings';
import Follows from '../schema/follows';
import Musicals from '../schema/musicals';
import Notifications from '../schema/notifications';
import Review_likes from '../schema/review_likes';
import Reviews from '../schema/reviews';
import Theaters from '../schema/theaters';

const connectDB = async () => {
    
    
    require('dotenv').config();
    const { MONGO_URI } = process.env;

    if (!MONGO_URI) {
        throw new Error('MONGO_URI is not defined.');
    }
    
    try {
    
    await mongoose.connect(MONGO_URI);

    mongoose.set('autoCreate', true);

    Users.createCollection().then(function (collection) {
      console.log('Users Collection is created!');
    });
    Actors.createCollection().then(function (collection) {
      console.log('Actors Collection is created!');
    });
    Areas.createCollection().then(function (collection) {
      console.log('Areas Collection is created!');
    });
    Bookmarks.createCollection().then(function (collection) {
      console.log('Bookmarks Collection is created!');
    });
    Castings.createCollection().then(function (collection) {
      console.log('Castings Collection is created!');
    });
    Follows.createCollection().then(function (collection) {
      console.log('Follows Collection is created!');
    });
    Musicals.createCollection().then(function (collection) {
      console.log('Musicals Collection is created!');
    });
    Notifications.createCollection().then(function (collection) {
      console.log('Notifications Collection is created!');
    });
    Review_likes.createCollection().then(function (collection) {
      console.log('Review_likes Collection is created!');
    });
    Reviews.createCollection().then(function (collection) {
      console.log('Reviews Collection is created!');
    });
    Reviews.createCollection().then(function (collection) {
      console.log('Reviews Collection is created!');
    });
    Theaters.createCollection().then(function (collection) {
      console.log('Theaters Collection is created!');
    });
  } catch (err: any) {
    console.log(err.message);
    process.exit(1);
  }
};

export default connectDB;