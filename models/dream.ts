export interface IDream {
    id: number | null | undefined,
    title: string | undefined,
    description: string | undefined,
    date: string,
}

export class Dream {
    public dream : IDream

    constructor(dream : IDream) {
        this.dream = dream;
    }
}