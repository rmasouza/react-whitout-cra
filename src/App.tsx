import React from 'react';
import useIsOnline from './hooks/network/useIsOnline';


const App: React.FC = () => {
    const isOnline = useIsOnline();

    return (
        <article>
            <header>Hello World!</header>
            <section>
                {
                    isOnline ? 'we are online!' : 'we are not online :('
                }
            </section>
        </article>
    );
};

export default App;
