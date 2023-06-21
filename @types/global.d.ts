declare function print(...args: any[]): void;

// eslint-disable-next-line no-var
declare var HermesInternal: {
	getRuntimeProperties?: () => Record<string, string | undefined>;
};
