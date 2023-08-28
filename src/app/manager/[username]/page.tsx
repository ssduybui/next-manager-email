
import DashBoardUser from "./DashBoard/DashBoardUser";
import Heading2 from "@/components/Heading/Heading2";
import Statistics from "@/components/A/Statistic/Statistic";
import { getRoleUser } from "@/lib/apirole";

interface Props {
    params: {
        username: string;
    }
}

const SignupEmailPage: React.FC<Props> = async ({params}) => {
    const username = decodeURIComponent(params.username);
    
    const viewer = await getRoleUser(username)
    
    return (
        <div className={`nc-PageDashboard container`}>

            <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-24">
                <Heading2 emoji="">{viewer.user_fullname}</Heading2>
                <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
                    @{viewer.user_name}
                </span>
            </header>

            <div className="p-5 mx-auto bg-white space-y-8 rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-12 dark:bg-neutral-900">
                <Statistics role={"view"}/>
                <DashBoardUser viewer={viewer.user_name}/>
            </div>

        </div>
    )
}

export default SignupEmailPage;