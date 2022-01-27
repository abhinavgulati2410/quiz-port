const mongoose = require("mongoose");
const schema = mongoose.Schema;

const { ObjectId } = mongoose.Schema.Types;

const studentSchema = new schema({
    _id: {
        type: Number,
        required: [true, "Please add a registration Number"],
    },
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please enter an email!"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
    },
    quizes: [
        {
            type: ObjectId,
            ref: "Quizes",
        },
    ],
    courses: [
        {
            type: ObjectId,
            ref: "Course",
        },
    ],
    type: {
        type: String,
        default: "user",
    },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
