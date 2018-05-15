import mongoose, { Schema } from 'mongoose';
import slug from 'slug';

const CollectionSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Collection title is requires'],
    minlength: [3, 'Title need to be longer'],
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    required: false,
    minlength: [5, 'Description need to be longer'],
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
  articles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Article',
    }
  ]
}, {
  timestamps: true
});

CollectionSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      description: this.description,
      photo: this.photo,
      user: this.user,
      articles: this.articles,
      createdAt: this.createdAt,
    }
  }
}
