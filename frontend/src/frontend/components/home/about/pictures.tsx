import { useEffect, useState } from 'react';

const Compilation = () => {
    const [filePaths, setFilePaths] = useState<string[]>([]);
    const location = "AboutCollage";

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_ROOT}/home/photos/${location}`);
                const data = await response.json();
                setFilePaths(data.map((item: { file_path: string }) => item.file_path));
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };

        fetchPhotos();
    }, [location]);

    return (
        <div className="w-full sm:w-2/3 flex items-center justify-center relative h-auto sm:h-[550px]">
            <div className="hidden sm:flex flex-col gap-1">
                <div className="flex gap-1 h-56">
                    <div className="w-2/3">
                        {filePaths[0] && (
                            <img
                                src={`${import.meta.env.VITE_API_ROOT}/${filePaths[0]}`}
                                alt="description"
                                className="object-cover h-full w-full"
                            />
                        )}
                    </div>
                    <div className="w-1/3">
                        {filePaths[1] && (
                            <img
                                src={`${import.meta.env.VITE_API_ROOT}/${filePaths[1]}`}
                                alt="description"
                                className="object-cover h-full w-full"
                            />
                        )}
                    </div>
                </div>
                <div className="flex gap-1 h-56">
                    <div className="w-1/2">
                        {filePaths[2] && (
                            <img
                                src={`${import.meta.env.VITE_API_ROOT}/${filePaths[2]}`}
                                alt="description"
                                className="object-cover h-full w-full"
                            />
                        )}
                    </div>
                    <div className="w-1/2">
                        {filePaths[3] && (
                            <img
                                src={`${import.meta.env.VITE_API_ROOT}/${filePaths[3]}`}
                                alt="description"
                                className="object-cover h-full w-full"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Compilation;