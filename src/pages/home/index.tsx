import { Button, Overlay, Progress } from '@mantine/core'
import { Link } from 'react-router-dom'

// DESC: Home page for website; displays information about classifer.
const Home: React.FC = () => {
    return (
        <div className="w-screen h-screen">
            <div className="w-full h-full absolute z-0">
                <Overlay 
                    gradient="linear-gradient(90deg, rgba(30,30,30,1) 0%, rgba(255,255,255,0) 100%)"
                />
                <img className="w-full h-full hidden md:block" src="/hero.jpg" />
                <img className="w-full h-full block md:hidden" src="/hero-mobile.jpg" />
            </div>
            <div className="w-full h-full flex items-center">
                <div className="flex flex-col gap-6 md:gap-8 font-Inter relative z-10 m-5 md:m-20 text-center">
                    <p className="font-black text-white text-6xl md:text-8xl">
                        Skintector
                    </p>
                    <Progress className="w-full md:w-5/6" color="#3943B7" value={100} />
                    <p className="font-bold text-white text-xl md:text-2xl">
                        Diagnose skin conditions from the comfort of your own home
                    </p>
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 my-8 md:my-0">
                        <Button
                            className="w-full md:w-[30%]"
                            variant="filled" 
                            color="#3943B7"
                            size="lg" 
                            radius="md" 
                            component={Link} 
                            to="/classifier"
                        >
                            <p className="text-white text-2xl font-bold">
                                Get Started
                            </p>
                        </Button>
                        <Button
                            className="w-full md:w-[30%]"
                            variant="filled"
                            color="#CED3DC"
                            size="lg"
                            radius="md"
                            ps="10"
                            pe="10"
                            component={Link}
                            to="/previous-diagnoses" 
                        >
                            <p className="text-black text-2xl font-bold">
                                View Diagnoses
                            </p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;