import {Element} from '@wdio/sync';

export default abstract class BaseComponent<T> {
    protected rootElement: Element;
    public readonly parent: T;

    constructor(rootElement: Element, parent: T) {
        this.rootElement = rootElement;
        this.parent = parent;
    }
}
