import { Button } from '@mantine/core'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import { IconArrowBackUp, IconHome } from '@tabler/icons-react'

import Header from '@/components/Header'

// DESC: Informs the user that an error has occured or the page they request could not be found.
const Error: React.FC = () => {
    const navigate: NavigateFunction = useNavigate();

    return (
        <>
            <div className="h-screen w-screen bg-white relative">
                <Header />
                <div className="w-full flex flex-col font-Inter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-8 text-center">
                    <p className="font-bold text-blue text-[7rem] -my-10">
                        404
                    </p>
                    <p className="text-black">
                        An unexpected error has occured and the page you were looking for could not be found.
                    </p>
                    <div className="flex gap-12 place-content-center">
                        <Button
                            className="w-[12.5%]"
                            variant="filled"
                            color="#3943B7"
                            size="lg"
                            radius="md"
                            leftSection={<IconHome className="text-white" size="32" />}
                            component={Link}
                            to="/"
                        >
                            <p className="font-bold text-white text-2xl">
                                Home
                            </p>
                        </Button>
                        <Button
                            className="w-[12.5%]"
                            variant="filled"
                            color="#DB5461"
                            size="lg"
                            radius="md"
                            leftSection={<IconArrowBackUp className="text-white" size="32" />}
                            onClick={() => navigate(-1)}
                        >
                            <p className="font-bold text-white text-2xl">
                                Go Back
                            </p>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Error;