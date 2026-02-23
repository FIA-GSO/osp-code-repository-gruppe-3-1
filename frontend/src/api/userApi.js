import api from "./apiClient";

export async function createUser(email, company_name, contact_person, password) {
    const res = await api.post("/users/", { email, company_name, contact_person, password }, { withCredentials: true });
    return res.data;
}
