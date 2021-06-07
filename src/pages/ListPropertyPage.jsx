import React, {useState} from "react";
import Step1 from "./../components/listPropertyPageComponent/Step1";
import Step2 from "./../components/listPropertyPageComponent/Step2";
import Step3 from "./../components/listPropertyPageComponent/Step3";
import Step4 from "./../components/listPropertyPageComponent/Step4";
import Step5 from "./../components/listPropertyPageComponent/Step5";
import Stepper from "react-stepper-horizontal";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {displayNotification} from "./../services/notificationService";
import {registerHotels} from "./../api/renter";

const validationSchema = Yup.object().shape({
  hotelName: Yup.string().min(1).max(50).required(),
  starRating: Yup.string().oneOf(["1", "2", "3", "4", "5"]).nullable(),
  contactName: Yup.string().required().min(2).max(50),
  phoneNumber: Yup.string()
    .required()
    .length(12)
    .matches(/^[0-9]+$/, "Mobile number must include only numbers"),
  address: Yup.string().required().min(8).max(255),
  city: Yup.string().required().min(1).max(50),
  placeForSearch: Yup.string().required().min(1).max(50),
  postalCode: Yup.string()
    .required()
    .length(6)
    .matches(/^[0-9]+$/, "Postal code must include only numbers"),
  parking: Yup.string().required().oneOf(["No", "Yes, Free", "Yes, Paid"]),
  breakfast: Yup.string().required().oneOf(["No", "Yes, Free", "Yes, Paid"]),
  facilities: Yup.array(),
  extraBed: Yup.string().required().oneOf(["No", "Yes"]),
  noOfExtraBeds: Yup.number().min(1).max(4),
  mainPhoto: Yup.mixed().required(),
  photos: Yup.array().nullable(),
  freeCancellationAvailable: Yup.string().required(),
  ifNotCancelledBeforeDate: Yup.string(),
  checkIn: Yup.string().required(),
  checkOut: Yup.string().required(),
  accomodateChildren: Yup.string().required().oneOf(["No", "Yes"]),
  allowPets: Yup.string().required().oneOf(["No", "Yes"]),
  provideDormitoryForDriver: Yup.string().required().oneOf(["No", "Yes"]),
  isPrepaymentRequired: Yup.string().required().oneOf(["No", "Yes"]),
  GST: Yup.string().required().oneOf(["No", "Yes"]),
  tradeName: Yup.string().when("GST", {
    is: "Yes",
    then: Yup.string().required("Trade name is required"),
  }),
  GSTIN: Yup.string().when("GST", {
    is: "Yes",
    then: Yup.string().required("GSTIN is required"),
  }),
  panCardNumber: Yup.string().required(),
  state: Yup.string().req,
});

