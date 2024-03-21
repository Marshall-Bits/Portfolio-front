import { createContext, useState } from "react";

const talkingContext = createContext();

const TalkingProvider = ({ children }) => {
    const [isTalking, setIsTalking] = useState(false);

    return (
        <talkingContext.Provider value={{ isTalking, setIsTalking }}>
            {children}
        </talkingContext.Provider>
    );
}

export { talkingContext, TalkingProvider };