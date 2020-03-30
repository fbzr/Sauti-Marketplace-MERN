const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoUrl = process.env.MONGO_URI;
        await mongoose.connect(mongoUrl, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
        });
        console.log('MongoDB connected...');
    } catch(err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;