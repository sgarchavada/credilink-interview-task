/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
// MUI
import Container from "@mui/material/Container";
import styles from "styles/MainPage.module.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckIcon from "@mui/icons-material/Check";

// UTILS
import { TERMS_NOTES, UPLOAD_DOCUMENTS_NOTES } from "@/utils/static";
import Form from "@/utils/rcform";
import TextInput from "@/utils/TextInput";
import {
  validateUEN,
  validateEmail,
  validateCompanyName,
} from "@/utils/helper";

// Query
import { ADD_INFO } from "@/query/info";
import { uploadImages } from "@/utils/firebase";

const { FormItem } = Form;

const MainPage = ({ form }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [mobile, setMobile] = useState();
  const [docs, setDocs] = useState([]);
  const [documents, setDocuments] = useState([]);


  const open = Boolean(anchorEl);
  const inputFileRef = React.useRef();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [insertInfo, { loading }] = useMutation(ADD_INFO);

  const { getFieldDecorator, getFieldValue, getFieldError } = form;

  const uenValue = getFieldValue("company_uen");
  const cnameValue = getFieldValue("company_name");
  const nameValue = getFieldValue("full_name");
  const positionValue = getFieldValue("position");
  const emailValue = getFieldValue("email");
  const reEmailValue = getFieldValue("re_email");

  const checkUndefined = (value) => getFieldError(value) === undefined;

  const validateStep1 =
    uenValue &&
    checkUndefined("company_uen") &&
    cnameValue &&
    checkUndefined("company_name");

  const validateStep2 =
    nameValue &&
    checkUndefined("full_name") &&
    positionValue &&
    checkUndefined("position") &&
    emailValue &&
    checkUndefined("email") &&
    reEmailValue &&
    checkUndefined("re_email") &&
    mobile &&
    mobile.length === 8;

  const validateStep3 = docs.length === 6;

  const handleFileChange = async (e) => {
    const MAX_LENGTH = 6;
    const files = Array.from(e.target.files);
    if (files?.length > 0) {
      if (files?.length === MAX_LENGTH) {
        setLoading(true);
        const result = await uploadImages(e.target.files);
        setDocs(files)
        setDocuments((prev) => [...prev, ...result]);
        setLoading(false);
      } else {
        e.preventDefault();
        alert(`you must upload ${MAX_LENGTH} files`);
      }
    }
  };

  const handleSubmit = () => {
    if (checked) {
      insertInfo({
        variables: {
          company_uen: uenValue,
          company_name: cnameValue,
          email: emailValue,
          mobile: mobile,
          documents: documents,
          position: positionValue,
          full_name: nameValue
        }
      }).then(res => {
        router.push('/detail')
      }).catch((e) => {
        console.log(e.message);
      })
    }
  }

  return (
    <>
      <div className={styles.header}>
        <Container maxWidth="xl" className={styles.innerContainer}>
          <img src="assets/img/logo.svg" alt="" />
          <span>SME HealthCheck - Get Started</span>
        </Container>
      </div>
      <Container maxWidth="lg">
        <Box>
          <Stepper orientation="vertical">
            <Step
              expanded
              completed={validateStep1}
              key="company_info"
              color="#00ff00"
            >
              <StepLabel>
                <Box className={styles.stepHeaderBox}>Company Information</Box>
              </StepLabel>
              <StepContent sx={{ py: 2 }}>
                <Grid container spacing={6}>
                  <Grid item md={6}>
                    <FormItem>
                      {getFieldDecorator("company_uen", {
                        initialValue: "",
                        rules: [
                          {
                            required: true,
                            message: "Company UEN is required",
                          },
                          { validator: validateUEN },
                        ],
                      })(<TextInput label="Company UEN" />)}
                    </FormItem>
                  </Grid>
                  <Grid item md={6}>
                    <FormItem>
                      {getFieldDecorator("company_name", {
                        initialValue: "",
                        rules: [
                          {
                            required: true,
                            message: "Company Name is required",
                          },
                          { validator: validateCompanyName },
                        ],
                      })(<TextInput label="Company Name" />)}
                    </FormItem>
                  </Grid>
                </Grid>
              </StepContent>
            </Step>
            <Step
              expanded
              active={validateStep1}
              completed={validateStep2}
              key="applicant_info"
            >
              <StepLabel>
                <Box className={styles.stepHeaderBox}>
                  Applicant Information
                </Box>
              </StepLabel>
              <StepContent
                sx={{ py: 2, pointerEvents: validateStep1 ? "auto" : "none" }}
              >
                <Grid container spacing={6}>
                  <Grid item md={6}>
                    <FormItem>
                      {getFieldDecorator("full_name", {
                        initialValue: "",
                        rules: [
                          {
                            required: true,
                            message: "Full Name is required",
                          },
                        ],
                      })(<TextInput label="Full Name" />)}
                    </FormItem>
                  </Grid>
                  <Grid item md={6}>
                    <FormItem>
                      {getFieldDecorator("position", {
                        initialValue: "",
                        rules: [
                          {
                            required: true,
                            message: "Position is required",
                          },
                        ],
                      })(<TextInput label="Position within company" />)}
                    </FormItem>
                  </Grid>
                  <Grid item md={6}>
                    <FormItem>
                      {getFieldDecorator("email", {
                        initialValue: "",
                        rules: [
                          {
                            required: true,
                            message: "Email is required",
                          },
                          { validator: validateEmail },
                        ],
                      })(<TextInput label="Email Address" />)}
                    </FormItem>
                  </Grid>
                  <Grid item md={6}>
                    <FormItem>
                      {getFieldDecorator("re_email", {
                        initialValue: "",
                        rules: [
                          {
                            required: true,
                            message: "Email is required",
                          },
                          { validator: validateEmail },
                          {
                            validator: (rule, value, callback) => {
                              if (value != emailValue) {
                                callback("Email does not match");
                              } else {
                                callback();
                              }
                            },
                          },
                        ],
                      })(<TextInput label="Re-enter Email Address" />)}
                    </FormItem>
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      label="Mobile Number"
                      value={mobile}
                      error={!mobile || mobile.length < 8}
                      type="number"
                      onChange={(val) => setMobile(val.target.value)}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 8);
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box>
                              <Button>
                                <img
                                  width="25px"
                                  src="assets/img/singapore.svg"
                                  onClick={handleClick}
                                  alt=""
                                />
                              </Button>

                              <Popover
                                open={open}
                                anchorEl={anchorEl}
                                onClose={() => setAnchorEl(null)}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "left",
                                }}
                              >
                                <Stack direction={"row"} p={2}>
                                  <img
                                    src="assets/img/singapore.svg"
                                    width="25px"
                                    alt=""
                                  />
                                  <Typography ml={1}>Singapore +65</Typography>
                                </Stack>
                              </Popover>
                            </Box>
                            +65
                          </InputAdornment>
                        ),
                      }}
                    />
                    {!mobile ||
                      (mobile.length < 8 && (
                        <FormHelperText sx={{ color: "red" }}>
                          Enter a 8-digit Mobile Number
                        </FormHelperText>
                      ))}
                  </Grid>
                </Grid>
              </StepContent>
            </Step>
            <Step
              expanded
              active={validateStep2}
              completed={validateStep3}
              key="upload_docs"
            >
              <StepLabel>
                <Box className={styles.stepHeaderBox}>Upload Documents</Box>
              </StepLabel>
              <StepContent
                sx={{
                  opacity: validateStep2 ? 1 : 0.8,
                  pointerEvents: validateStep2 ? "auto" : "none",
                }}
              >
                <Grid container spacing={6}>
                  <Grid item md={6}>
                    <input
                      accept="application/pdf"
                      multiple
                      type="file"
                      hidden
                      ref={inputFileRef}
                      onChange={handleFileChange}
                    />
                    <Box
                      className={styles.uploadBox}
                      onClick={() =>
                        validateStep2 && inputFileRef.current.click()
                      }
                    >
                      <div className={styles.circle}>
                        <UploadFileIcon sx={{ color: "#00002c" }} />
                      </div>
                      {isLoading ? (<Typography>
                        Uploading...
                      </Typography>): (
                        <Typography>
                        <u>Click to upload</u> or drag and drop Bank Statements
                      </Typography>
                      )}
                    </Box>
                    {docs.map((d, index) => (
                      <div key={index} className={styles.filePills}>{d.name}</div>
                    ))}
                   {docs.length > 0 && (<Box sx={{cursor: 'pointer', mt: 2, color: '#000054'}} onClick={() => setDocs([])|setDocuments([])}>Remove All</Box>)}
                  </Grid>
                  <Grid item md={6}>
                    <Box pl={2} py={2}>
                      {UPLOAD_DOCUMENTS_NOTES.map((note, index) =>  (
                          <Stack key={index} direction={"row"} mb={2}>
                            <CheckIcon sx={{ color: "#00000099", mr: 2 }} />
                            <Typography color="#00000099">{note}</Typography>
                          </Stack>
                        )
                      )}
                      <Stack direction={"row"} mb={2}>
                        <CheckIcon sx={{ color: "#00000099", mr: 2 }} />
                        <Typography color="#00000099">
                          In case if you are facing any issue while uploading
                          bank statements, Please contact us on{" "}
                          <a href="mailto:support@credilinq.ai">
                            support@credilinq.ai
                          </a>
                        </Typography>
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </StepContent>
            </Step>
            <Step completed={checked} active={validateStep3} expanded key="terms_condition">
              <StepLabel>
                <Box className={styles.stepHeaderBox}>Terms & Conditions</Box>
              </StepLabel>
              <StepContent
                sx={{
                  opacity: validateStep3 ? 1 : 0.8,
                  pointerEvents: validateStep3 ? "auto" : "none",
                }}
              >
                <FormControlLabel
                  sx={{ color: "#00000099" }}
                  control={<Checkbox onChange={() => setChecked(!checked)} />}
                  label="By ticking, you are confirming that you have understood and are agreeing to the details mentioned:"
                />
                <Box pl={2} py={2}>
                  {TERMS_NOTES.map((note, index) => (
                      <Stack key={index} direction={"row"} mb={2}>
                        <CheckIcon sx={{ color: "#00000099", mr: 2 }} />
                        <Typography color="#00000099">{note}</Typography>
                      </Stack>
                    )
                  )}
                  <Stack direction={"row"} mb={2}>
                    <CheckIcon sx={{ color: "#00000099", mr: 2 }} />
                    <Typography color="#00000099">
                      I have read and understand the{" "}
                      <a
                        target="_blank"
                        href="https://smehealthcheck.credilinq.ai/terms-and-conditions"
                      >
                        Terms & Conditions
                      </a>
                    </Typography>
                  </Stack>
                </Box>

                <Button
                 onClick={handleSubmit}
                 sx={{ mb: 6, float: "right" }} variant="contained">
                  {loading? "loading.." : "SUBMIT"}
                </Button>
              </StepContent>
            </Step>
          </Stepper>
        </Box>
      </Container>
    </>
  );
};

export default Form.create()(MainPage);
