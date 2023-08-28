
import React, { FC, useEffect, useState } from "react";
import Logo from "@/components/Logo/Logo";
import Navigation from "..//Navigation/Navigation";
import MenuBar from "../MenuBar/MenuBar";
import SwitchDarkMode from "@/components/SwitchDarkMode/SwitchDarkMode";
import SearchModal from "./SearchModal";
import Button from "../../Button/Button";
import AvatarDropdown from "./AvatarDropdown";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { getRoleUser } from "@/lib/apirole";


export interface MainNav1Props { }

const MainNav1: FC<MainNav1Props> = async ({ }) => {
  const session = await getServerSession();

  let role = '';
  if (session) {
    role = await getRoleUser(session.user?.email);
  }

  return (
    <div className="nc-MainNav1 relative z-10 bg-white dark:bg-slate-900 ">
      <div className="container">
        <div className="h-20 py-5 flex justify-between items-center">
          {/* <div className="flex items-center lg:hidden flex-1">
            <MenuBar />
          </div> */}

          <div className="flex justify-start lg:justify-start flex-1 items-center space-x-4 sm:space-x-10 2xl:space-x-14 rtl:space-x-reverse">
            <Logo />
            {/* <Navigation className="hidden lg:flex" /> */}
          </div>

          <div className="flex-1 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1 rtl:space-x-reverse">
            <div className="hidden items-center lg:flex">
              <SwitchDarkMode />
              <div className="px-1"></div>
              {session && session !== null && (<AvatarDropdown userName={session.user?.email} userFullName={session.user?.name} role={role} />)}
            </div>
            <div className="flex items-center lg:hidden">
              <SwitchDarkMode />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
