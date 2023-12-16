
# El7a2ni




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
The project is formatted using prettier also The project follows the [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) design pattern, MVC is a software architectural pattern commonly used for developing user interfaces that divide the related program logic into three interconnected elements. This is done to separate internal representations of information from the ways information is presented to and accepted by the user, the Files in the backend were divided into the M (models) where the schema of the models exist which represent the core of the database, the C (controller) where the functions needed for the routes exists and the V (views) the view in MERN stack is represented by the react frontend server. Also, the routes in our project were abstracted from the controller function as shown in (Yasta mesh ader <3 )
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
## Running Tests

To run tests, run the following command

```bash
  npm run test
```

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

