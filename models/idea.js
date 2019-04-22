const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var IdeaSchema = new Schema({
  title:  String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  body:   String,
  comments: [{ author: { type: Schema.Types.ObjectId, ref: 'User' }, body: String, date: { type: Date, default: Date.now } }],
  date: { type: Date, default: Date.now },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Idea', IdeaSchema);