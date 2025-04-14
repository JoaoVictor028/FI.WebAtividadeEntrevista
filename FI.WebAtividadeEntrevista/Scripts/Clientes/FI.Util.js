// Formata o CPF durante a digitação
function formatarCPFInput(input) {
    const cpfNumeros = input.value.replace(/\D/g, '');
    input.value = formatarCPFParcial(cpfNumeros);
}

function formatarCPFParcial(cpf) {
    if (cpf.length <= 3) return cpf;
    if (cpf.length <= 6) return cpf.replace(/(\d{3})(\d+)/, '$1.$2');
    if (cpf.length <= 9) return cpf.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
}

function formatarCPF(cpf) {
    const cpfNumeros = cpf.replace(/\D/g, '');

    if (cpfNumeros.length !== 11) {
        throw new Error('CPF deve conter exatamente 11 dígitos');
    }

    return cpfNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
function limparCPF(cpf) {
    return cpf.replace(/\D/g, '');
}

function ModalDialog(titulo, mensagem) {
    const idModal = `modal-${Date.now()}`;
    const mensagemHTML = mensagem.replace(/\n/g, '<br>');

    const modalHTML = `
        <div id="${idModal}" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">${titulo}</h4>
                    </div>
                    <div class="modal-body">
                        <p>${mensagemHTML}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    $('body').append(modalHTML);
    $(`#${idModal}`).modal('show');
}
