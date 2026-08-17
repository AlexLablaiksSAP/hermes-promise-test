declare function print(...args: any[]): void;

declare var HermesInternal: {
	getRuntimeProperties?: () => Record<string, string | undefined>;
};
