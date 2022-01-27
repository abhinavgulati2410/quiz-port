const mongoose = require("mongoose");
const schema = mongoose.Schema;

const { ObjectId } = schema.Types;

const coursesSchema = new schema({
    title: {
        type: String,
    },
    uploadDate: {
        type: Date,
    },
    description: {
        type: String,
    },
    courseId: {
        type: String,
    },
    givenBy: {
        type: ObjectId,
        ref: "Teacher",
    },
});

const Course = mongoose.model("Course", coursesSchema);
module.exports = Course;
