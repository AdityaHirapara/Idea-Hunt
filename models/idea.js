const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var IdeaSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ author: { type: Schema.Types.ObjectId, ref: 'User' }, body: String, date: Date }],
  date: { type: Date, default: Date.now },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Idea', IdeaSchema);