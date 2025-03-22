import promptSync from "prompt-sync";
const prompt = promptSync();
import mongoose from "mongoose";
import Customer from "./model/customer.js";
import "dotenv/config";

console.log("Welcome to the CRM.");
mongoose.connect(process.env.MONGODB_URI);

const createCustomer = async () => {
  const customerName = prompt("What is their name?");
  let customerAge = prompt("What is their age?");
  customerAge = Number(customerAge);

  const customerData = {
    name: customerName,
    age: customerAge,
  };

  const customer = await Customer.create(customerData);
  console.log("New Customer: " + customer);
}

const viewCustomers = async () => {
  const customers = await Customer.find({});
  console.log("All customers: " + customers);
}

const userAction = async () => {
  console.log("What would you like to do? Type the number of chosen action \n 1. Create a customer. \n 2. View all customers. \n 3.Update a customer. \n 4.Delete a customer. \n 5.Quit.");
  const userChoice = await prompt();
  if (userChoice === "1"){
    createCustomer();
    setTimeout(userAction(), "3000");
  } else if (userChoice === "2"){
    viewCustomers();
    setTimeout(userAction(), "3000");
  } else if (userChoice === "3"){

  } else if (userChoice == "4"){

  } else if (userChoice === "5"){
    console.log("Exiting....");
    await mongoose.disconnect();
  } else {
    console.log("This is not an option.");
    userAction();
  }

}

userAction();

