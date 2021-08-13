import { Book } from "./database";

export interface BookOrder {
    iSBN: number,
    quantity: number,
    pricePerUnit: number,
    orderDay: DayOfWeek
}

export interface OrderResponse {
    successfullOrder: BookOrder[],
    unSuccessfullOrder: BookOrder[],
    sumOrderCost: number
}

export interface SoldByWeekDay {
    day: DayOfWeek,
    quanitySold: number,
    highest?: boolean
}

export enum DayOfWeek {
    Monday = 'Monday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Thursdag = 'Tursday',
    Friday = 'Friday',
    Saturday = 'Saturday',
    Sunday = 'Sunday'
}

export class OrderService {
    books: Book[] = []
    orderHistory: BookOrder[] = []
    constructor(initialBooks: Book[]) {
        this.books = initialBooks;
    }
    //oppgave 1
    orderBook(orders: BookOrder[]): OrderResponse {
        let orderResponse: OrderResponse = {
            successfullOrder: [],
            unSuccessfullOrder: [],
            sumOrderCost: 0
        }
        orders.forEach((order) => {
            const approvedOrder = this.approveSingleOrder(order);
            // hvis ordre ikke er godkjent, gjennomføres ikke ordre
            if (!approvedOrder) {
                orderResponse.unSuccessfullOrder.push(order)
                return;
            }
            if (approvedOrder) {
                orderResponse.successfullOrder.push(order)
                orderResponse.sumOrderCost += order.pricePerUnit * order.quantity;
                //Fjerner ordre bestilling fra lager av bøker
                this.books.find(book => book.ISBN === order.iSBN).quantity -= order.quantity;
                //Tilføyer ordre til historikk
                this.orderHistory.push(order)
            }
        })
        return orderResponse;
    }
    //oppgave 2
    mostSoldDays(): SoldByWeekDay[] {
        let soldByDay: SoldByWeekDay[] = [
            { day: DayOfWeek.Monday, quanitySold: 0 },
            { day: DayOfWeek.Tuesday, quanitySold: 0 },
            { day: DayOfWeek.Wednesday, quanitySold: 0 },
            { day: DayOfWeek.Thursdag, quanitySold: 0 },
            { day: DayOfWeek.Friday, quanitySold: 0 },
            { day: DayOfWeek.Saturday, quanitySold: 0 },
            { day: DayOfWeek.Sunday, quanitySold: 0 }
        ]
        this.orderHistory.forEach((order) => {
            const index = soldByDay.findIndex(days => order.orderDay === days.day)
            soldByDay[index].quanitySold += order.quantity
        })
        let mostSoldDay: SoldByWeekDay = { day: DayOfWeek.Monday, quanitySold: 0 }
        soldByDay.forEach((day) => {
            if (day.quanitySold > mostSoldDay.quanitySold) {
                mostSoldDay = day;
            }
        })
        const index = soldByDay.findIndex(day => day.day === mostSoldDay.day)
        soldByDay[index].highest = true;
        return soldByDay
    }

    //oppgv 3
    addNewBook(newBook: Book) {
        this.books.push(newBook)
    }
    // oppgv 4
    updateBookQuantity(ISBN_to_Update: number, quantityToAdd: number) {
        this.books = this.books.map(book => {
            const isRightBook = book.ISBN === ISBN_to_Update;
            if (isRightBook) {
                book.quantity += quantityToAdd;
            }
            return book;
        })

    }

    //Hjelper metode
    private approveSingleOrder(order: BookOrder): boolean {
        const doesISBNExist = this.books.find(book => book.ISBN === order.iSBN) !== undefined;
        const isQuantityAvailable = this.books.find(book => book.quantity >= order.quantity) !== undefined;
        return (doesISBNExist && isQuantityAvailable)
    }
}

