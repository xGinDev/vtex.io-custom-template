import { FunctionComponent } from 'react';

declare global {
    interface StorefrontFunctionComponent<P = {}> extends FunctionComponent<P> {
        getSchema?(props: P): object;
        schema?: object;
        defaultProps?: object
    }

    interface StorefrontComponent<P = {}, S = {}> extends Component<P, S> {
        getSchema?(props: P): object;
        schema: object;
        defaultProps?: object
    }
}