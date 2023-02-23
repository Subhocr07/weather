const weatherSchema = new mongoose.Schema(
  {
    city: String,
    description: String,
    temperature: Number,
    feelsLike: Number,
    humidity: Number,
    pressure: Number,
  },
  { timestamps: true }
);
