class UserController {

    constructor(formCreateId, formUpdateId, tableId) {

        this.formCreateEl = document.getElementById(formCreateId);
        this.formUpdateEl = document.getElementById(formUpdateId);
        this.tableEl = document.getElementById(tableId);
        this.numberUsersEl = document.querySelector("#number-users");
        this.numberUsersAdminsEl = document.querySelector("#number-users-admin");
        this.boxCreateEl = document.querySelector("#box-user-create");
        this.boxUpdateEl = document.querySelector("#box-user-update");

        this.onSubmit();
        this.onCancelUpdate();

    }

    onSubmit() {

        /*
        let _this = this; // Está referenciando a própria instância dessa classe, pois o 'this' referienciará aqui abaixo à outra função,
                          // no 'addEventListener', dentro do escopo que recebe o evento chamado 'event'.

        this.formElement.addEventListener('submit', function(event) {
            
            event.preventDefault();
        
            _this.getValues(); // O 'this' muda de escopo de acordo com a função, e a função mais próxima aqui é a que recebe o 'event'.
                               // Por conta dessa mudança de referência do 'this', precisamos antes pegar a referência da própria
                               // instância dessa classe colocando o 'this' antes numa outra variável, que dessa vez escolhemos chamar
                               // de '_this'.
        
        });
        */

        // USANDO O ARROW FUNCTION, O 'this' NÃO MUDA DE REFERÊNCIA, NÃO HAVENDO ASSIM CONFLITO NO 'this'.
        this.formCreateEl.addEventListener('submit', event => {

            event.preventDefault();

            let btnSubmit = this.formCreateEl.querySelector('[type=submit]');
            btnSubmit.disabled = true;
            
            let values = this.getValues();

            if (!values) {
                // Retorna se falhar a pegada de valores
                btnSubmit.disabled = false;
                return false;
            }
            
            // Aqui é a forma do getPhoto esperando um Promise
            this.getPhoto().then(
                (photo) => {
                    values.photo = photo;
                    this.formCreateEl.reset();
                    this.addLine(values);
                    btnSubmit.disabled = false;
                },
                (error) => {
                    console.error(error);
                }
            );

            // Aqui é a forma do getPhoto esperando um callback
            // this.getPhotoCallback((content) => {

            //     values.photo = content;
            //     this.addLine(values);

            // });

        });

    } // END METHOD onSubmit

    onCancelUpdate() {
        document.querySelector('#box-user-update .btn-cancel').addEventListener('click', e => {
            this.showCreatePanel();
        });
    }

