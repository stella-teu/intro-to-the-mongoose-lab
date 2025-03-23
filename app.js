import promptSync from "prompt-sync";
const prompt = promptSync();
import mongoose from "mongoose";
import Customer from "./model/customer.js";
import "dotenv/config";

console.log("Welcome to the CRM.");

const createCustomer = async () => {
  const customerName = prompt("What is their name?\n");
  let customerAge = prompt("What is their age?\n");
  customerAge = Number(customerAge);

  const customerData = {
    name: customerName,
    age: customerAge,
  };

  const customer = await Customer.create(customerData);
  console.log("New Customer: " + customer);
  userAction();
}

const viewCustomers = async () => {
  const customers = await Customer.find({});
  console.log("All customers: " + customers);
  userAction();
}

const updateCustomer = async () => {
  const customers = await Customer.find({});
  console.log("Here is a list of all customers: " + customers);
  console.log("Copy and paste the ID of the customer you'd like to update.");
  const customerId = prompt();
  const updatedCustomer = await Customer.findByIdAndUpdate(customerId);
  const customerName = prompt("What is their new name?\n");
  let customerAge = prompt("What is their new age?\n");
  updatedCustomer.name = customerName;
  updatedCustomer.age = customerAge;
  console.log("Customer changes.")
  await updatedCustomer.save();
  console.log("Customer updated.")
  userAction();
}

const deleteCustomer = async () => {
  const customers = await Customer.find({});
  console.log("Here is a list of all customers: " + customers);
  console.log("Copy and paste the ID of the customer you'd like to delete.");
  const customerId = prompt();
  const deletedCustomer = await Customer.findByIdAndDelete(customerId);
  console.log("Deleted customer: " + deletedCustomer);
  userAction();
}

const userAction = async () => {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("What would you like to do? Type the number of chosen action \n 1. Create a customer. \n 2. View all customers. \n 3. Update a customer. \n 4. Delete a customer. \n 5. Quit.");
  const userChoice = await prompt();
  if (userChoice === "1"){
    createCustomer();
  } else if (userChoice === "2"){
    viewCustomers();
  } else if (userChoice === "3"){
    updateCustomer();
  } else if (userChoice == "4"){
    deleteCustomer();
  } else if (userChoice === "5"){
    console.log("Exiting....");
    await mongoose.connection.close();
  } else {
    console.log("This is not an option.");
    userAction();
  }

}

userAction();

