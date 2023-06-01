export class ClientInformation {

    order = {
        active: false,
        date: '',
        total: 0,
        food: {
            entrees: {type: '', price: 0},
            chicken: {type: '', price: 0},
            lamb: {type: '', price: 0},
            beef: {type: '', price: 0},
            seafood: {type: '', price: 0},
            vegetarian: {type: '', price: 0},
            tandooriBread: {type: '', price: 0},
            rice: {type: '', price: 0},
            sides: {type: '', price: 0}
        }
    };

    constructor(name, phone, password) {
        this.name = name;
        this.phone = phone;
        this.password = password;
    }

    // Getters
    get getName() {
        return this.name;
    }

    get getPhone() {
        return this.phone;
    }

    get getPassword() {
        return this.password;
    }

    // Setters
    set setName(name) {
        this.name = name;
    }

    set setPhone(phone) {
        this.phone = phone;
    }

    set setPassword(password) {
        this.password = password;
    }

}