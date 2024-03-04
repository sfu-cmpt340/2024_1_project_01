import { Link } from 'react-router-dom'

const items: any = [
    { name: 'Classifier', link: '/classifier' },
    { name: 'Previous Diagnoses', link: '/previous-diagnoses' },
    { name: 'About', link: '/about' }
];

// DESC: Header element with buttons to go to different pages.
const Header: React.FC = () => {
    // Create buttons for each item
    const buttons: JSX.Element[] = items.map((item: any) => {
        return (
            <Link className="font-bold text-xl" key={item.name} to={item.link}>
                {item.name}
            </Link>
        );
    });

    return (
        <div className="flex items-center bg-white font-Inter p-4">
            <Link className="font-black text-blue text-2xl" to='/'>
                Skintector
            </Link>
            <div className="flex grow justify-end gap-20">
                {buttons}
            </div>
        </div>
    );
}

export default Header;