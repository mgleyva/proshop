import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // Individual review rating.
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      // User associated with the review
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const productSchema = mongoose.Schema(
  {
    // Fields for product:
    user: {
      // Only admin users can create products.
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // Reference a specific model: Model User, relationship between product and user.
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // Array of review objects
    reviews: [reviewSchema],
    // Average rating of all the ratings.
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
