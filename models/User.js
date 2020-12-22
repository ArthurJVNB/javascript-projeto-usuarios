class User {

    constructor(name, gender, birth, country, email, password, photo, admin) {
        
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

    static create(json) {
        // TODO: PEGAR O JSON, TRANSFORMAR EM USER. DAÍ LÁ NO USERCONTROLLER CHAMO ISSO, PEGO O USER CRIADO E PROCURO
        // PELOS CAMPOS LÁ NO UPDATE DE USUÁRIOS.
        // OBS: Aqui ainda não está feito o código correto.
        for (let name in json) {
            
            let formatedName = name.replace('_', '');
            let field = this.formUpdateEl.querySelector('[name="' + formatedName + '"]');
            
            if (field) {
                if (field.type == 'file') continue; // Pula essa iteração, ignorando todas as linhas abaixo e
                                                    // passa pra próxima iteração desse for in.

                field.value = userJson[name];
            }
            
        }
    }

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