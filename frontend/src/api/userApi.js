import api from "./apiClient";

export async function createUser(email, company_name, contact_person, password, roles) {
    const res = await api.post("/users/", { email, company_name, contact_person, password, roles }, { withCredentials: true });
    return res.data;
}
