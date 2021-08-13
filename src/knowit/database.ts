export interface Book {
    title: string,
    ISBN: number,
    price: number,
    quantity: number
}
export const initialBooks: Book[] = [
    {
        title: 'God bok 1',
        ISBN: 1234567,
        price: 199,
        quantity: 500
    },
    {
        title: 'God bok 2',
        ISBN: 1234568,
        price: 299,
        quantity: 432
    },
    {
        title: 'God bok 3',
        ISBN: 1234563,
        price: 249,
        quantity: 235
    },
    {
        title: 'God bok 4',
        ISBN: 1234577,
        price: 149,
        quantity: 45
    },
    {
        title: 'God bok 5',
        ISBN: 1234578,
        price: 99,
        quantity: 89
    }
]