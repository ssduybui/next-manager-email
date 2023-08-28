import NcModal from "@/components/NcModal/NcModal";
import { getAccessToken } from "@/utils/clientToken";
import { ValidateDomain } from "@/utils/constants";
import { FormEvent, useState } from "react";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { getMainDomain } from "@/utils/getMainDomain";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Textarea/Textarea";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import ButtonThird from "@/components/Button/ButtonThird";
import imageSuccess from "@/images/success.png";
import imagePending from "@/images/pending.png";
import imageError from "@/images/error.png";
import ShadowDom from "../ShadowDom/ShadowDom";
import Image from "next/image";
import FirstWordUpperCase from "@/utils/firstWordUpperCase";

interface Props {
    action_type: string;
    id: number;
    brand_name?: string;
}

export interface SendRequest {
    action_type: string;
    id: number;
    domain?: string | null;
    name_domain?: string | null;
    note?: string | null;
}

async function sendRequest(url: string, { arg }: { arg: SendRequest }) {

    const userInfo = {
        action_type: arg.action_type,
        id: arg.id,
        domain: arg.domain,
        name_domain: arg.name_domain,
        note: arg.note
    }

    const token = getAccessToken();

    return await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(userInfo)
    }).then(response => response.json())
}

const ButtonUpdateEmail: React.FC<Props> = ({
    action_type,
    id,
    brand_name,
}) => {


    let titleButton = "Cancel";
    let classButton = "text-rose-600 hover:text-rose-900"

    switch (action_type) {
        case "cancel":
            titleButton = "Cancel";
            classButton = "text-rose-600 hover:text-rose-900"
            break;
        case "submit":
            titleButton = "Submit";
            classButton = "text-primary-800 dark:text-primary-500 hover:text-primary-900"
            break;
        case "show":
            titleButton = "Show";
            classButton = "text-primary-800 dark:text-primary-500 hover:text-primary-900"
            break;
        default:
            titleButton = "OK";
            classButton = "text-rose-600 hover:text-rose-900"
            break;
    }


    const pathAPI = "api/actions/update-email"
    const { trigger, isMutating } = useSWRMutation(pathAPI, sendRequest)
    const { mutate } = useSWRConfig()

    const [domainUrl, setDomainUrl] = useState('');
    const [html, setHtml] = useState("");
    const [noteSubmit, setNoteSubmit] = useState('');
    const [noteCancel, setNoteCancel] = useState('Can not register');
    const [stateUpdate, setStateUpdate] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {

            if (action_type === "submit") {

                const mainDomain = await getMainDomain(domainUrl);

                const result = await trigger({
                    action_type: action_type,
                    id: id,
                    domain: domainUrl,
                    name_domain: mainDomain,
                    note: noteSubmit
                })

                if (result.statusCode === 200) {

                    setStateUpdate('success')
                    setHtml(result.data.html);

                } else {
                    setStateUpdate('error')
                }

            } else {
                const result = await trigger({
                    action_type: action_type,
                    id: id,
                    note: noteCancel
                })

                if (result.statusCode === 200) {
                    setStateUpdate('success')
                } else {
                    setStateUpdate('error')
                }
            }
        } catch (error) {
            console.log(error)
            alert("Update failed")
        }
    }

    const closeModal = () => {
        setDomainUrl('')
        setHtml('')
        setNoteSubmit('')
        setNoteCancel('Can not register')
        setStateUpdate('')

        mutate('/api/emails/partners/emails-doing')
        mutate(
            key => typeof key === 'string' && key.startsWith('/api/emails/emails-statistics?role')
        )
    }

    const renderContent = () => {
        return (
            <div className="space-y-5">
                {action_type === "submit" && (
                    <>
                        {isMutating
                            ?
                            <div className="h-64 flex justify-center items-center space-x-2">
                                <div role="status">
                                    <svg aria-hidden="true" className="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                </div>
                                <span className="text-xl text-gray-500 dark:text-gray-400">Waiting...</span>
                            </div>
                            :
                            <>
                                {stateUpdate !== ''
                                    ?
                                    <>
                                        {stateUpdate === "success" && (
                                            <div className="space-y-8">
                                                <div className="flex justify-center items-center space-x-4">
                                                    <Image
                                                        src={html !== '' ? imageSuccess : imagePending}
                                                        className="w-8 h-8"
                                                        alt="state name"
                                                    />
                                                    <div className="text-3xl font-bold">{html !== '' ? "Success" : "Pending"}</div>
                                                </div>
                                                <div className="p-4">
                                                    <div className="max-h-96 overflow-auto">
                                                        {html !== '' ?
                                                            <div className="flex justify-center items-center">
                                                                <ShadowDom html={html} />
                                                            </div>
                                                            :
                                                            <div className="px-4 flex justify-center">
                                                                <span>The system has not received the information sent to the email.The system will automatically update the data when receiving information</span>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {stateUpdate === "error" && (
                                            <div className="space-y-8">
                                                <div className="flex justify-center items-center space-x-4">
                                                    <Image
                                                        src={imageError}
                                                        className="w-8 h-8"
                                                        alt="state name"
                                                    />
                                                    <div className="text-3xl font-bold">Update Failed</div>
                                                </div>
                                                <div className="p-4">
                                                    <div className="max-h-96 overflow-auto">
                                                        <div className="px-4">
                                                            Domain already exists or An unexpected error occurred. Please try again later
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                    :
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-5"
                                    >
                                        <div className="font-bold text-center text-xl">Please fill in the required fields to complete</div>
                                        <Input
                                            value={domainUrl}
                                            required
                                            placeholder="Domain link (required)"
                                            type="url"
                                            onChange={(e) => setDomainUrl(e.target.value)}
                                        />
                                        <Textarea
                                            value={noteSubmit}
                                            placeholder="Affiliate link if exists"
                                            onChange={(e) => setNoteSubmit(e.target.value)}
                                        />
                                        <div className="flex justify-center space-x-4">
                                            <ButtonPrimary type="submit">
                                                Continue
                                            </ButtonPrimary>
                                        </div>
                                    </form>
                                }
                            </>
                        }
                    </>
                )}

                {action_type === "cancel" && (
                    <>
                        {isMutating
                            ?
                            <div className="h-64 flex justify-center items-center space-x-2">
                                <div role="status">
                                    <svg aria-hidden="true" className="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                </div>
                                <span className="text-xl text-gray-500 dark:text-gray-400">Waiting...</span>
                            </div>
                            :
                            <>
                                {stateUpdate !== ''
                                    ?
                                    <>
                                        {stateUpdate === "success" && (
                                            <div className="space-y-8">
                                                <div className="flex justify-center items-center space-x-4">
                                                    <Image
                                                        src={imageSuccess}
                                                        className="w-8 h-8"
                                                        alt="state name"
                                                    />
                                                    <div className="text-3xl font-bold">Success</div>
                                                </div>
                                                <div className="p-4">
                                                    <div className="max-h-96 overflow-auto">
                                                        <div className="px-4">
                                                            You have successfully canceled <span className="text-red-900 font--bold">{brand_name}</span> for the reason: <span className="text-red-900 font-bold">{noteCancel}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {stateUpdate === "error" && (
                                            <div className="space-y-8">
                                                <div className="flex justify-center items-center space-x-4">
                                                    <Image
                                                        src={imageSuccess}
                                                        className="w-8 h-8"
                                                        alt="state name"
                                                    />
                                                    <div className="text-3xl font-bold">Update Failed</div>
                                                </div>
                                                <div className="p-4">
                                                    <div className="max-h-96 overflow-auto">
                                                        <div className="px-4">
                                                            An unexpected error occurred. Please try again later
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                    :
                                    <>
                                        <form
                                            onSubmit={handleSubmit}
                                            className="space-y-5"
                                        >
                                            <div className="font-bold text-center text-xl">Please enter your reason for canceling</div>
                                            <div className="flex justify-center">
                                                <div className="w-96 space-y-2">
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="radio"
                                                            value="Can not register"
                                                            checked={noteCancel === 'Can not register'}
                                                            onChange={(e) => setNoteCancel(e.target.value)}
                                                            className="text-sm"
                                                        />
                                                        <span>Can not register</span>
                                                    </label>
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="radio"
                                                            value="Can not access"
                                                            checked={noteCancel === 'Can not access'}
                                                            onChange={(e) => setNoteCancel(e.target.value)}
                                                            className="text-sm"
                                                        />
                                                        <span>Can not access</span>
                                                    </label>
                                                    <Textarea
                                                        className="w-full"
                                                        placeholder="other"
                                                        onChange={(e) => setNoteCancel(e.target.value)}
                                                    />
                                                </div>

                                            </div>

                                            <div className="flex justify-center space-x-4">
                                                <ButtonPrimary type="submit">
                                                    Continue
                                                </ButtonPrimary>
                                            </div>
                                        </form>
                                    </>
                                }
                            </>
                        }
                    </>
                )}

            </div>
        )
    }

    /* const renderTrigger = () => {
        setIsShowModal(true)
    }; */
    return (
        <>

            <NcModal
                renderTrigger={(openModal) => (
                    <button
                        className={`text-sm ${classButton}`}
                        onClick={openModal}
                    >
                        {titleButton}
                    </button>
                )}
                onCloseModal={closeModal}
                contentExtraClass="max-w-screen-md"
                renderContent={renderContent}

                modalTitle={FirstWordUpperCase(action_type)}
            />

        </>
    )
}

export default ButtonUpdateEmail