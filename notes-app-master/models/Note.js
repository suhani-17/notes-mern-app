const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
{
    title: { 
        type: String, required: true 
    },
    content: { 
        type: String, required: true 
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true 
    },
    sharedWith: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    versionHistory: [
      {
        timestamp: { 
            type: Date, 
            default: Date.now },
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' },
        changes: { 
            type: String 
        },
      },
    ],
  
}, 
{ 
    timestamps: true 
});

module.exports = mongoose.model('Note', noteSchema);
