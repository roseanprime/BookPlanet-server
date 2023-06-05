const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const recommendationsSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book" },
    recommendedBy: { type: Schema.Types.ObjectId, ref: "User" },
    recommendedTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Recommendations = model("Recommendations", recommendationsSchema);

module.exports = Recommendations;