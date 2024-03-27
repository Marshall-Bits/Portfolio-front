import { createContext, useState } from "react";

const soundContext = createContext();

const SoundProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(false);

    return (
        <soundContext.Provider value={{ isMuted, setIsMuted }}>
            {children}
        </soundContext.Provider>
    );
}

export { soundContext, SoundProvider };