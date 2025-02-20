const express = require("express");
const { default: mongoose } = require("mongoose");
// const ngoData = require("./models/data");
const Ngo = require("./models/data");
const Donor = require("./models/donor");
const bodyParser = require("body-parser");
const Volunteer = require("./models/volunteer");
const Project = require("./models/project");
const { projectSchema } = require("./schema");
const expressError = require("./utils/expressErrors.js");
const { route } = require("./routes/authRoute.js");
const authMiddleware = require("./utils/authMIddleware.js");

const app = express();
const port = 3000;

app.use(bodyParser.json());
async function mongodb() {
  try {
    mongoose
      .connect("mongodb://127.0.0.1:27017/ngo")
      .then(() => {
        console.log("DB connected");
      })
      .catch((err) => {
        console.log("DB not connected successfully", err);
      });
  } catch (err) {
    console.log("database not connected for reason", err);
  }
}

mongodb();



app.use('/api/auth', route);

app.get('/api/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Welcome to the protected route', user: req.user });
});

const validateListing = (req, res, next) => {
  const { error } = projectSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    throw new expressError(400, message);
  } else {
    next();
  }
}

app.get("/all", async (req, res) => {
  try {
    const alldata = await Project.find({}); // Fetch all NGOs
    if (!alldata) {
      res.send("data not found");
      console.log("data not found");
      return;
    }
    console.log(alldata); // Log the data to the console

    // Send the data back as a response
    res.send(alldata);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Server error"); // Send a 500 error if there's an issue
  }
});

app.post("/create",validateListing, async (req, res) => {
  try {
    const { name, description, budget, status, startDate, endDate } = req.body;

    const newProject = await new Project({
      name,
      description,
      budget,
      status,
      startDate,
      endDate,
    });

    const result = await newProject.save();
    res.status(201).json({
      message: "Project created successfully",
      project: result,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create the NGO project record" });
  }
});

app.get("/byId/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const entry = await Project.findById(id);
    if(!entry){
      res.json({message:"wrong id"})
      console.log("wrong id");
    }

    res.json(entry);
  } catch (err) {
    console.log(err);

    // Send 500 status code in case of any server error
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Attempt to find and delete the project by its ID
    const entry = await Project.findByIdAndDelete(id);

    // If no project is found with the given ID, respond with an error message
    if (!entry) {
        return res.status(404).json({ message: "Project not found with the given ID" });
    }

    // Log the deleted project to the console (for debugging purposes)
    console.log('Deleted project:', entry);

    // Respond with the deleted project details and a success message
    res.status(200).json({
        message: 'Project deleted successfully',
        deletedProject: entry
    });

  } catch (err) {
    // Handle unexpected errors
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the item" });
  }
});


app.put('/update/:id',validateListing, async (req, res) => {
  try {
      const { id } = req.params;
      const { name, description, budget, status, startDate, endDate } = req.body;

      const updatedProject = await Project.findByIdAndUpdate(
          id, // The project ID to find
          {
              name,
              description,
              budget,
              status,
              startDate,
              endDate
          },
          { new: true } 
      );

      
      if (!updatedProject) {
          return res.status(404).json({ message: "Project not found with the given ID" });
      }

      
      res.status(200).json({
          message: "Project updated successfully",
          updatedProject
      });
  } catch (error) {
      // Catch any errors during the process
      console.error("Error updating project:", error);
      res.status(500).json({
          message: "An error occurred while updating the project",
          error: error.message
      });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
