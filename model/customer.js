import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;