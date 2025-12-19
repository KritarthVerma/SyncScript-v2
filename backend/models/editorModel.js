import mongoose from "mongoose";

const editorSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      default: "cpp", // default editor language
    },

    content: {
      type: String,
      default: "", // initial code
    },
  },
  { timestamps: true }
);

export default mongoose.model("Editor", editorSchema);
