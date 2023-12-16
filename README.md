# El7a2ni

![1111211](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/assets/102230910/677c8951-6d47-4ae7-a34c-cb923035238e)
## Table of contents

- [Project Description](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/blob/main/README.md#project-description)
- [Motivation](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/blob/main/README.md#motivation)
- [Code Styles](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/blob/main/README.md#code-styles)
- [Tools and Frameworks](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/blob/main/README.md#tools-and-frameworks)
- [Build Status](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/blob/main/README.md#build-status)
- [Features](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/blob/main/README.md#features)
- [Code Examples](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/blob/main/README.md#code-examples)
- [Installation](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/blob/main/README.md#installation)
- [API Reference](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/blob/main/README.md#api-reference)
- [Testing](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/blob/main/README.md#testing)
- [How to Contribute](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/blob/main/README.md#how-to-contribute)
- [Credits](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/blob/main/README.md#credits)
- [License](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/blob/main/README.md#license)


## Project Description

#### Title
EL7a2ni
#### Course
Advanced Computer Lab (CSEN 704), Winter 2023
#### Theme
This is a comprehensive software solution designed to enhance the pharmacy experience within the El7a2ny virtual clinic ecosystem. Our goal is to streamline and automate interactions between patients, medical professionals, and pharmacists, providing a seamless and efficient healthcare experience.
#### Overview
This project followed the Agile Methodology; meaning it was split into Sprints, with each Sprint lasting a set amount of time. A fully functioning version of the project, meeting the specified System Requirements, should be submitted and evaluated.
#### Objectives
* Learn how to properly use the Agile Methodology to plan out a project and develop the software.
* Learn the process of following a given set of System Requirements to develop software.
* Learn to research and master the use of the MERN Stack.
* Learn how to work together as a team on GitHub.
## Motivation
In our pursuit of merging learning and practical application, we chose to develop features specific to the pharmacy domain within the El7a2ny virtual clinic ecosystem. This includes innovative functionalities for prescription management, seamless medication ordering, and dynamic communication between pharmacists and patients. Our goal is to enhance the pharmacy experience within the broader virtual clinic platform, streamline interactions, and contribute to a more efficient and cohesive healthcare system.
## Code Styles
The project is formatted using prettier also The project follows the [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) design pattern, MVC is a software architectural pattern commonly used for developing user interfaces that divide the related program logic into three interconnected elements. This is done to separate internal representations of information from the ways information is presented to and accepted by the user, the Files in the backend were divided into the M (models) where the schema of the models exist which represent the core of the database, the C (controller) where the functions needed for the routes exists and the V (views) the view in MERN stack is represented by the react frontend server. Also, the routes in our project were abstracted from the controller function as shown in [API Reference](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/blob/main/README.md#api-reference)
## Tools and Frameworks      
![image](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/assets/102230910/ff8fb74b-2c25-4e4a-9f93-5ce81691de0e)    

The MERN Stack is a popular full-stack JavaScript framework used for building web applications. It consists of four key technologies: MongoDB, Express, React, and Node.js. Here's a breakdown of each component and how the MERN stack works:

MongoDB (M): MongoDB is a NoSQL document database that stores data in JSON-like BSON (Binary JSON) format. It is known for its flexibility and scalability, making it suitable for handling large amounts of unstructured data.

Express.js (E): Express.js is a web application framework for Node.js. It simplifies the process of building robust and scalable web applications by providing a set of features for building web and mobile applications. Express.js is used as the server-side framework in the MERN stack.

React.js (R): React.js is a declarative, efficient, and flexible JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React.js is used for creating dynamic client-side applications in HTML, allowing developers to build complex interfaces through reusable components.

Node.js (N): Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to run JavaScript on the server side. Node.js, along with Express.js, forms the server tier of the MERN stack, handling server-side logic and responding to client requests.
#### How does the MERN stack work?
The MERN architecture allows you to easily construct a 3-tier architecture (frontend, backend, database) entirely using JavaScript and JSON.

![image](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/assets/102230910/f95d6e86-51f3-41f0-a33d-ddd67a2aa0dc)     

 * **React.js** Front-End
The top tier of the MERN stack is React.js, the declarative JavaScript framework for creating dynamic client-side applications in HTML. React lets you build up complex interfaces through simple Components, connect them to data on your backend server, and render them as HTML.

React’s strong suit is handling stateful, data-driven interfaces with minimal code and minimal pain, and it has all the bells and whistles you’d expect from a modern web framework: great support for forms, error handling, events, lists, and more.

- **Express.js** and **Node.js** Server Tier
The next level down is the Express.js server-side framework, running inside a Node.js server. Express.js bills itself as a “fast, unopinionated, minimalist web framework for Node.js,” and that is indeed exactly what it is. Express.js has powerful models for URL routing (matching an incoming URL with a server function), and handling HTTP requests and responses.

By making XML HTTP Requests (XHRs) or GETs or POSTs from your React.js front-end, you can connect to Express.js functions that power your application. Those functions in turn use MongoDB’s Node.js drivers, either via callbacks for using Promises, to access and update data in your MongoDB database.

- **MongoDB**  Database Tier
If your application stores any data (user profiles, content, comments, uploads, events, etc.), then you’re going to want a database that’s just as easy to work with as React, Express, and Node.

That’s where MongoDB comes in: JSON documents created in your React.js front end can be sent to the Express.js server, where they can be processed and (assuming they’re valid) stored directly in MongoDB for later retrieval. Again, if you’re building in the cloud, you’ll want to look at Atlas.
## Build Status
- The project is currently under development and there are some styling problems to be fixed
* Unit tests will be added.

## Features
 #### Our Website User Types:  
 Admin-Pharmacist-Patient-Guest   
 ####  **Admin's Features**  
 As an Admin you can :
 - add another adminstrator
 - remove a pharmacist/patient from the system
 - view all of the information uploaded by a pharmacist to apply to join the platform
 - accept or reject the request of a pharmacist to join the platform
 - view a pharmacist's /patient's information    
 - view a total sales report based on a chosen month
  ####  **Pharmacists Features**    
   As a Pharmacist you can :
- upload and submit required documents upon registration such as ID, pharmacy degree
- view the available quantity, and sales of each medicine
- add a medicine with its details
- upload medicine image
- edit medicine details and price
- archive/ unarchive a medicine
- view a total sales report based on a chosen month
- filter sales report based on a medicine/date
- chat with a doctor
- Receive a notification once a medicine is out of stock on the system and via email
 - View wallet
####  **Patient Features** 
As a Patient you can :
   - add an over the counter medicine in my cart
   - add a prescription medicine to my cart based on my prescription
   - view cart items and edit on them
   - add a new delivery address (or multiple addresses) and choose from them
   - choose to pay with wallet, credit card (using Stripe) or cash on delivery
   - view current and past orders
   - view order details and status
   - view alternatives to a medicine that is out of stock based on main active ingredient
   - chat with a pharmacist
   - View wallet   

   ####  **Guest Features**      
  As an Guest you can :
  - register as a patient using username, name, email, password, date of birth, gender, mobile number, emergency contact ( full name , mobile number, relation to the patient)
  - submit a request to register as a pharmacist using username, name, email, password, date of birth, hourly rate, affiliation (hospital), educational background.
####  **Registered  Features**      
  As a Registered User you can :
  - login with username and password
  - logout
  - change password
  - reset a forgotten password through OTP sent to email
  - view a list of all available medicines (including picture of medicine, price, description)
  - search for medicine based on name
  - filter medicines based on medicinal use



## Code Examples
- To Get All Medicines
```javascript
exports.getAllMedicine = async (req, res) => {
  try {
    const features = new APIFeatures(Medicine.find(), req.query).filter().sort();
    const allMedicine = await features.query;

    res.status(200).json({
      status: 'success',
      results: allMedicine.length,
      data: allMedicine,
    });
  } catch {
    res.status(404).json({
      status: 'fail',
      message: 'err',
    });
  }
};
```
- Add Address
```javascript
exports.addAddress = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user._id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const newAddress = req.body;
    patient.addresses.push(newAddress);
    await patient.save();

    res.status(201).json({ message: 'Address added successfully', address: newAddress });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
```

- View Cart 
```javascript
export default function Checkout() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <CssBaseline />
      <TopNavigation link="/patients/medicines" />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Cart
          </Typography>

          <React.Fragment>
            <Review />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={() => navigate("/patients/checkout")}
                sx={{ mt: 3, ml: 1 }}
              >
                Place order
              </Button>
            </Box>
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}

```

## Installation
- Clone the Project    
```http
git clone https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy 
```
  - Open 2 Terminals
#### Back-End Terminal
- To install packages (You need to change directory to backend first (cd .\backend\)) 
```http
npm i 
```
- To run the Back-End    
```http
npm start 
```
#### Front-End Terminal
- To install packages (You need to change directory to frontend first (cd .\frontend\)) 
```http
npm i 
```
- To run the Back-End    
```http
npm run dev 
```
#### Packages Used
- bcryptjs: 2.4.3 
- body-parser: 1.20.2
- cookie-parser: 1.4.6
- cors: 2.8.5
- dotenv: 16.3.1
- express : 4.18.2
- jsonwebtoken: 9.0.2
- mongoose : 7.6.7
- multer: 1.4.5-lts.1
- nodemailer: 6.9.7
- stripe : 14.4.0

## ScreenShots
**Navigation Bar and Drawer**
![pic1](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/assets/102230910/ea813298-bd4e-4bc0-8e89-0d26980f6010)

**View Medicine**

![WhatsApp Image 2023-12-16 at 5 10 18 PM](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/assets/102230910/7f86bf2d-12d5-40aa-ac39-08bf0ad8091c)

**Items in Cart**
![WhatsApp Image 2023-12-16 at 5 42 37 PM](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/assets/102230910/2a0ff4bc-86d6-47e8-b7fe-1126e970f68c)
**Selecting Shipping Address**
![WhatsApp Image 2023-12-16 at 5 43 30 PM](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/assets/102230910/18ddf8dc-a186-4221-b025-1ccd99e2b490)
**Selecting Payment Method**
![WhatsApp Image 2023-12-16 at 5 43 46 PM](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/assets/102230910/3e5dd9ae-b7f4-41dd-832f-472a41fb1748)
**Review Order**
![WhatsApp Image 2023-12-16 at 5 44 14 PM](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/assets/102230910/20799534-931e-408a-bd38-a77f1d0bd86f)
**The CheckOut**
![WhatsApp Image 2023-12-16 at 5 45 17 PM](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/assets/102230910/ea09987a-cbff-416f-9ee8-11d4ed3b40ef)












## API Reference
### Patient's routes

#### Register as Patient
```http
  POST /register
```

| Parameter              | Type                                | Description                                                      |
| :--------------------- | :---------------------------------- | :--------------------------------------------------------------- |
| `username`             | `string`                 |(Required)  Instructor's username to fetch courses.                           |
| `name`                 | `string`                  |(Required) Patient's name.                                                  |
| `email`                | `string`           | (Required, Unique)Patient's email address.                                         |
| `password`             | `string`                  | (Required)Patient's password.                                              |
| `dateOfBirth`          | `Date`                    | (Required)Patient's date of birth.                                         |
| `gender`               | `string`  | (Required, Enum: ['male', 'female'])Patient's gender.                                           |
| `mobileNumber`         | `string`                 | (Required) Patient's mobile number.                                         |
| `emergencyContact`     | `object`                            | Emergency contact information.                                   |
| `emergencyContact.fullName`           | `string`       | (Required) Full name of the emergency contact.                              |
| `emergencyContact.mobileNumber`      | `string`       | (Required) Mobile number of the emergency contact.                         |
| `emergencyContact.relationToPatient` | `string`       | (Required) Relation of the emergency contact to the patient.               
| `nationalId`           | `number`          |(Required, Unique)  Patient's national ID.                                           |

#### Add To Cart

```http
  POST /addToCart
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Patient|

| body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `medicineName`      | `string` | **Required**. Id of item to fetch |
| `quantity`      | `number` | **Required**. number of items to be added |


#### View My Cart

```http
  GET /viewCart
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Patient|


#### Remove Item From Cart

```http
  PUT /removeFromCart
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Patient|

| body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `medicineId`      | `string` | **Required**. Id of item to fetch |


#### Update Quantity Of Items
```http
  PUT /updateQuantity
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Patient|

| body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `medicineName`      | `string` | **Required**. Id of item to fetch |
| `quantity`      | `number` | **Required**. number of items to be added |


#### Checkout Cart
```http
  POST /checkout
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Patient|


| body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Payment Method`      | `string` | **Required**. Type of Payment|


#### Create Stripe Checkout Session
```http
  POST /createStripeCheckoutSession
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Patient|

| body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `addressId`      | `string` | **Required**. Address of the order|


#### Add New Address
```http
  POST /addAddress
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Patient|


| body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Street`      | `string` | **Required**. the Street Address|
| `City`      | `string` | **Required**. the City Address|
| `Country`      | `string` | **Required**. the Country Address|

#### Get Addresses
```http
  GET /getAddresses
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Patient|

#### View Order
```http
  GET /viewOrder/:orderId
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Patient|

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `orderId`      | `string` | **Required**. the id of order to fetch|

#### Cancel Order
```http
  PUT /cancelOrder/:orderId
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Patient|

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `orderId`      | `string` | **Required**. the id of order to fetch|

#### View All Orders
```http
  GET /viewAllOrders
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Patient|

#### View Wallet
```http
  GET /viewWallet
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Patient|

#### View All Medicines
```http
  GET /getAllMedicines
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Patient|


#### Search for Medicines by Name
```http
  GET /medicine/searchByNames/:name
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Patient|


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name `     | `string` | **Required** name of medicine to fetch 

#### Search for Medicines by MedicalUses
```http
  GET /medicine/searchByMedicalUses/:medicalUse
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Patient|

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `medicalUse`      | `string` | **Required** medicalUse of medicine to fetch |

### Admin's routes


#### Accept a Pharmacist
```http
  PUT /approvePharmacist
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Admin|

| body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. username of the accepted Pharmacist|

#### Reject a Pharmacist
```http
  PUT /rejectPharmacist
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Admin|

| body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. username of the rejected Pharmacist|

#### Get Patient
```http
  GET /patientView/:id
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Admin|

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required** id of Patient to fetch |

#### Get Pharmacist
```http
  GET /pharmacistView/:id
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Admin|

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required** id of Pharmacist to fetch |

#### View Pending Pharmacists
```http
  GET /pendingRequests
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Admin|

#### Remove Patient
```http
  DELETE /removePatient/:username
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Admin|

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required** username of Patient to fetch |

#### Remove Pharmacist
```http
  DELETE /removePharmacist/:username
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Admin|

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required** username of Pharmacist to fetch |

#### Add new Admin
```http
  POST /addAdmin
  ```
| Body   | Type (Required)   | Description                 |
| :---------- | :----------------- | :-------------------------- |
| `username`  | `string (Yes)`   | Pharmacist's username (Unique).  |
| `password`  |`string (Yes)`   | Pharmacist's password.      |
| `email`     | `string (Yes)`    | Pharmacist's email address. |


### Pharamacy Routes

#### Get All Medicines

```http
  GET /getAllMedicine
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Admin or Pharmacist|

#### Search for medicine by name

```http
  GET /medicine/searchByName/${name}
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Admin or Pharmacist|

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. name of medicine to fetch 

#### Search for medicine by medical use

```http
  GET /medicine/searchByMedicalUse/${medicalUse}
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Bearer token of the Admin or Pharmacist|

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `medicalUse`      | `string` | **Required**. medicalUse of medicine to fetch |
### Pharmacist Routes

#### Register

```http
  POST /register
```
| Parameter              | Type                                | Description                                                      |
| :--------------------- | :---------------------------------- | :--------------------------------------------------------------- |
| `username`             | `string` (Required)                 | Pharmacist's username.                                           |
| `name`                 | `string` (Required)                 | Pharmacist's name.                                               |
| `email`                | `string` (Required, Unique)          | Pharmacist's email address.                                      |
| `password`             | `string` (Required)                 | Pharmacist's password.                                           |
| `dateOfBirth`          | `Date` (Required)                   | Pharmacist's date of birth.       
| `documents`          | `file` (Optional)                   | Pharmacist's documents.                                      |
| `hourlyRate`           | `number` (Required)                 | Pharmacist's hourly rate.                                        |
| `affiliation`          | `string` (Required)                 | Pharmacist's affiliation or organization.                        |
| `educationalBackground`| `string` (Required)                 | Pharmacist's educational background.                             |
| `registrationStatus`   | `string` (Optional, Enum)           | Pharmacist's registration status, one of 'pending', 'accepted', or 'rejected'. Default is 'pending'. |
| `otp`                  | `string` (Optional)                 | One-time password (OTP) for additional authentication.          |

#### Get total sales by month

```http
  GET /totalSales/${month}
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| Authorization      | string | Required Bearer token of the Pharmacist|


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `month`      | `string` | **Required**. month of total sales to fetch

#### Get quantites and sales of medicines 

```http
  GET /quantities
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| Authorization      | string | Required Bearer token of the Pharmacist|

#### Add a new medicine

```http
  POST /addMedicine
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| Authorization      | string | Required Bearer token of the Pharmacist|


| Parameter       | Type (Required)   | Description                                                      |
| :-------------- | :----------------- | :--------------------------------------------------------------- |
| `name`          | `string (Yes)`    | Name of the medicine (Unique).                                   |
| `picture`       | `file (No)`     |  medicine's picture.                                   |
| `price`         | `number (Yes)`    | Price of the medicine (must be >= 0).                            |
| `description`   | `string (No)`     | Description of the medicine.                                      |
| `quantity`      | `number (Yes)`    | Available quantity of the medicine (must be >= 0).              |
| `sales`         | `number (No)`     | Total sales of the medicine (Default is 0, must be >= 0).       |
| `ingredients`   | `string[] (Yes)`  | List of ingredients in the medicine.                             |
| `medicalUse`    | `string (No)`     | Medical use or purpose of the medicine.                          |

#### edit medicine 

```http
  POST /editMedicine/${id}
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| Authorization      | string | Required Bearer token of the Pharmacist|

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of medicine to be editted

### Authentication Routes

#### Login

```http
  POST /Login
```
| Parameter    | Type (Required)   | Description                 |
| :----------- | :----------------- | :-------------------------- |
| `username`   | `string (Yes)`    | Users's username.      |
| `password`   | `string (Yes)`    | User's password.      |

#### Logout

```http
  GET /Logout
```

#### Forget password

```http
  POST /forgetPassword
```
| Body    | Type (Required)   | Description                 |
| :----------- | :----------------- | :-------------------------- |
| `username`   | `string (Yes)`    | Users's username.      |

#### Forget password

```http
  POST /verifyOTP/${username}
```
| Body    | Type (Required)   | Description                 |
| :----------- | :----------------- | :-------------------------- |
| `otp`   | `string (Yes)`    | Users's otp.      |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. Users's username.

#### reset password

```http
  POST /resetPassword/${username}
```
| Body    | Type (Required)   | Description                 |
| :----------- | :----------------- | :-------------------------- |
| `otp`   | `string (Yes)`    | Users's otp.      |
| `password`      | `string(Yes)` |  Users's password.

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. Users's username.

#### change password

```http
  POST /changepassword
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| Authorization      | string | Required Bearer token of the User|

| Body    | Type (Required)   | Description                 |
| :----------- | :----------------- | :-------------------------- |
| `currentPassword`   | `string (Yes)`    | Users's current Password.      |
| `oldPassword`      | `string(Yes)` |  Users's old password.


  ## Testing

The API routes were tested using Postman. Postman is an application used for API testing, serving as an HTTP client that tests HTTP requests through a graphical user interface. This allows us to obtain various types of responses that need subsequent validation. Postman provides different endpoint interaction methods, including:

- GET: Obtain information
- POST: Add information
- PUT: Replace information
- PATCH: Update specific information
- DELETE: Delete information
We tested the behavior of our routes to ensure they produce the correct status code and response according to our project flow."

#### Here are examples of the tests using **Postman** :
**Register a pharmacist**
![image11](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/assets/102230910/d49ec62a-a411-44f1-b26a-6fb7e386d5b1)

**Get All Medicines**
![image211](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/assets/102230910/ca5610b7-1ed9-4348-b3da-31a4253bce8f)

**View Total Sales Report**
![shafa3ola](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Pharmacy/assets/102230910/97c6d07d-7461-4276-b723-149ecb8a48d4)



## How to Contribute
Anyone who would like to contribute to the project please send me an E-mail at mostafa.elamory@student.guc.edu.eg
## Credits
[React.js](https://www.udemy.com/course/the-ultimate-react-course)  
[Mongoose docs](https://mongoosejs.com/docs/)  
[Express docs](https://expressjs.com/en/4x/api.html)   
[NodeJs docs](https://nodejs.org/docs/latest/api/)  
[Restful](https://www.oreilly.com/library/view/restful-web-api/9781098106737/)  
[Clean code](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
## License

 This project is licensed under [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
