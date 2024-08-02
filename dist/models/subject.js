import mongoose from 'mongoose';
var Schema = mongoose.Schema;
// Schema for topics
var topicSchema = new Schema({
    topicName: {
        type: String,
        required: true
    }
});
// Schema for subjects
var subjectSchema = new Schema({
    std: {
        type: Number,
        required: true
    },
    subName: {
        type: String,
        required: true
    },
    topics: [topicSchema] // Embedding topics schema here
});
// Schema for student details and their subject progress
var SubjectDetailsSchema = new Schema({
    //   studentId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Student',  // Assuming you have a Student model
    //     required: true
    //   },
    std: {
        type: Number,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    subjects: [{
            subjectName: {
                type: String,
                ref: 'Subject', // Referring to the Subject model
                required: true
            },
            topics: [{
                    topicName: {
                        type: String,
                        ref: 'Topic', // Referring to the Topic model
                        required: true
                    },
                    completed: {
                        type: Boolean,
                        default: false
                    }
                }]
        }]
});
var Subject = mongoose.model('Subject', subjectSchema);
var SubjectDetails = mongoose.model('StudentSubjectDetails', SubjectDetailsSchema);
export { Subject, SubjectDetails };
