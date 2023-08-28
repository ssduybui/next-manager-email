

import Heading2 from "@/components/Heading/Heading2";
import DashBoardManager from "./DashBoard/DashBoardManager";
import Statistics from "@/components/A/Statistic/Statistic";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getRoleUser } from "@/lib/apirole";

const ManagerPage = async () => {
    const session = await getServerSession();
    if (!session || session === null) {
        redirect('/')
    }

    const role = await getRoleUser(session.user?.email)

    if (role.user_role === "partner") {
        redirect('/signup-email')
    } else if (role.user_role === null) {
        redirect('/')
    }

    return (
        <>

            <div className={`nc-PageDashboard container`}>
                <header className="text-center max-w-2xl mx-auto mb-12">
                    <Heading2 emoji="">Manager</Heading2>
                    <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
                        Statistics, user management and user creation.
                    </span>
                </header>

                <div className="p-5 space-y-12 mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-12 dark:bg-neutral-900">
                    <Statistics role={role.user_role}/>
                    <DashBoardManager role={role.user_role} />
                </div>

            </div>
        </>

    )
}

export default ManagerPage;