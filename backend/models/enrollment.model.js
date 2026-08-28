const mongoose = require("mongoose")

const enrollmentschema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "userId is required"]
    },

    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "courseId is required"]
    },

    enrolledAt: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: {
            values: ["active", "cancelled"],
            message: "status must be active or cancelled"
        },
        default: "active"
    }

}, { timestamps: true })

module.exports = mongoose.model("Enrollments", enrollmentschema)