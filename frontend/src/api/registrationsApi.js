import api from "./apiClient";

export async function getUserRegistrations(userId) {
    const res = await api.get(`/registration/user/${userId}`, { withCredentials: true });
    return res.data;
}


export async function postFormRegistration(payload) {
    const res = await api.post(
        "/registration/form",
        payload,
        { withCredentials: true }
    );
    return res.data;
}

export async function getRegistrations() {
    const res = await api.get('/registration/', { withCredentials: true });
    return res.data;
}

export async function changeStatus(reg_id, status_id) {
    await api.put(`/registration/${reg_id}/status`, { status_id: status_id }, { withCredentials: true });
    return res.data;
}

export async function getRegistrationById(registrationId) {
  const res = await api.get(`/registration/${registrationId}`, { withCredentials: true } );
  return res.data;
}

export async function updateRegistration(registrationId, payload) {
  const res = await api.put(`/registration/form/${registrationId}`, payload, { withCredentials: true });
  return res.data;
}

