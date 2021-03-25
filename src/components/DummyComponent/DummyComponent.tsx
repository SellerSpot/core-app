import { merge } from "lodash";
import React from "react";

export interface IDummyComponentProps {
    message:string;
}
 
export const DummyComponent: React.FC<IDummyComponentProps> = (props:IDummyComponentProps) => {
    
    const defaultProps:IDummyComponentProps = {
        message: "Welcome to Core-App Storybook"
    }

    // combining default and passed props
    const requiredProps = merge(defaultProps,props);   

    return (<h1>{requiredProps.message}</h1>);
}
