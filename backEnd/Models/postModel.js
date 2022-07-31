import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    username: { type: String },
    desc: String,
    likes: [],
    image: String,
    time: { type: Date, default: new Date() },
    comment: [],
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("Posts", postSchema);
export default PostModel;
