let user = {};
let fields = document.querySelectorAll('#form-user-create [name]');



document.querySelector('#form-user-create').addEventListener('submit', event => {
    event.preventDefault();

    fields.forEach((field, index) => {
    
        if (field.name == 'gender') {

            if (field.checked) user[field.name] = field.value;
            
        } else {
            
            user[field.name] = field.value;
    
        }
        
    });

    console.log(user);
})

//#region Formas diferentes de selecionar um elemento no documento HTML
    /** 
     * let name = document.querySelector('#exampleInputName');
     * let gender = document.querySelectorAll('#form-user-create [name=gender]:checked');
     * let birthday = document.querySelector('#exampleInputBirth');
     * let country = document.querySelector('#exampleInputCountry');
     * let email = document.querySelector('#exampleInputEmail');
     * let password = document.querySelector('#exampleInputPassword');
     * let file = document.querySelector('#exampleInputFile');
     * let admin = document.querySelector('[name=admin]');
     */
    //#endregion