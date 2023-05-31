export class ClientInformation {

    order = {
        active: false,
        numberOrder: 0,
        food: {
            entree:'',
            chicken: '',
            lamb: '',
            beef: '',
            seafood: '',
            vegetarian: '',
            tandoori: '',
            rice: '',
            sides: ''
        }
    };

    storeOrders = [];

    booking = {
        active: false,
        numberBooking: 0,
        details: {
            name: '',
            phone: '',
            email: '',
            date: '',
            time: '',
            people: '',
            message: ''
        }
    };

    storeBookings = [];

    constructor(name, password) {
        this.name = name;
        this.password = password;
    }

    // Getters
    get getName() {
        return this.name;
    }

    get getPassword() {
        return this.password;
    }

    get getOrders() {
        return this.storeOrders;
    }

    get getBookings() {
        return this.storeBookings;
    }

    // Setters
    set setName(name) {
        this.name = name;
    }

    set setPassword(password) {
        this.password = password;
    }

    set setOrders(order) {
        this.storeOrders.push(order);
    }

    set setBookings(booking) {
        this.storeBookings.push(booking);
    }

    // Methods
    addOrder(order) {
        this.order = order;
        this.setOrders = this.order;
    }

    addBooking(booking) {
        this.booking = booking;
        this.setBookings = this.booking;
    }

}