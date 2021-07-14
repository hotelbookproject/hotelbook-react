import apiClient from "./httpService";

export function getRenterHotels(){
    return apiClient.get("/renter/hotel");
}

export function getRenterHotelsbyId(id){
    return apiClient.get(`/renter/hotel/${id}`);
}

export function registerHotels(values){
    return apiClient.post("/renter/hotel", values);
}

export function renterSignin(values){
    return apiClient.post("/renter/signin", values);
}

export function renterSignup(values){
    return apiClient.post("/renter/signup", values);
}

export function getHotelRooms(id){
    return apiClient.get(`/renter/room?hotelId=${id}`);
}

export function getRenterRoomById(id){
    return apiClient.get(`/renter/room/${id}`);
}

export function addRoom(values){
    return apiClient.post("/renter/room", values);
}

export function editHotelById(values,id){
    return apiClient.put(`/renter/hotel/${id}`,values);
}

export function editRoomById(values,id){
    return apiClient.put(`/renter/room/${id}`,values);
}