import { getUserRole } from "@/api/authApi";
 
export function getDashboardByRole() {
    const role = getUserRole();
 
    switch (role) {
        case "admin":
            return "/dashboard-user";
        case "user":
            return "/dashboard-user";
        case "teacher":
            return "/dashboard-teacher/registrierungen";
        case "helper":
            return "/dashboardHelper";
        default:
            return "/login";
    }
}