import apiClient from "./httpService";

export function getHotels(values){
    return apiClient.get("/guest/book", values);
}

export function getHotel(id){
    return apiClient.get(`/guest/book/${id}`);
}

export function getRoomsbyId(data){
    return apiClient.get(`/guest/room`,data);
}

export function getBookedRoomsbyId(data){
    return apiClient.get(`/guest/bookings/guest`,data);
}

export function getRoombyId(roomId){
    return apiClient.get(`/guest/room/${roomId}`);
}

export function getGuest(values){
    return apiClient.get("/guest/signin", values);
}

export function guestSignin(values){
    return apiClient.post("/guest/signin", values);
}

export function guestSignup(values){
    return apiClient.post("/guest/signup", values);
}

export function editUserData(values){
    return apiClient.put("/guest/signup", values);
}

export function bookHotel(values){
    return apiClient.post("/guest/book", values);
}

export function getBookings(isStayCompleted){
    return apiClient.get("/guest/bookings",isStayCompleted);
}

export function guestChangePassword(values){
    return apiClient.post("/guest/changePassword", values);
}

export function addReview(hotelId,values){
    return apiClient.post(`/guest/review/${hotelId}`, values);
}


