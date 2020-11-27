let user = {};
let fields = document.querySelectorAll('#form-user-create [name]');

function addLine(userData) {
    console.log(userData);
    document.querySelector('#table-users').innerHTML = 
    `<tr>
        <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
        <td>${userData.name}</td>
        <td>${userData.email}</td>
        <td>${userData.admin}</td>
        <td>${userData.birth}</td>
        <td>
        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
    </tr>`; // 'tr' significa 'table row'

}

document.querySelector('#form-user-create').addEventListener('submit', event => {
    event.preventDefault();

    fields.forEach((field, index) => {
    
        if (field.name == 'gender') {

            if (field.checked) user[field.name] = field.value;
            
        } else {
            
            user[field.name] = field.value;
    
        }
        
    });

    let userData = new User(user.name, user.gender, user.birth, user.country, user.email, user.password, user.photo, user.admin);

    addLine(userData);
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