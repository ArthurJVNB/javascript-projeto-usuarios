class User {
    static _freeId = 0;

    constructor(name, gender, birth, country, email, password, photo, admin) {
        
        this._id;
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
            });
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
        return ++User._freeId;
    }

    save() {
        // let users = this.getUsersFromSessionStorage();
        let users = User.getUsers();

        if (!this.id) {
            // NOVO USER

            this._id = User.getNewId(); // cria o id na hora de salvar, caso já não o possua
            users.push(this);

        } else {
            // ATUALIZANDO USER EXISTENTE
            
            users.map(user => {
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
            console.log(user.id);
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