import React from 'react';
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import app from '../../firebase/firebase';

const auth = getAuth(app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>
                {/* <span>
                    <img src="webp/loading.webp" alt="loading..." />
                 </span> */}
                 <div class="loading">
	               <div class="loading-text">
		               <span class="loading-text-words">4</span>
		               <span class="loading-text-words">-</span>
		               <span class="loading-text-words">6</span>
		               <span class="loading-text-words"></span>
		               <span class="loading-text-words">D</span>
		               <span class="loading-text-words">E</span>
		               <span class="loading-text-words">C</span>
	               </div>
                 </div>
            </div> : children}
        </AuthContext.Provider>
    );
};