import { Formik } from "formik";
import { Button, TextField } from "@mui/material";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddTaskIcon from "@mui/icons-material/AddTask";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import CategoryIcon from "@mui/icons-material/Category";
import EmailIcon from "@mui/icons-material/Email";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Slider from "@mui/material/Slider";
import InputAdornment from "@mui/material/InputAdornment";
import Switch from "@mui/material/Switch";
import "./form.css";
import axios from "axios";
 
import { Grid } from "@mui/material";
 
 
const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
 
  //Form initial values
  const initialValues = {
    processDescription: "",
    processName: "",
    processCategory: "",
    processFrequency: "",
    processDuration: "",
    processRuleMarks: 0,
    processStructureMarks: 0,
    processStabilityMarks: 0,
    processDocumentation: false,
    processEmail: "",
  };
 
  //Form validation input schema
  const userSchema = yup.object().shape({
    processDescription: yup.string().required("process description required"),
    processName: yup.string().required("process name required"),
    processCategory: yup.string().required("process category required"),
    processFrequency: yup
      .number()
      .typeError("must be a number")
      .required("process frequency required"),
    processDuration: yup
      .number()
      .typeError("must be a number")
      .required("process duration required"),
    processEmail: yup
      .string()
      .email("invalid email")
      .required("business process owner required"),
  });
 
  //Slider Rule-Based Options
  const ruleMarks = [
    {
      value: 0,
      label: "Very Creative",
    },
    {
      value: 25,
      label: "Pretty Creative",
    },
    {
      value: 50,
      label: "A Mix",
    },
    {
      value: 75,
      label: "Pretty Rule Based",
    },
    {
      value: 100,
      label: "Very Rule Based",
    },
  ];
 
  function valuetextRule(value) {
    return `${value}`;
  }
 
  function valueLabelFormatRule(value) {
    return ruleMarks.findIndex((ruleMarks) => ruleMarks.value === value) + 1;
  }
 
  //Slider Structure Options
  const structureMarks = [
    {
      value: 0,
      label: "Very Unstructured",
    },
    {
      value: 25,
      label: "Pretty Unstructured",
    },
    {
      value: 50,
      label: "A Mix",
    },
    {
      value: 75,
      label: "Pretty Structured",
    },
    {
      value: 100,
      label: "Very Structured",
    },
  ];
 
  function valuetextStructure(value) {
    return `${value}`;
  }
 
  function valueLabelFormatStructure(value) {
    return (
      structureMarks.findIndex(
        (structureMarks) => structureMarks.value === value
      ) + 1
    );
  }
 
  //Slider Changes Options
  const stabilityMarks = [
    {
      value: 0,
      label: "Major Changes",
    },
    {
      value: 25,
      label: "Several Changes",
    },
    {
      value: 50,
      label: "Some Changes",
    },
    {
      value: 75,
      label: "Minor Changes",
    },
    {
      value: 100,
      label: "No Change",
    },
  ];
 
  function valuetextStability(value) {
    return `${value}`;
  }
 
  function valueLabelFormatStability(value) {
    return (
      stabilityMarks.findIndex(
        (stabilityMarks) => stabilityMarks.value === value
      ) + 1
    );
  }
 
  //For submitting complete form - all values stored in value object
  //Connection to back-end function to replace the console.log
 
  const handleFormSubmit = async (values) => {
    try {
      const response1 = await axios.post(
        "http://127.0.0.1:8000/process",
        values
      );
      console.log("Success:", response1.data);
 
      const response2 = await axios.post(
        "http://127.0.0.1:8000/submit-form",
        values
      );
      if (response2.data && response2.data.status === "success") {
        alert("Form submitted successfully. A ticket has been created.");
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };
 
  // Form returned to app as one container
  return (
    <div className="main-container">
      <div className="intro-text">
        <span className="text-span">
          <h1> Process Forms </h1>
          {/* Maybe the text should be stored in the app database and retrieved rather then hard coded in html?*/}
          Please use this form to submit your task or process as a
          proposal for process automation. <br></br>
          <br></br>
          This form serves to formalize your ideas and quantify the potential
          benefits of automation, while also facilitating the sharing of ideas
          within the organization.<br></br>
          <br></br>
          Estimated time to complete the form is approximately four minutes.{" "}
          <br></br>
          <br></br>
          Upon submission, you will receive an email regarding the next steps in
          the process.
        </span>
 
        {/* Robotics Image */}
        <div className="title-img">
          <img
            src={require("./robotics.png")}
            alt="Robotics"
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        </div>
      </div>
 
      {/* Formik for form validation and controll */}
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="question-header">
                  <h2>
                    Please provide a brief description of the task/process that
                    you would like to propose for automation
                  </h2>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="multitext-question">
                  <AddTaskIcon
                    sx={{ color: "primary.light", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    id="Q1"
                    fullWidth
                    type="text"
                    label="Process Description"
                    placeholder="Example: Automatically send out monthly FC reports based on ..."
                    multiline
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="processDescription"
                    value={values.processDescription}
                    error={
                      !!touched.processDescription &&
                      !!errors.processDescription
                    }
                    helperText={
                      <span
                        style={{
                          display: 'block',
                          position: 'absolute',
                          color: 'red',
                        }}
                      >
                        {touched.processDescription && errors.processDescription}
                      </span>
                    }
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="question-header">
                  <h2>
                    What is the name of the task/process that you would like to
                    recommend for automation?
                  </h2>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="multitext-question">
                  <BookmarksIcon
                    sx={{ color: "primary.light", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    id="Q1"
                    fullWidth
                    label="Process Name"
                    placeholder="Example: Monthly FC Reports"
                    multiline
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="processName"
                    value={values.processName}
                    error={!!touched.processName && !!errors.processName}
                    helperText={
                      <span
                        style={{
                          display: 'block',
                          position: 'absolute',
                          color: 'red',
                        }}
                      >
                        {touched.processName && errors.processName}
                      </span>
                    }
                  />
                </div>
              </Grid>
            </Grid>
 
            <div className="question-header">
              <h2>Categorize your process by functional area</h2>
            </div>
 
            <div
              className="multitext-question"
              style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}
            >
              <CategoryIcon sx={{ color: "primary.light", mr: 1, my: 0.5 }} />
              <FormControl fullWidth sx={{}}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  onChange={handleChange}
                  fullWidth
                  label="Category"
                  onBlur={handleBlur}
                  name="processCategory"
                  value={values.processCategory}
                  error={!!touched.processCategory && !!errors.processCategory}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Finance"}>Finance</MenuItem>
                  <MenuItem value={"IT"}>IT</MenuItem>
                  <MenuItem value={"Marketing"}>Marketing</MenuItem>
                  <MenuItem value={"Logistic / SCM"}>Logistic / SCM</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                  <MenuItem value={"Sales"}>Sales</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="multi-split-question">
              <div className="split-question-header">
                <h2>
                  Frequency: How many times a month is the task/process
                  performed?
                </h2>
              </div>
              <div className="split-question-header">
                <h2>
                  Duration: How many minutes does it take to manually complete
                  this task/process from start to finish?{" "}
                </h2>
              </div>
            </div>
            <div className="multitext-question">
              <div className="split-question-header">
                <TextField
                  label="Manual Executions per Month"
                  id="outlined-start-adornment"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="processFrequency"
                  value={values.processFrequency}
                  error={
                    !!touched.processFrequency && !!errors.processFrequency
                  }
                  helperText={
                    <span
                      style={{
                        display: 'block',
                        position: 'absolute',
                        color: 'red',
                      }}
                    >
                      {touched.processFrequency && errors.processFrequency}
                    </span>
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        Times/Month
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="split-question-header">
                <TextField
                  label="Minutes per Manual Execution"
                  id="outlined-start-adornment"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="processDuration"
                  value={values.processDuration}
                  error={!!touched.processDuration && !!errors.processDuration}
                  helperText={
                    <span
                      style={{
                        display: 'block',
                        position: 'absolute',
                        color: 'red',
                      }}
                    >
                      {touched.processDuration && errors.processDuration}
                    </span>
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        min/Execution
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
 
            <div className="grid-container">
              <div className="question-header">
                <h2>How rule-based is your task/process?</h2>
              </div>
              <div className="image-question-header">
                <img
                  src={require("./set rule based.png")}
                  width="800"
                  height="150"
                />
              </div>
              <div className="slider-question">
                <Slider
                  aria-label="Custom marks"
                  getAriaValueText={valuetextRule}
                  valueLabelFormat={valueLabelFormatRule}
                  step={null}
                  valueLabelDisplay="auto"
                  marks={ruleMarks}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="processRuleMarks"
                  defaultValue={values.processRuleMarks}
                  value={values.processRuleMarks}
                />
              </div>
              <div className="question-header">
                <h2>
                  How would you describe the structure of your input data?
                </h2>
              </div>
              <div className="image-question-header">
                <img
                  src={require("./set structure.png")}
                  width="800"
                  height="90"
                />
              </div>
              <div className="slider-question">
                <Slider
                  aria-label="Custom marks"
                  getAriaValueText={valuetextStructure}
                  valueLabelFormat={valueLabelFormatStructure}
                  step={null}
                  valueLabelDisplay="auto"
                  marks={structureMarks}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="processStructureMarks"
                  defaultValue={values.processStructureMarks}
                  value={values.processStructureMarks}
                />
              </div>
            </div>
 
            <div class="question-container">
              <div class="question-header">
                <h2>
                  Are you aware of any anticipated changes to how you currently
                  perform the task/process?
                </h2>
              </div>
              <div class="image-question-header">
                <img
                  src={require("./set changes.png")}
                  width="800"
                  height="90"
                ></img>
              </div>
              <div class="slider-question">
                <Slider
                  aria-label="Custom marks"
                  getAriaValueText={valuetextStability}
                  valueLabelFormat={valueLabelFormatStability}
                  step={null}
                  valueLabelDisplay="auto"
                  marks={stabilityMarks}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="processStabilityMarks"
                  defaultValue={values.processStabilityMarks}
                  value={values.processStabilityMarks}
                />
              </div>
 
              <div class="question-header">
                <h2>
                  Is your task/process well describe with proper documentation?
                </h2>
              </div>
 
              <div class="switch-question">
                <Switch
                  name="processDocumentation"
                  checked={values.processDocumentation}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <h1>Process Documentation Exist*</h1>
              </div>
              <label>
                *NOTE Failing to provide process documentation severely decrease
                the urgency assigned to your submission
              </label>
 
              <div class="question-header">
                <h2>
                  Please provide the email address of the business process owner
                  within your organization
                </h2>
              </div>
              <div class="multitext-question">
                <EmailIcon sx={{ color: "primary.light", mr: 1, my: 0.5 }} />
                <TextField
                  id="Q1"
                  fullWidth
                  label="Business Process Owner"
                  placeholder="Example: Anton.Belfrage@continental.com"
                  multiline
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="processEmail"
                  value={values.processEmail}
                  error={!!touched.processEmail && !!errors.processEmail}
                  helperText={
                    <span
                      style={{
                        display: 'block',
                        position: 'absolute',
                        color: 'red',
                      }}
                    >
                      {touched.processEmail && errors.processEmail}
                    </span>
                  }
                />
              </div>
 
              <div class="submit-container">
                <Button
                  type="submit"
                  size="large"
                  color="primary"
                  variant="contained"
                  sx={{ m: 4, mb: 10 }}
                >
                  Submit idea
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
 
export default Form;
 