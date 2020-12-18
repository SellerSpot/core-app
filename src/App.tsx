import React, {ReactElement} from 'react';

export const App = (): ReactElement => {
    return (
        <div>
            Typescript Prettier eslint react app starter
            <br />
            <br />
            no cra template =&gt; completely built with webpack
            <br />
            <br />
            supported file extensions:-
            <br />
            <ul>
                <li>ts</li>
                <li>tsx</li>
                <li>js</li>
                <li>jsx</li>
                <li>css</li>
            </ul>
            <br />
            Note: for additional file extension install corresponding loaders
        </div>
    );
};
