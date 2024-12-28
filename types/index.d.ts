interface McCs {
    commandResultProcesser(command: string, ...moreInfo: string[]): void;
    registerRouter(
        options: (
            string | [string, ((location: Location) => void)]
        )[]
    ): void;
    getFetchOptions<T extends string>(mime: T): {
        headers: {
            accept: `${T}; charset=utf-8`;
            'cache-control': 'no-cache';
        };
        cache: 'no-cache';
    };

    summon?(): void;
}