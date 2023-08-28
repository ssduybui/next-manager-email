"use client"

import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import { getAccessToken } from "@/utils/clientToken";
import CopyText from "@/utils/copyText";
import Script from "next/script";
import React, { useEffect, useState } from "react";

interface Props {
    role: string;
}

const CreatePartnerPage: React.FC<Props> = ({ role }) => {
    const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

    const [userName, setUserName] = useState("");
    const [userFullName, setUserFullName] = useState("");
    const [selectRole, setSelectRole] = useState("partner");
    const [processing, setProcessing] = useState(false);

    const [resultUserName, setResultUserName] = useState("");
    const [resultPassword, setResultPassword] = useState("");

    const tokenUser = getAccessToken();

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectRole(event.target.value);
    };
    console.log(selectRole)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setProcessing(true);

        window.grecaptcha.ready(() => {
            window.grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(async (token) => {

                const body = {
                    userName,
                    userFullName,
                    selectRole,
                    tokenUser,
                    recaptcha_token: token
                }

                try {
                    const response = await fetch('/api/users/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ body }),
                    })

                    if (response.ok) {
                        setProcessing(false);

                        const json = await response.json();
                        if (json.statusCode === 200) {
                            setResultUserName(json.data.user_name);
                            setResultPassword(json.data.user_password);
                        } else {
                            alert(json.message);
                        }
                    }
                } catch (error) {
                    alert("Unable to Login. Please try again later")
                }
            });
        });
    }

    const handleClear = () => {
        setUserName("");
        setUserFullName("");
        setResultUserName("");
        setResultPassword("");
    }

    const handleCopy = (str: string) => {
        /* navigator.clipboard.writeText(str); */
        CopyText(str)
    }

    return (
        <>
            <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
                {resultUserName === '' ?
                    <form className="space-y-8"
                        onSubmit={handleSubmit}
                    >
                        <div className="grid md:grid-cols-2 gap-6">
                            <label className="block">
                                <Label>User Name</Label>
                                <Input
                                    required
                                    placeholder="Example: duybui"
                                    type="text"
                                    className="mt-1"
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </label>
                            <label className="block">
                                <Label>Full Name</Label>
                                <Input
                                    required
                                    placeholder="Example: Duy Bui"
                                    type="text"
                                    className="mt-1"
                                    onChange={(e) => setUserFullName(e.target.value)}
                                />
                            </label>
                            {role === "admin" && (
                                <label className="block flex flex-col space-y-2">
                                    <Label>Role</Label>
                                    <select
                                        value={selectRole}
                                        className="w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200/50 bg-white dark:border-neutral-500 dark:focus:ring-primary-500/30 dark:bg-neutral-900 rounded-full text-sm font-normal h-11 px-4 py-3 mt-1"
                                        onChange={handleSelectChange}
                                    >
                                        <option value="partner">Partner</option>
                                        <option value="manager">Manager</option>

                                    </select>
                                </label>
                            )}

                        </div>
                        <ButtonPrimary className="w-full" type="submit" disabled={processing}>
                            {processing ?
                                <div role="status">
                                    <svg aria-hidden="true" className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span>Processing...</span>
                                </div>
                                :
                                <span>Continue</span>
                            }

                        </ButtonPrimary>
                    </form>
                    :
                    <div className="space-y-8">
                        <div className="flex justify-around items-center space-x-2">
                            <div className="h-1 bg-teal-500 w-full"></div>
                            <div className="w-1/3 text-center font-bold">RESULT</div>
                            <div className="h-1 bg-teal-500 w-full"></div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <span>User Name</span>
                                <div className="border-2 rounded-full flex justify-between">
                                    <span className="p-3">{resultUserName}</span>
                                    <button
                                        className="rounded-full px-6 py-3 text-white bg-teal-500 hover:bg-teal-300"
                                        onClick={() => handleCopy(resultUserName)}
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <span>Password</span>
                                <div className="border-2 rounded-full flex justify-between">
                                    <span className="p-3">{resultPassword}</span>
                                    <button
                                        className="rounded-full px-6 py-3 text-white bg-teal-500 hover:bg-teal-300"
                                        onClick={() => handleCopy(resultPassword)}
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ButtonPrimary className="w-full" onClick={handleClear}>
                            Clear
                        </ButtonPrimary>
                    </div>
                }
            </div>
            <Script src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`} />
        </>

    );
};

export default CreatePartnerPage;
