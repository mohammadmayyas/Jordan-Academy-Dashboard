import { RouteInfo } from "./sidebar.metadata";
import { Permission } from "src/app/core/enums/permission";

export const ROUTES: RouteInfo[] = [
  {
    path: "",
    title: "Personal",
    icon: "mdi mdi-dots-horizontal",
    class: "nav-small-cap",
    extralink: true,
    submenu: [],
    permissions: ['hide'],
  },
  {
    path: "dashboard/home",
    title: "Home",
    icon: "mdi mdi-home",
    class: "",
    extralink: false,
    submenu: [],
    permissions: [Permission.GetAllCoursesWithStudents],
  },
  {
    path: "",
    title: "Accounts",
    icon: "mdi mdi-account",
    class: "nav-small-cap",
    extralink: true,
    submenu: [],
    permissions: ['hide'],
  },
  {
    path: "/dashboard/users",
    title: "Users",
    icon: "mdi mdi-account",
    class: "",
    extralink: false,
    submenu: [],
    permissions: [Permission.GetAllUsers],
  },
  {
    path: "/dashboard/roles",
    title: "Roles",
    icon: "mdi mdi-shield-outline",
    class: "",
    extralink: false,
    submenu: [],
    permissions: [Permission.GetAllRoles],
  },
  {
    path: "/dashboard/permissions",
    title: "Permissions",
    icon: "mdi mdi-shield",
    class: "",
    extralink: false,
    submenu: [],
    permissions: [Permission.GetAllPermissions],
  },
  {
    path: "",
    title: "Course",
    icon: "mdi mdi-image-filter-none",
    class: "nav-small-cap",
    extralink: true,
    submenu: [],
    permissions: ['hide'],
  },
  {
    path: "/dashboard/courses",
    title: "Courses",
    icon: "mdi mdi-image-filter-none",
    class: "",
    extralink: false,
    submenu: [],
    permissions: [],
  },
  {
    path: "/dashboard/enrolls",
    title: "Enroll Requests",
    icon: "mdi mdi-message-alert",
    class: "",
    extralink: false,
    submenu: [],
    permissions: [Permission.GetAllEnrollToCourseRequests],
  },
  {
    path: "/dashboard/certificates",
    title: "Certificates",
    icon: "fa fa-certificate",
    class: "",
    extralink: false,
    submenu: [],
    permissions: [Permission.GetAllCertificateApproved],
  },
  {
    path: "/dashboard/certificate-requests",
    title: "Certificate Requests",
    icon: "mdi mdi-message-alert",
    class: "",
    extralink: false,
    submenu: [],
    permissions: [Permission.GetAllCertificateRequests],
  },
  {
    path: "/dashboard/testimonials",
    title: "Testimonials",
    icon: "fa fa-comments",
    class: "",
    extralink: false,
    submenu: [],
    permissions: [Permission.EditDisplayedTestimonials],
  }
];
