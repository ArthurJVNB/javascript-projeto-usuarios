class UserController {

    constructor(formId, tableId) {

        this.formElement = document.getElementById(formId);
        this.tableElement = document.getElementById(tableId);

        this.onSubmit();

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
        this.formElement.addEventListener('submit', event => {

            event.preventDefault();

            let values = this.getValues();
            
            this.getPhoto((content) => {

                values.photo = content;
                this.addLine(values);

            });

        });

    } // END FUNCTION onSubmit

    getPhoto(callback) {

        
        let elements = [...this.formElement.elements].filter(element => {
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
            callback(fileReader.result);

        };

    } // END FUNCTION getPhoto

    getValues() {

        let user = {};

        [...this.formElement.elements].forEach((field, index) => {
    
            if (field.name == 'gender') {
    
                if (field.checked) user[field.name] = field.value;
                
            } else {
                
                user[field.name] = field.value;
        
            }
            
        });

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

    } // END FUNCTION getValues

    addLine(userData) {
        console.log(userData);
        this.tableElement.innerHTML += // += FARÁ TODA A DIFERENÇA kkkkk (ele tava substituindo tudo que tinha na tabela, ao invés de concatenar)
        `<tr>
            <td><img src="${userData.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${userData.name}</td>
            <td>${userData.email}</td>
            <td>${userData.admin}</td>
            <td>${userData.birth}</td>
            <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr>`; // 'tr' significa 'table row'
    
    } // END FUNCTION addLine

} // END CLASS UserController