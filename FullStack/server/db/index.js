const mongoose = require('mongoose');

// Connect to MongoDB
// mongoose.connect('your-mongodb-url');
mongoose.connect(
    'mongodb://localhost:27017/course_selling_app'
).then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
        username:String,
        password:String,
        email: { type: String, required: true },
        purchasedcourses:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title:String,
    description:String,
    imageLink:String,
    price:String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}