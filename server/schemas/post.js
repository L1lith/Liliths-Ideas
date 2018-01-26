module.exports = {
  content: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: [],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
}
