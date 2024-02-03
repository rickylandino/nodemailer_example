
'use client'
import { useState } from "react";
import { useForm } from "react-hook-form"
import { performSend } from "./services/mailService";

type FormValues = {
    to_email: string
}

export default function Home() {

    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<string>('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>()

    function onSubmit(values: FormValues) {
        setLoading(true);

        let postdata = {
            ...values
        };

        performSend(postdata).then((response) => {
            setLoading(false);

            if (response.error) {
                console.log(response);
                setStatus("error");
            } else {
                setStatus("success");
                reset();
            }
        }).catch((err) => {
            console.log(err);
            setStatus("error");
            setLoading(false);
        });
    }

    return (
        <>
            <form
                className="rounded-2xl p-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Your Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" placeholder="Your Email" type="email"
                        {...register("to_email")}
                    />
                    
                    <small className="ml-4">The email you add above will receive the sample email sent.</small>
                </div>
                <button className="m-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex" disabled={loading}>
                    {loading &&
                        <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx={12}
                                cy={12}
                                r={10}
                                stroke="currentColor"
                                strokeWidth={4}
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                    }
                    Send Email
                </button>
            </form>
            {status === 'error' &&
                <div
                    id="alert-border-2"
                    className="flex items-center p-4 mt-4 ml-16 mr-16 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
                    role="alert"
                >
                    <svg
                        className="flex-shrink-0 w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <div className="ms-3 text-sm font-medium">
                        Error. Something went wrong. Check your SMTP settings and utilize console log.
                    </div>
                    <button
                        onClick={() => setStatus('')}
                        type="button"
                        className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                        data-dismiss-target="#alert-border-2"
                        aria-label="Close"
                    >
                        <span className="sr-only">Dismiss</span>
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>
                </div>
            }
            {status === 'success' &&
                <div
                    id="alert-border-3"
                    className="flex items-center p-4 mt-4 ml-16 mr-16 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
                    role="alert"
                >
                    <svg
                        className="flex-shrink-0 w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <div className="ms-3 text-sm font-medium">
                        Success! Your message has been sent.
                    </div>
                    <button
                        onClick={() => setStatus('')}
                        type="button"
                        className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                        data-dismiss-target="#alert-border-3"
                        aria-label="Close"
                    >
                        <span className="sr-only">Dismiss</span>
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>
                </div>
            }
        </>

    );
}
