import { NavItemType } from "@/components/Navigation/NavigationItem";
import { Route } from "@/routers/types";
import _ from "lodash";

const randomId = _.uniqueId;

export const MEGAMENU_TEMPLATES: NavItemType[] = [
  // home pages ---------
  {
    id: randomId(),
    href: "/#",
    name: "Home Page",
    children: [
      { id: randomId(), href: "/", name: "Home page 1" },
      { id: randomId(), href: "/home-2" as Route, name: "Home page 2" },
      { id: randomId(), href: "/home-3" as Route, name: "Home page 3" },
      { id: randomId(), href: "/home-4" as Route, name: "Home page 4" },
      { id: randomId(), href: "/home-6" as Route, name: "Home page 5" },
      { id: randomId(), href: "/", name: "Header style 1", isNew: true },
      { id: randomId(), href: "/home-2" as Route, name: "Header style 2", isNew: true },
    ],
  },

  // single pages ---------
  {
    id: randomId(),
    href: "/single/demo-slug" as Route,
    name: "Single Pages",
    children: [
      {
        id: randomId(),
        href: "/single/demo-slug" as Route,
        name: "Single page 1",
      },
      {
        id: randomId(),
        href: "/single-2/demo-slug" as Route,
        name: "Single page 2",
      },
      {
        id: randomId(),
        href: "/single-3/demo-slug" as Route,
        name: "Single page 3",
      },
      {
        id: randomId(),
        href: "/single-4/demo-slug" as Route,
        name: "Single page 4",
      },

      {
        id: randomId(),
        href: "/single-audio/demo-slug" as Route,
        name: "Single Audio",
      },
      {
        id: randomId(),
        href: "/single-video/demo-slug" as Route,
        name: "Single Video",
      },
      {
        id: randomId(),
        href: "/single-gallery/demo-slug" as Route,
        name: "Single Gallery",
        isNew: true,
      },
    ],
  },

  // archive pages ---------
  {
    id: randomId(),
    href: "/#",
    name: "Archive Pages",
    children: [
      {
        id: randomId(),
        href: "/archive/demo-slug" as Route,
        name: "Category page",
      },
      {
        id: randomId(),
        href: "/archive-2/demo-slug" as Route,
        name: "Category audio",
      },
      {
        id: randomId(),
        href: "/archive-3/demo-slug" as Route,
        name: "Category videos",
      },
      {
        id: randomId(),
        href: "/search" as Route,
        name: "Search page",
      },
      {
        id: randomId(),
        href: "/search-2" as Route,
        name: "Search page 2",
      },
      {
        id: randomId(),
        href: "/author/demo-slug" as Route,
        name: "Author page",
      },
    ],
  },

  // others pages ----------------
  {
    id: randomId(),
    href: "/#",
    name: "Other Pages",
    children: [
      { id: randomId(), href: "/dashboard" as Route, name: "Dashboard" },
      { id: randomId(), href: "/about" as Route, name: "About" },
      { id: randomId(), href: "/contact" as Route, name: "Contact us" },
      {
        id: randomId(),
        href: "/login" as Route,
        name: "Login",
      },
      {
        id: randomId(),
        href: "/signup" as Route,
        name: "Signup",
      },
      {
        id: randomId(),
        href: "/forgot-pass" as Route,
        name: "Forgot password",
      },
      {
        id: randomId(),
        href: "/subscription" as Route,
        name: "Subscription",
      },
    ],
  },
];

