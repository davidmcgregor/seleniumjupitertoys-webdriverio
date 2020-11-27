export {default as HomePage} from './HomePage';
export {default as ContactPage} from './ContactPage';
export {default as ShopPage} from './ShopPage';
export {default as CartPage} from './CartPage';

export function open<T>(type: { new(): T; }): T {
    return new type();
}