function ListPropertyPage() {
  let initialValues;
  const [currentPage, setCurrentPage] = useState(1);

  const saveAsDraft = data => {
    localStorage.setItem("saveAsDraft", JSON.stringify(data));
    displayNotification("info", "Succesfully saved as draft");
  };

  initialValues = JSON.parse(localStorage.getItem("saveAsDraft"));

  const sections = [
    {title: "Basic Info", onClick: () => setCurrentPage(1)},
    {title: "Facilities and Services", onClick: () => setCurrentPage(2)},
    {title: "Photos", onClick: () => setCurrentPage(3)},
    {title: "Policies", onClick: () => setCurrentPage(4)},
    {title: "Payments", onClick: () => setCurrentPage(5)},
  ];

  const handleSubmit = async (values, setFieldError) => {
    let finalValues = {...values};
    let {placeForSearch} = finalValues;
    finalValues.placeForSearch = placeForSearch.toLowerCase();

    let formData = new FormData();

    for (let [key, value] of Object.entries(finalValues)) {
      if (key === "photos") {
        for (let index in finalValues.photos) {
          formData.append(`photos[${index}]`, finalValues.photos[index]);
        }
      } else {
        formData.append(key, value);
      }
    }

    const {data, status} = await registerHotels(formData);
    if (status === 400) setFieldError(data.property, data.msg);
    console.log(data);
  };

  const buttonStyle = {
    width: "120px",
    marginTop: "10px",
    marginBottom: "10px",
  };

  const previousButtonStyle = {...buttonStyle};
  previousButtonStyle.marginLeft = "34vw";

  const nextButtonStyle = {...buttonStyle};
  nextButtonStyle.marginRight = "34vw";

  const next = () => setCurrentPage(prev => prev + 1);
  const prev = () => {
    if (currentPage === 1) return;
    setCurrentPage(prev => prev - 1);
  };

  return (
    <Formik
      initialValues={
        initialValues || {
          hotelName: "",
          starRating: "",
          contactName: "",
          phoneNumber: "",
          address: "",
          city: "",
          placeForSearch: "",
          postalCode: "",
          parking: "No",
          breakfast: "No",
          facilities: [],
          extraBed: "No",
          noOfExtraBeds: 1,
          mainPhoto: "",
          photos: "",
          freeCancellationAvailable: "None.(Guest cannot cancel once booked)",
          ifNotCancelledBeforeDate: "of the first day",
          checkIn: "00 : 00",
          checkOut: "00 : 00",
          accomodateChildren: "No",
          allowPets: "No",
          provideDormitoryForDriver: "No",
          isPrepaymentRequired: "No",
          GST: "No",
          tradeName: "",
          GSTIN: "",
          panCardNumber: "",
          state: "",
        }
      }
      validationSchema={validationSchema}
      onSubmit={(values, {setFieldError}) => handleSubmit(values, setFieldError)}
    >
      {() => (
        <div>
          <Form>
            <h1>Dynamic Form Fields in React</h1>
            <Stepper
              steps={sections}
              activeStep={currentPage - 1}
              activeColor="green"
              defaultBarColor="green"
              completeColor="red"
              completeBarColor="red"
            />

            {currentPage === 1 && (
              <>
                <Step1 saveAsDraft={saveAsDraft} />
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <button
                    style={previousButtonStyle}
                    disabled={currentPage === 1}
                    className="btn btn-secondary"
                    onClick={prev}
                  >
                    Back
                  </button>
                  <button style={nextButtonStyle} className="btn btn-primary" onClick={next}>
                    Next
                  </button>
                </div>
              </>
            )}

            {currentPage === 2 && (
              <>
                <Step2 saveAsDraft={saveAsDraft} />
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <button style={previousButtonStyle} className="btn btn-secondary" onClick={prev}>
                    Back
                  </button>
                  <button style={nextButtonStyle} className="btn btn-primary" onClick={next}>
                    Next
                  </button>
                </div>
              </>
            )}
            {currentPage === 3 && (
              <>
                <Step3 saveAsDraft={saveAsDraft} />
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <button style={previousButtonStyle} className="btn btn-secondary" onClick={prev}>
                    Back
                  </button>
                  <button style={nextButtonStyle} className="btn btn-primary" onClick={next}>
                    Next
                  </button>
                </div>
              </>
            )}
            {currentPage === 4 && (
              <>
                <Step4 saveAsDraft={saveAsDraft} />
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <button style={previousButtonStyle} className="btn btn-secondary" onClick={prev}>
                    Back
                  </button>
                  <button style={nextButtonStyle} className="btn btn-primary" onClick={next}>
                    Next
                  </button>
                </div>
              </>
            )}
            {currentPage === 5 && (
              <>
                <Step5 saveAsDraft={saveAsDraft} />
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <button style={previousButtonStyle} className="btn btn-secondary" onClick={prev}>
                    Back
                  </button>
                  <button style={nextButtonStyle} type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </>
            )}

            {/* <button style={nextButtonStyle} type="submit" className="btn btn-success">
                Submit
              </button> */}
            {/*{currentPage === 4 && (
          <>
            <Step2 />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button style={previousButtonStyle} className="btn btn-secondary" onClick={prev}>Back</button>
              <button style={nextButtonStyle} className="btn btn-primary" onClick={next}>Next</button> 
            </div>
          </>
        )}
        {currentPage === 5 && (
          <>
            <Step2 />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button style={previousButtonStyle} className="btn btn-secondary" onClick={prev}>Back</button>
              <button style={nextButtonStyle} className="btn btn-primary" onClick={next}>Next</button> 
            </div>
          </>
        )}

        {currentPage === 6 && (
          <>
            <div style={{ display: 'flex',justifyContent: 'space-between' }}>
              <button style={previousButtonStyle} className="btn btn-secondary" onClick={prev}>Back</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </>
        )} */}
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default ListPropertyPage;