const OTHER_PAGE_CHILD: NavItemType[] = [
  // archive pages ----------------
  {
    id: randomId(),
    href: "/archive/demo-slug" as Route,
    name: "Category pages",
    type: "dropdown",
    children: [
      {
        id: randomId(),
        href: "/archive/demo-slug" as Route,
        name: "Category page 1",
      },
      {
        id: randomId(),
        href: "/archive-2/demo-slug" as Route,
        name: "Category page 2",
      },
      {
        id: randomId(),
        href: "/archive-3/demo-slug" as Route,
        name: "Category page 3",
      },
    ],
  },

  // single pages ----------------
  {
    id: randomId(),
    href: "/single/demo-slug" as Route,
    name: "Single pages",
    type: "dropdown",
    children: [
      {
        id: randomId(),
        href: "/single/demo-slug" as Route,
        name: "Single 1",
      },
      {
        id: randomId(),
        href: "/single-2/demo-slug" as Route,
        name: "Single 2",
      },
      {
        id: randomId(),
        href: "/single-3/demo-slug" as Route,
        name: "Single 3",
      },
      {
        id: randomId(),
        href: "/single-4/demo-slug" as Route,
        name: "Single 4",
      },
      {
        id: randomId(),
        href: "/single-5/demo-slug" as Route,
        name: "Single 5",
      },
      {
        id: randomId(),
        href: "/single-audio/demo-slug" as Route,
        name: "Single Audio",
      },
      {
        id: randomId(),
        href: "/single-video/demo-slug" as Route,
        name: "Single Video",
      },
      {
        id: randomId(),
        href: "/single-gallery/demo-slug" as Route,
        name: "Single Gallery",
      },
    ],
  },

  // seach pages ----------------
  {
    id: randomId(),
    href: "/search" as Route,
    name: "Search Page",
    type: "dropdown",
    children: [
      {
        id: randomId(),
        href: "/search" as Route,
        name: "Search page",
      },
      {
        id: randomId(),
        href: "/search-2" as Route,
        name: "Search page 2",
      },
    ],
  },

  // author pages ----------------
  {
    id: randomId(),
    href: "/author/demo-slug" as Route,
    name: "Author page",
  },

  // dashboard pages ----------------
  {
    id: randomId(),
    href: "/dashboard" as Route,
    name: "Dashboard Page",
    type: "dropdown",
    children: [
      {
        id: randomId(),
        href: "/dashboard/edit-profile" as Route,
        name: "Edit profile page",
      },
      {
        id: randomId(),
        href: "/dashboard/posts" as Route,
        name: "Posts page",
      },
      {
        id: randomId(),
        href: "/dashboard/submit-post" as Route,
        name: "Submit post page",
      },
      {
        id: randomId(),
        href: "/dashboard/subscription" as Route,
        name: "Subscription",
      },
      {
        id: randomId(),
        href: "/dashboard/billing-address" as Route,
        name: "Billing address",
      },
    ],
  },

  // about pages ----------------
  {
    id: randomId(),
    href: "/about" as Route,
    name: "Other Pages",
    type: "dropdown",
    children: [
      {
        id: randomId(),
        href: "/about" as Route,
        name: "About",
      },
      {
        id: randomId(),
        href: "/contact" as Route,
        name: "Contact us",
      },
      {
        id: randomId(),
        href: "/login" as Route,
        name: "Login",
      },
      {
        id: randomId(),
        href: "/signup" as Route,
        name: "Signup",
      },
      {
        id: randomId(),
        href: "/forgot-pass" as Route,
        name: "Forgot password",
      },
      {
        id: randomId(),
        href: "/subscription" as Route,
        name: "Subscription",
      },
    ],
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: randomId(),
    href: "/",
    name: "Homes",
    type: "dropdown",
    children: [
      { id: randomId(), href: "/", name: "Home page 1" },
      { id: randomId(), href: "/home-2" as Route, name: "Home page 2" },
      { id: randomId(), href: "/home-3" as Route, name: "Home page 3" },
      { id: randomId(), href: "/home-4" as Route, name: "Home page 4" },
      { id: randomId(), href: "/home-6" as Route, name: "Home page 5" },
      { id: randomId(), href: "/", name: "Header style 1", isNew: true },
      { id: randomId(), href: "/home-2" as Route, name: "Header style 2", isNew: true },
      { id: randomId(), href: "/home-3" as Route, name: "Header style 3" },
    ],
  },

  // single pages ----------------
  {
    id: randomId(),
    href: "/single/demo-slug" as Route,
    name: "Singles",
    type: "dropdown",
    children: [
      {
        id: randomId(),
        href: "/single/demo-slug" as Route,
        name: "Single page 1",
      },
      {
        id: randomId(),
        href: "/single-2/demo-slug" as Route,
        name: "Single page 2",
      },
      {
        id: randomId(),
        href: "/single-3/demo-slug" as Route,
        name: "Single page 3",
      },
      {
        id: randomId(),
        href: "/single-4/demo-slug" as Route,
        name: "Single page 4",
      },

      {
        id: randomId(),
        href: "/single-audio/demo-slug" as Route,
        name: "Single Audio",
      },
      {
        id: randomId(),
        href: "/single-video/demo-slug" as Route,
        name: "Single Video",
      },
      {
        id: randomId(),
        href: "/single-gallery/demo-slug" as Route,
        name: "Single Gallery",
        isNew: true,
      },
    ],
  },

  //
  {
    id: randomId(),
    href: "/archive/demo-slug" as Route,
    name: "Beauty",
  },

  {
    id: randomId(),
    href: "/archive/demo-slug" as Route,
    name: "Sport",
  },
  {
    id: randomId(),
    href: "/search" as Route,
    name: "Templates",
    type: "megaMenu",
    children: MEGAMENU_TEMPLATES,
  },
  {
    id: randomId(),
    href: "/search" as Route,
    name: "Explore",
    type: "dropdown",
    children: OTHER_PAGE_CHILD,
  },
];
