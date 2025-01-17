import { default as default_2 } from 'react';

declare interface LimitConfig<T> {
    stateKey?: string;
    flag?: {
        type: 'toggle' | 'max' | 'value';
        count?: number;
        value?: StateValue;
    };
    stateSelector?: (state: T) => unknown;
    flagFunction?: (value: T) => boolean;
}

export declare type SchemeCheckConfig<T = unknown> = Record<string, LimitConfig<T>>;

export declare const SchemeCheckProvider: default_2.FC<{
    config?: SchemeCheckConfig;
    children?: default_2.ReactNode;
}>;

declare type StateValue = boolean | string | number | boolean[] | string[] | number[];

export declare function useSchemeCheck<RootState = unknown>(featureId: string): {
    isFlagged: boolean;
    isFlagReached: boolean;
};

export { }
