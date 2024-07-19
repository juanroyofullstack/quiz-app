import React from 'react';

export function Fallback({ errorMessage, refreshOnClick }: { errorMessage: string, refreshOnClick: () => void})  {
    return (
        <div role="alert">
            <p>Something went wrong: {errorMessage}</p>
            <pre style={{ color: "red" }}><button onClick={() => refreshOnClick()}>refresh</button></pre>
        </div>
    );
}