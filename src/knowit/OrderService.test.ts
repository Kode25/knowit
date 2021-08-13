import { Book, initialBooks } from "./database"
import { BookOrder, DayOfWeek, OrderResponse, OrderService, SoldByWeekDay } from "./OrderService"



describe('Unit testing OrderSerice', () => {
    const order1: BookOrder = { iSBN: 1234567, pricePerUnit: 199, quantity: 50, orderDay: DayOfWeek.Monday }
    const order2: BookOrder = { iSBN: 1234568, pricePerUnit: 299, quantity: 50, orderDay: DayOfWeek.Monday }
    const unSuccessfullOrder: BookOrder = { iSBN: 1234567, pricePerUnit: 199, quantity: 451, orderDay: DayOfWeek.Monday }
    const order3: BookOrder = { iSBN: 1234567, pricePerUnit: 199, quantity: 50, orderDay: DayOfWeek.Tuesday }



    test('Ordering book success', () => {
        const orderService = new OrderService(initialBooks)
        const bookOrder: BookOrder[] = [order1, order2]
        const expected: OrderResponse = {
            successfullOrder: [order1, order2],
            unSuccessfullOrder: [],
            sumOrderCost: 24900
        }
        const actual = orderService.orderBook(bookOrder);
        expect(actual).toEqual(expected)
    })

    test('Ordering book too high quantity', () => {
        const orderService = new OrderService(initialBooks)
        const bookOrder: BookOrder[] = [order1, order2, order3, unSuccessfullOrder]
        const expected: OrderResponse = {
            successfullOrder: [order1, order2, order3],
            unSuccessfullOrder: [unSuccessfullOrder],
            sumOrderCost: 34850
        }
        const actual = orderService.orderBook(bookOrder);
        expect(actual).toEqual(expected)
    })

    test('most Sold Day', () => {
        const orderService = new OrderService(initialBooks)
        const bookOrder: BookOrder[] = [order1, order2, order3]
        orderService.orderBook(bookOrder);

        const expected: SoldByWeekDay[] = [
            { day: DayOfWeek.Monday, quanitySold: 100, highest: true },
            { day: DayOfWeek.Tuesday, quanitySold: 50 },
            { day: DayOfWeek.Wednesday, quanitySold: 0 },
            { day: DayOfWeek.Thursdag, quanitySold: 0 },
            { day: DayOfWeek.Friday, quanitySold: 0 },
            { day: DayOfWeek.Saturday, quanitySold: 0 },
            { day: DayOfWeek.Sunday, quanitySold: 0 }
        ]

        const actual = orderService.mostSoldDays()

        expect(actual).toEqual(expected)
    })

    test('Add new Book', () => {
        const orderService = new OrderService(initialBooks)
        const newBook: Book = {
            title: 'God bok nr 6',
            ISBN: 555555,
            price: 50,
            quantity: 1000
        }
        orderService.addNewBook(newBook);
        expect(orderService.books).toContain(newBook);
    })

    test('Update book quantity', () => {
        const orderService = new OrderService(initialBooks)
        const ISBN_to_Update = 1234578;
        const quantityToAdd = 500;
        orderService.updateBookQuantity(ISBN_to_Update, quantityToAdd);
        const expectedQuantity = 589;
        const actualQuanity = orderService.books.find(book => book.ISBN === ISBN_to_Update)!.quantity
        expect(actualQuanity).toEqual(expectedQuantity);
    })



})
