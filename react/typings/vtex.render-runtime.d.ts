declare module 'vtex.render-runtime' {
    interface Runtime {
        setQuery: (
            vars: { skuId: string },
            options?: { replace?: boolean }
        ) => void;
        query?: Record<string, string>;
        amp: any;
        account: string;
        hints: Record<'mobile' | 'desktop', boolean>;
        navigate: (options: any) => void;
    }

    export const useRuntime: () => Runtime;

    export const Link: FC<{ to: string; className: string }>;
}
