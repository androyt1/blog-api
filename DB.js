const mongoos = require('mongoose');
const DB=process.env.MONGO_URL

//connect mongoose
const ConnectDB = async () => {
    try {
        await mongoos.connect(DB, {
            useNewUrlParser: true,            
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = ConnectDB;