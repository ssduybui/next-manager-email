import React from "react";
import Heading2 from "@/components/Heading/Heading2";
import FormLogin from "@/components/A/FormLogin/FormLogin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getRoleUser } from "@/lib/apirole";

const HomePage = async ({ }) => {

    const session = await getServerSession();
    
    if (session !== null) {
        redirect('/signup-email')
    }

    return (
        <div className="container relative py-36">
            {/* CONTENT */}
            <div className="p-5 mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900">
                <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20 ">
                    <Heading2>Login</Heading2>
                    <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
                        Welcome to Our Future
                    </span>
                </header>

                <div className="max-w-md mx-auto space-y-6">
                    {/* FORM */}
                    <FormLogin />

                </div>
            </div>
        </div>
    );
};

export default HomePage;
