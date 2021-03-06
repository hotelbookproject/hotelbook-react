import React, {useState, useEffect} from "react";
import "../../css/History.css";
import ReactStars from "react-rating-stars-component";
import ModalComponent from "./ModalComponent";
import {useFormikContext, Formik, Form} from "formik";
import * as Yup from "yup";
import InputBox from "./InputBox";
import "../../css/Booked_Dashboard.css";
import {useHistory} from "react-router-dom";
import Rating from "./Rating";
import {getBookings, addReview} from "../../api/guest";
import {displayNotification} from "./../../services/notificationService";

const reviewSchema = Yup.object().shape({
  review: Yup.string().min(2).max(100000).required(),
  rating: Yup.number().required().oneOf([1, 2, 3, 4, 5]),
});

function History() {
  const history = useHistory();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [bookings, setBookings] = useState();
  const [hotelId, setHotelId] = useState();
  const [ratingValue, setRatingValue] = useState();
  const [reviewValue, setReviewValue] = useState();

  

  const getAllBookings = async () => {
    const {data, status} = await getBookings({isStayCompleted: true});
    if (status !== 200) return displayNotification("error", data);
    // console.log(data,"dtt")
    setBookings(data);
  };

  const onReviewClick = (hotelId) => {
    setIsOpen(true);
    setHotelId(hotelId);
    
  };

  const setValues=(getFieldProps)=>{
    const {value:ratingValue}=getFieldProps("rating")
  if(ratingValue) setRatingValue(ratingValue)
  const {value:reviewValue}=getFieldProps("review")
  if(reviewValue) setReviewValue(reviewValue)
  }

  const diffBetweenDays = (startingDate, endingDate) => {
    const diffInMs = new Date(endingDate) - new Date(startingDate);
    return diffInMs / (1000 * 60 * 60 * 24);
  };

  const handleDetails = (roomDetails, startingDate, endingDate) => {
    let result = diffBetweenDays(startingDate, endingDate);
    history.push("/bookedroomdetails", {data: roomDetails, days: result});
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  const handleSubmit = async (values,resetForm) => {
    console.log(values, "val");
    const {data,status}=await addReview(hotelId, values)
    if(status !== 200) return displayNotification("error",data)
    displayNotification("success","Review Posted Successfully")
    resetForm({values: ""});
  };

  if (!bookings) return null;

  return (
    <div className="history">
      <h3>History</h3>
      <h5>Caption about History</h5>
      {bookings.map(booking => (
        <article className="book">
          <div className="book-box">
            <img src={booking?.mainPhoto} width="1500" height="1368" alt="" />
          </div>
          <div className="book-content">
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <h1
                onClick={() => (window.location = `/hoteldetails/${booking.hotelId}?nodate=true`)}
                className="book-title"
              >
                <a>{booking?.hotelName}</a>{" "}
              </h1>
              <span className="badge badge-success">
                <p style={{margin: 0, color: "#000"}}>Stay completed</p>
              </span>
            </div>

            <p className="book-metadata">
              <span className="book-rating">
                <Rating value={booking?.rating} className="rating" />
              </span>
            </p>
            <p className="book-desc">
              <h5 className="book-desc-more">Address :{booking.address} </h5>
            </p>
            <div className="book-details">
              <div className="book-details-right">
                {/* <h5 className="book-details-desc">Hotel Booking ID : 5897458631</h5> */}
                <h5 className="pay">
                  Total: Rs.{" "}
                  {booking?.totalPrice *
                    (diffBetweenDays(booking.startingDayOfStay, booking.endingDayOfStay) + 1)}
                </h5>
                <h5 className="pay">Total Beds: {booking?.totalBeds}</h5>
                <h5 className="pay">Total Guests: {booking?.totalGuests}</h5>
                <h5 className="pay">Total Rooms: {booking?.totalRooms}</h5>
              </div>
              <div className="book-details-left">
                <h5 className="book-details-desc">Booked On : {booking?.bookedOn}</h5>
                <h5 className="book-details-desc">Check In : {booking?.startingDayOfStay}</h5>
                <h5 className="book-details-desc">Check Out : {booking?.endingDayOfStay}</h5>
              </div>
            </div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <button
                onClick={() =>
                  handleDetails(
                    booking.roomDetails,
                    booking.startingDayOfStay,
                    booking.endingDayOfStay
                  )
                }
                className="btn btn-primary"
              >
                Get Details
              </button>
              <button onClick={() => onReviewClick(booking.hotelId)} className="btn btn-secondary">
                {booking?.reviewId ? "Edit Review" : "Add Review"}
              </button>
            </div>
          </div>
        </article>
      ))}
      <Formik
        initialValues={{
          rating: "",
          review: "",
        }}
        validationSchema={reviewSchema}
        onSubmit={(values, { resetForm}) =>
          handleSubmit(values,resetForm)
        }
      >
        {({handleSubmit, setFieldValue, getFieldProps}) => (
          <ModalComponent
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            handleSubmit={handleSubmit}
          >
            <Form>
              <div className="relative w-full mb-3">
                <div style={{display: "flex"}}>
                  <h2 style={{marginRight: "60px", paddingTop: "7px"}}>Review</h2>
                  <ReactStars
                    count={5}
                    onChange={rating => setFieldValue("rating", rating)}
                    size={35}
                    isHalf={false}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                    half={setValues(getFieldProps)}
                    value={Number(ratingValue)||0}
                  />
                  <div></div>
                </div>
                ,
                <textarea
                  style={{width: "40rem", height: "200px"}}
                  name="rating"
                  onChange={e => setFieldValue("review", e.target.value)}
                  row="5"
                  col="90"
                  value={reviewValue}
                ></textarea>
              </div>
            </Form>
          </ModalComponent>
        )}
      </Formik>
    </div>
  );
}

export default History;
