module.exports = {
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: [{type:String,lowercase:true}],
    default: [],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
}
