import { Link } from 'react-router-dom'


// DESC: Home page for website; displays information about classifer.
const Home: React.FC = () => {
    return (
        <>
            <Link to={'/classifier'}> 
                <button>
                    use classfier
                </button>
            </Link>
            <Link to={'/'}>
                <button>
                    previous results
                </button>
            </Link>
        </>
    );
}

export default Home;