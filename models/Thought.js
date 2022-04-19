const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: [true, 'Please enter a reaction'],
            trim: true,
            maxLength: [280, 'Reaction must be less than 280 characters'],
        },
        username: {
            type: String,
            required: [true, 'Please enter a username'],
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    }
)


const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        validate: [({ length }) => length > 0 && length <= 280, 'Thoughts can only be between 1 and 280 characters long!']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},

    {
        toJSON: {
            virtuals: true,
            getters: true
        },

    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;