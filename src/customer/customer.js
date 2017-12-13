class Customer extends Polymer.Element {

    constructor() {
        super();
        this.getCustomers()
            .then(customers => {
                this.greetings = "Hello, it seems to work!!!";
                for (const customer of customers) {
                    this.greetings += `, ${customer.name}`;
                }
            });
    }

    static get properties() {
        return {
            message: {
                type: String,
                value: '--not set--'
            }
        };
    }

    static get is() {
        return 'adesso-customer';
    }

    getCustomers() {
        return this.loadEnvironment()
            .then(environment => {
                return new Promise((resolve, reject) => {
                    let request = new XMLHttpRequest();
                    request.open('GET', `http://${environment.host}:${environment.rest_port}/application/resources/customers`, true);
                    request.setRequestHeader('Accept', 'application/json');
                    request.onreadystatechange = () => {
                        let raw = request.responseText;
                        console.log("raw: " + raw);
                        let json = JSON.parse(raw);
                        resolve(json);
                    };
                    request.send();
                });
            });
    }

    createCustomer(customer) {
        return this.loadEnvironment()
            .then(environment => {
                return new Promise((resolve, reject) => {
                    let request = new XMLHttpRequest();
                    request.open('POST', `http://${environment.host}:${environment.rest_port}/application/resources/customers`, true);
                    request.setRequestHeader('Accept', 'application/json');
                    request.setRequestHeader('Content-type', 'application/json');
                    request.onreadystatechange = () => {
                        let raw = request.responseText;
                        console.log("raw: " + raw);
                        let json = JSON.parse(raw);
                        console.log(`jsoN: ${json}`);
                        resolve(json);
                    };
                    request.send(customer);
                });
            });
    }

    loadEnvironment() {
        let result = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', 'environment/variables.json');
            request.onreadystatechange = () => {
                let raw = request.responseText;
                let json = JSON.parse(raw);
                resolve(json);
            };
            request.send();
        });

        return result;
    }

    clickCustomer() {
        this.createCustomer(JSON.stringify({name: this.customername})).then(customer => {
            console.log("customer: " + customer);
        });
        console.log(`customername: ${this.customername}`);
    }

}

window.customElements.define(Customer.is, Customer);