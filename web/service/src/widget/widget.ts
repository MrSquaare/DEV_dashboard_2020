export abstract class Widget {
    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;

    abstract create(): JSX.Element;
}
