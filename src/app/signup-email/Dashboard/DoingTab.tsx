"use client"

import React, { useEffect, useState } from "react";
import NcImage from "@/components/NcImage/NcImage";
import Pagination from "@/components/Pagination/Pagination";
import Input from "@/components/Input/Input";
import { Route } from "@/routers/types";
import Link from "next/link";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import Textarea from "@/components/Textarea/Textarea";
import useSWR from "swr";
import { EmailsType } from "@/lib/types";
import { getAccessToken } from "@/utils/clientToken";
import ButtonUpdateEmail from "@/components/A/ButtonUpdate/ButtonUpdateEmail";
import NcModal from "@/components/NcModal/NcModal";
import __testhtml from "@/data/jsons/__testhtml.json"
import ShadowDom from "@/components/A/ShadowDom/ShadowDom";
import imageSuccess from "@/images/success.png";
import imagePending from "@/images/pending.png";
import Image from "next/image";
import { ConvertDateTime } from "@/utils/convertDateTime";

const DoingPageTab = () => {

    const [inputValues, setInputValues] = useState<{ [key: number]: { domain: string, note: string } }>({});

    // Hàm xử lý sự kiện khi người dùng thay đổi giá trị của ô input
    const handleInputChange = (index: number, key: string, value: string) => {
        setInputValues(prevValues => ({
            ...prevValues,
            [index]: {
                ...prevValues[index],
                [key]: value,
            },
        }));
    };

    const token = getAccessToken();

    const fetcher = (url: string) => fetch(url, { headers: { Authorization: token } }).then((res) => res.json());

    const { data, error } = useSWR("/api/emails/partners/emails-doing", fetcher);

    const removeInputValue = (value: number) => {
        const dataObject = inputValues;
        delete dataObject[value];

        // Lặp qua object để cập nhật lại chỉ số
        Object.keys(dataObject).forEach(function (index) {
            var numIndex = parseInt(index);
            if (numIndex > value) {
                dataObject[numIndex - 1] = dataObject[numIndex];
                delete dataObject[numIndex];
            }
        });
        setInputValues(dataObject);
    }

    const clearInputValues = () => {
        setInputValues({});
    }

    const [isshowModal, setIsShowModal] = useState(false);
    const [html, setHtml] = useState("");

    const setShowModal = () => {
        setIsShowModal(true);
    }

    const setConntentHtml = (value: string) => {
        setHtml(value);
    }

    const renderTrigger = () => {
        return null;
    };

    const closeModal = () => {
        setIsShowModal(false);
        setHtml('');
    }

    const renderContent = () => {
        return (
            <div className="space-y-8">
                <div className="flex justify-center items-center space-x-4">
                    <Image
                        src={html !== '' ? imageSuccess : imagePending}
                        className="w-12 h-12"
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
                            <div className="px-4">
                                The system has not received the information sent to the email.The system will automatically update the data when receiving information
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    };



    return (
        <>
            <div className="flex flex-col space-y-8">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
                        <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
                            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                                <thead className="bg-neutral-100 dark:bg-neutral-800">
                                    <tr className="text-start text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                                        <th scope="col" className="px-6 py-3">
                                            Brand
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Received Time
                                        </th>
                                        <th scope="col" className="sr-only">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                {!error && data && (
                                    <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                                        {data.data.map((item: EmailsType, index: number) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center w-48 lg:w-auto max-w-md overflow-hidden">
                                                        <div className="ms-4 flex-grow">
                                                            <div className="text-center line-clamp-1 text-sm font-semibold  dark:text-neutral-300">
                                                                <Link
                                                                    href={`https://google.com/search?q=${item.brand_name}`}
                                                                    target="_blank"
                                                                >
                                                                    <span className="text-sky-600">{item.brand_name}</span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex justify-center items-center w-48 lg:w-auto max-w-md overflow-hidden">
                                                        <span className="text-sm">{ConvertDateTime(item.updated_at)}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap flex justify-end space-x-3">
                                                    <ButtonUpdateEmail
                                                        action_type={'submit'}
                                                        id={item.id}
                                                        brand_name={item.brand_name}
                                                    />
                                                    <div>|</div>
                                                    <ButtonUpdateEmail
                                                        action_type={'cancel'}
                                                        id={item.id}
                                                        brand_name={item.brand_name}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                )}

                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <NcModal
                isOpenProp={isshowModal}
                onCloseModal={closeModal}
                contentExtraClass="max-w-screen-md"
                renderContent={renderContent}
                renderTrigger={renderTrigger}
                modalTitle=""
            />
        </>

    );
};

export default DoingPageTab;
