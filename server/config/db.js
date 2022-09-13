import mongoose from "mongoose";

const connectdb = () => {
    mongoose.connect(process.env.DB_URI).then((data) => {
        console.log(`Mongodb sucessfully connected at : ${data.connection.host}`);
    });
}

export default connectdb;