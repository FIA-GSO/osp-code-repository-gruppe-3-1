import axios from "./apiClient";

export async function getAllEvents() {
    const res = await axios.get("/events/");
    return res.data;
}