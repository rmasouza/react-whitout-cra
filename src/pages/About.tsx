import './App.scss';
import React from 'react';
import useIsOnline from '../hooks/network/useIsOnline';
import useGradientBorderEffect from '../hooks/stylesEffect/useGradientBorderEffect';

import renderApp from '../utils/render/renderApp';

const About: React.FC = () => {
    const isOnline = useIsOnline();
    const { onMouseMove, elementRef, background } = useGradientBorderEffect('#3acfd5', '#3a4ed5');

    return (
        <article
            className="app__container"
            ref={elementRef}
            onMouseMove={onMouseMove}
            style={{ background }}
        >
            <section className="app">
                <header>
                    Hello World! 
                    <p>It's an about page</p>
                </header>
                <p>
                    {
                        isOnline ? 'we are online!' : 'we are not online :('
                    }
                </p>
                <a href="/">
                    back to home
                </a>
            </section>
        </article>
    );
};

export default About

renderApp(About)
