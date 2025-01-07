import {
  IconBook,
  IconPassword,
  IconRegistered,
  IconSettings2,
} from "@tabler/icons-react";
import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconSettings,
  IconTypography,
  IconUser,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Admin",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "School Setting",
    icon: IconSettings,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "Users",
    icon: IconUser,
    href: "/layout/users",
  },

  {
    id: uniqueId(),
    title: "Roles",
    icon: IconSettings2,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "Registration",
    icon: IconRegistered,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "Classes",
    icon: IconCopy,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "Subjects",
    icon: IconBook,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "Timetable",
    icon: IconBook,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "Attendance (S/T)",
    icon: IconBook,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "Exams",
    icon: IconBook,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "Results",
    icon: IconBook,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "fees",
    icon: IconBook,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Student Portal",
  },
  {
    id: uniqueId(),
    title: "Profile",
    icon: IconTypography,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "Subjects",
    icon: IconTypography,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "Classes",
    icon: IconTypography,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "Fees status",
    icon: IconTypography,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "Teachers",
    icon: IconTypography,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "Student's",
    icon: IconTypography,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "Attendance",
    icon: IconTypography,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Result",
    icon: IconCopy,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Teacher Portal",
  },

  {
    id: uniqueId(),
    title: "Profile management",
    icon: IconCopy,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "Timetable",
    icon: IconCopy,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "Result upload",
    icon: IconCopy,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "Notes",
    icon: IconCopy,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "Attendance upload",
    icon: IconCopy,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register",
  },

  {
    id: uniqueId(),
    title: "Change Password",
    icon: IconPassword,
    href: "/authentication/register",
  },
  {
    navlabel: true,
    subheader: "Extra",
  },
  {
    id: uniqueId(),
    title: "Icons",
    icon: IconMoodHappy,
    href: "/icons",
  },
  {
    id: uniqueId(),
    title: "Sample Page",
    icon: IconAperture,
    href: "/sample-page",
  },
];

export default Menuitems;
