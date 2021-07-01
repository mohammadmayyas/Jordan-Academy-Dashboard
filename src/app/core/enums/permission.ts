export enum Permission {
        // this permission allow user to login to the dashboard
         CanAccessDashboard = 'Can_AccessDashboard',

         GetAllUsers = 'List_AllUsers',
         GetAllTrainers = 'List_AllTrainers',
         DeleteUser = 'Delete_User',
         EditUser = 'Edit_User',
         ResetPassword = 'Reset_Password',
         GetAllUserInfo = 'Get_AllUserInfo',
         GetAllUserCourses = 'List_AllUserCourses',
         GetUserCourseInfo = 'Get_UserCourseInfo',
         EditUserRoles = 'Edit_UserRoles',
         AddEnrollToCourseRequest = 'Add_EnrollToCourseRequest',
         ResponseForEnrollToCourseRequest = 'Response_ForEnrollToCourseRequest',
         ResponseForGetCertificateRequest = 'Response_ForGetCertificateRequest',

         AddRole = 'Add_Role',
         EditRole = 'Edit_Role',
         EditRolePermissions = 'Edit_RolePermissions',
         GetAllRoles = 'List_AllRoles',
         GetAllRolesWithPermissions = 'List_AllRolesWithPermissions',
         DeleteRole = 'Delete_Role',

         AddPermission = 'Add_Permission',
         EditPermission = 'Edit_Permission',
         GetAllPermissions = 'List_AllPermissions',
         DeletePermission = 'Delete_Permission',

         AddCourse = 'Add_Course',
         EditCourse = 'Edit_Course',
         DeleteCourse = 'Delete_Course',
         GetAllPendingEnrollRequests = 'List_AllPendingEnrollRequests',

         GetAllStudentsInCourse = 'List_AllStudentsInCourse',
         GetAllCoursesWithStudents = 'List_AllCoursesWithStudents',
         GetAllEnrollToCourseRequests = 'List_AllEnrollToCourseRequests',
         GetAllApprovedEnrollRequests = 'List_AllApprovedEnrollRequests',
         GetTraineesAcademyInfo = 'Get_TraineesAcademyInfo',
         UpdateTraineeMarks = 'UpdateTraineeMarks',

         AddCertificateRequest = 'Add_CertificateRequest',
         GetAllCertificateRequests = 'List_AllCertificateRequests',
         GetAllCertificateApproved = 'List_AllCertificateApproved',
         DeleteCertificate = 'Delete_Certificate',

         AddTestimonial = 'Add_Testimonial',
         EditDisplayedTestimonials = 'Edit_DisplayedTestimonials',
         GetAllTestimonials = 'List_AllTestimonials',
         DeleteTestimonial = 'Delete_Testimonial',
}