import { Button, Overlay, Progress } from '@mantine/core'
import { Link } from 'react-router-dom'

// DESC: Home page for website; displays information about classifer.
const Home: React.FC = () => {
    return (
        <>
            <div className="w-screen h-screen absolute z-0">
                <Overlay 
                    gradient="linear-gradient(90deg, rgba(28,28,28,1) 0%, rgba(255,255,255,0) 100%)"
                />
                <img className="w-screen h-screen" src="/hero.jpg" />
            </div>
            <div className="w-screen h-screen flex items-center">
                <div className="flex flex-col gap-8 font-Inter relative z-10 m-20">
                    <p className="font-black text-white text-8xl">
                        Skintector
                    </p>
                    <Progress className="w-5/6" color="#3943B7" value={100} />
                    <p className="font-bold text-white text-2xl">
                        Diagnose skin conditions from the comfort of your own home
                    </p>
                    <div className="flex gap-12">
                        <Button
                            className="w-[30%]"
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
                            className="w-[30%]"
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
        </>
    );
}

export default Home;