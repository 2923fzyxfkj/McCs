interface McCs {
    commandResultProcesser(command: string, ...moreInfo: string[]): void;
    registerRouter(
        options: (
            string | [string, ((location: Location) => void)]
        )[]
    ): void;
    summon?(): void;

    readonly HTMLMIMEType: 'text/html';
}