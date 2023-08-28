
import Heading2 from "@/components/Heading/Heading2";
import { useState } from "react";
import DashBoard from "./Dashboard/DashBoard";
import Statistics from "@/components/A/Statistic/Statistic";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getRoleUser } from "@/lib/apirole";

const SignupEmailPage = async () => {
    const session = await getServerSession();
    if (!session || session === null) {
        redirect('/')
    }
    
    const role = await getRoleUser(session.user?.email)
    
    if (role.user_role === "manager" || role.user_role === "admin") {
        redirect('/manager')
    } else if (role === null) {
        redirect('/')
    }

    return (

        <div className={`nc-PageDashboard container`}>
            <div className="p-5 mx-auto bg-white space-y-8 rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-12 dark:bg-neutral-900">
                
                <Statistics role={role.user_role}/>
                <DashBoard user_name={session.user?.email} user_fullname={session.user?.name} />
            </div>
        </div>

    )
}

export default SignupEmailPage;