import { IconBrandGithub } from "@tabler/icons-react"

import Header from "@/components/Header"

// DESC: Stores informations for an author.
interface Author {
    name: string;
    job: string;
    github: string;
}

// DESC: Displays information about Skintector.
const About: React.FC = () => {
    const authors: Author[] = [
        { 
            name: 'Jeffrey Jin', 
            job: 'Project Lead, UI Designer, and Front-End Developer', 
            github: 'https://github.com/jeffreyjkjin' 
        },
        { 
            name: 'Long Tran', 
            job: 'Main Machine Learning and Back-End Developer', 
            github: 'https://github.com/hlongtr' 
        },
        { 
            name: 'Hui Hua (Emily) Huang', 
            job: 'Main UI Designer', 
            github: 'https://github.com/ehuang3h' 
        },
        { 
            name: 'Albert Hong', 
            job: 'Machine Learning Developer', 
            github: 'https://github.com/07Albert' 
        }
    ];

    const authorSection: JSX.Element[] = authors.map((author: Author) => {
        return (
            <>
                <div className="flex font-bold text-blue text-xl items-center gap-2">
                    {author.name}
                    <a href={author.github}>
                        <IconBrandGithub />
                    </a>
                </div>
                {author.job}
            </>
        );
    })

    return (
        <div className="min-w-screen min-h-screen bg-white">
            <Header />
            <div className="flex flex-col font-Inter text-black mx-4 md:mx-20 lg:mx-40 xl:mx-60">
                <div className="flex flex-col gap-2">
                    <p className="font-bold text-3xl">
                        About the team
                    </p>
                    Skintector was entirely developed by students from SFU for CMPT340 Spring 2024.
                    {authorSection}
                </div>
            </div>
        </div>
    )
}

export default About;