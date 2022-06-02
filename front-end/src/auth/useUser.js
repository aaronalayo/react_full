import { useEffect, useState } from "react";
import { useToken } from "./useToken";

export const useUser = () => {
    const [token] = useToken();

    const getPayLoadFromToken = token => {
        const encodedPayload = token.split('.')[1];
        return JSON.parse(window.atob(encodedPayload))
    }
    const [user, setUser] = useState(() => {
        if (!token) return null;
        return getPayLoadFromToken(token);
    });

    useEffect(() => {
        if (!token) {
            setUser(null);
        } else {
            setUser(getPayLoadFromToken(token));
            console.log(user)
        }
    }, [token]);

    return user
}