    getPhoto() {

        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();

            let elements = [...this.formCreateEl.elements].filter(element => {
                if (element.name === 'photo') {
                    return element;
                }
            });

            let file = elements[0].files[0];

            if (file) {
                // Só fará a leitura do arquivo de foto se de fato o usuário enviou alguma foto.
                fileReader.readAsDataURL(file);
            } else {
                // É porque não foi feito upload da imagem, então pegamos uma padrão dessa pasta do projeto.
                resolve('dist/img/boxed-bg.jpg'); 
            }

            
            fileReader.onload = () => { // Quando terminar de ler o arquivo, será chamado o 'onload'.
                                        // Esse 'onload' pode ser escrito antes do próprio 'readAsDataURL'.
                                        // Ele de toda forma apenas será chamado depois, quando terminar a operação
                                        // de conversão da imagem para base64. Esse formato pode ser colocado como source
                                        // da tag 'image' do html (é só ver onde foi colocado lá em baixo, no 'addLine',
                                        // pra lembrar como ficou).
                resolve(fileReader.result);
            };
    
            fileReader.onerror = (e) => {
                reject(e);
            };

        });

    } // END METHOD getPhoto USING Promise

    // VERSÃO getPhoto USANDO callback
    getPhotoCallback(callback) {
        let elements = [...this.formCreateEl.elements].filter(element => {
            if (element.name === 'photo') {
                return element;
            }
        });

        let file = elements[0].files[0];

        let fileReader = new FileReader();

        fileReader.readAsDataURL(file);

        fileReader.onload = () => { // Quando terminar de ler o arquivo, será chamado o 'onload'.
                                    // Esse 'onload' pode ser escrito antes do próprio 'readAsDataURL'.
                                    // Ele apenas será chamado depois de toda forma, quando terminar a operação
                                    // de conversão da imagem para base64. Esse formato pode ser colocado como source
                                    // da tag 'image' do html (é só ver onde foi colocado lá em baixo, no 'addLine',
                                    // pra lembrar como ficou).
            if (typeof callback == 'function') callback(fileReader.result);

        }; // END METHOD getPhoto USING callback

        fileReader.onerror = () => {
            // TODO DEVOLVER ERRO
        }
    }

    getValues() {

        let user = {};
        let isValid = true;

        [...this.formCreateEl.elements].forEach((field, index) => {
    
            if (['name', 'email', 'password'].indexOf(field.name) !== -1 && !field.value) {
                // Ou seja, a pergunta é: o field que estou pegando agora é um desses três e ele está vazio?
                field.parentElement.classList.add('has-error');
                isValid = false;
            }

            if (field.name == 'gender') {
    
                if (field.checked) user[field.name] = field.value;
                
            } else if (field.name == 'admin') {

                user[field.name] = field.checked;

            } else {
                
                user[field.name] = field.value;
        
            }
            
        });

        if (!isValid) {
            return false;
        } else {
            // Deixa visualmente normal qualquer campo que esteja vermelho (que está indicando erro)
            this.clearFormFieldsError();
        }

        return new User(
            user.name, 
            user.gender, 
            user.birth, 
            user.country, 
            user.email, 
            user.password, 
            user.photo, 
            user.admin
            );

    } // END METHOD getValues

    addLine(userData) {

        // Se for sem ser concatenando do jeito que está na parte inferior desse método, deve então ser criando e adicionando
        // um elemento HTML assim:
        let tr = document.createElement('tr');
        tr.dataset.user = JSON.stringify(userData);

        tr.innerHTML = 
            `<td><img src="${userData.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${userData.name}</td>
            <td>${userData.email}</td>
            <td>${userData.admin ? 'Sim' : 'Não'}</td>
            <td>${Utils.dateFormat(userData.register)}</td>
            <td>
            <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>`;
        
        tr.querySelector('.btn-edit').addEventListener('click', e => {
            
            this.enterUpdateForm(JSON.parse(tr.dataset.user));

        });

        this.tableEl.appendChild(tr);

        this.updateCount();

        // this.tableEl.innerHTML += // += FARÁ TODA A DIFERENÇA kkkkk (ele tava substituindo tudo que tinha na tabela, ao invés de concatenar)
        //     `<tr>
        //         <td><img src="${userData.photo}" alt="User Image" class="img-circle img-sm"></td>
        //         <td>${userData.name}</td>
        //         <td>${userData.email}</td>
        //         <td>${userData.admin ? 'Sim' : 'Não'}</td>
        //         <td>${Utils.dateFormat(userData.register)}</td>
        //         <td>
        //         <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
        //         <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        //         </td>
        //     </tr>`; // 'tr' significa 'table row'
    
    } // END METHOD addLine

    updateCount() {
        // Agora vamos atualizar quantos usuários e admins temos na tabela pra colocar no painel
        let numberUsers = 0;
        let numberAdmins = 0;

        [...this.tableEl.children].forEach(row => {

            numberUsers++;

            let user = JSON.parse(row.dataset.user);
            if (user._admin) numberAdmins++;

        });

        this.numberUsersEl.innerHTML = numberUsers;
        this.numberUsersAdminsEl.innerHTML = numberAdmins;
    }

    clearFormFieldsError() {
        let hasErrorClasses = this.formCreateEl.querySelectorAll('.has-error');

        if (hasErrorClasses.length > 0) {
            hasErrorClasses.forEach(element => {
                element.classList.remove('has-error');
            })
        }
    }

    showCreatePanel() {
        this.boxCreateEl.style.display = 'block';
        this.boxUpdateEl.style.display = 'none';
    }

    showUpdatePanel() {
        this.boxCreateEl.style.display = 'none';
        this.boxUpdateEl.style.display = 'block';
    }

    enterUpdateForm(userJson) {
        
        for (let name in userJson) {
            
            let formatedName = name.replace('_', '');
            let field = this.formUpdateEl.querySelector('[name="' + formatedName + '"]');
            
            if (field) {
                if (field.type == 'file') continue; // Pula essa iteração, ignorando todas as linhas abaixo e
                                                    // passa pra próxima iteração desse for in.

                field.value = userJson[name];
            }
            
        }
        
        this.showUpdatePanel();
    }

} // END CLASS UserController