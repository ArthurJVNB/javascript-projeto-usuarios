class User {
    static _freeId = -1;

    constructor(name, gender, birth, country, email, password, photo, admin) {
        
        this._id = -1;
        this._name = name;
        this._gender = gender
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();

    }

    static loadFromJSON(json) {
        let user = new User();
        for (let data in json) {
            switch (data) {
                case '_register':
                    user[data] = new Date(json[data]);
                break;
                default:
                    user[data] = json[data];
            }
        }

        return user;
    }

    // static getUsersFromSessionStorage() {
    //     let users = [];

    //     if (sessionStorage.getItem('users')) {
    //         users = JSON.parse(sessionStorage.getItem('users'));
    //     }

    //     return users;
    // }

    static getUsers() {
        let users = [];

        if (localStorage.getItem('users')) {
            users = JSON.parse(localStorage.getItem('users'));
            users = users.map(user => {
                return User.loadFromJSON(user);
            }); // modifica cada elemento, retornando o elemento novo. O resultado disso é um novo array,
                // então por conta disso eu atribuo esse novo array ao array antigo.

            /*
            users.forEach(user => {
                // console.log('before', user); // Objeto genérico
                user = User.loadFromJSON(user);
                // console.log('after', user); // Objeto do tipo User
            });
            */
        }

        return users;
    }

    static getNewId() {
        if (User._freeId < 0) {
            // Aqui só entra se a página foi dada um refresh (perdendo o valor atualizado), ou se é a primeira vez que tá começando mesmo.
            const users = User.getUsers();

            User._freeId = users[users.length - 1].id; // se der refresh pelo menos ele estará com a contagem atualizada
        }
        return ++User._freeId;
    }

    save() {
        // let users = this.getUsersFromSessionStorage();
        let users = User.getUsers();
        if (this.id < 0) {
            // NOVO USER
            
            this._id = User.getNewId(); // cria o id na hora de salvar, caso já não o possua
            console.log('new user com id:', this.id);
            users.push(this);

        } else {
            // ATUALIZANDO USER EXISTENTE
            console.log('updating user', this);
            users = users.map(user => {
                if (user.id === this.id) {
                    user = this;
                }
                return user;
            });

            // Obs: isso continuará checando todos usuários, mas por enquanto tudo bem.
        }

        // sessionStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('users', JSON.stringify(users));
    }

    delete() {
        let users = User.getUsers();
        console.log(users);
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (user.id == this.id) {
                users.splice(i, 1);
                break;
            }
        }
        localStorage.setItem('users', JSON.stringify(users));
    }

    get id() { return this._id; }
    get name() { return this._name; }
    get gender() { return this._gender; }
    get birth() { return this._birth; }
    get country() { return this._country; }
    get email() { return this._email; }
    get password() { return this._password; }
    get photo() { return this._photo; }
    get admin() { return this._admin; }
    get register() { return this._register; }

    set name(value) { this._name = value; }
    set gender(value) { this._gender = value; }
    set birth(value) { this._birth = value; }
    set country(value) { this._country = value; }
    set email(value) { this._email = value; }
    set password(value) { this._password = value; }
    set photo(value) { this._photo = value; }
    set admin(value) { this._admin = value; }
}