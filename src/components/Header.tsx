import { Burger } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Link } from 'react-router-dom'

const items: any = [
    { name: 'Classifier', link: '/classifier' },
    { name: 'Previous Diagnoses', link: '/previous-diagnoses' },
    { name: 'About', link: '/about' }
];

// DESC: Header element with buttons to go to different pages.
const Header: React.FC = () => {
    const [opened, { toggle }] = useDisclosure();

    // Create buttons for each item
    const buttons: JSX.Element[] = items.map((item: any) => {
        return (
            <Link 
                className="font-bold text-xl border-solid md:border-none border-b-2 border-black p-3 md:p-0" 
                key={item.name} 
                to={item.link}
            >
                {item.name}
            </Link>
        );
    });

    return (
        <>
            <div className="flex flex-col md:flex-row items-center bg-white font-Inter p-4 place-content-center md:place-content-start">
                <Link className="font-black text-blue text-2xl" to='/'>
                    Skintector
                </Link>
                <div className="hidden md:flex grow justify-end gap-20">
                    {buttons}
                </div>
                <Burger
                    className="block md:hidden absolute right-4"
                    opened={opened}
                    onClick={toggle}
                />
            </div>
            {opened &&
                <div className="w-screen font-Inter text-black flex md:hidden flex-col text-center border-solid border-t-2 border-black" >
                    {buttons}
                </div>
            }
        </>
    );
}

export default Header;