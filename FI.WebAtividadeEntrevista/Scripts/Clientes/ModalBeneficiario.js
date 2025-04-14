function ModalDialogBeneficiarios(beneficiarios, open) {
    $('body').append(criarModalHtml());

    preencherTabelaBeneficiarios(beneficiarios);

    if (open) {
        $('#modal-beneficiarios').modal({
            backdrop: 'static',
            keyboard: false
        });
    }
}

function criarModalHtml() {
    return `
        <div id="modal-beneficiarios" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">Cadastro Beneficiário</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <input type="hidden" id="IdBeneficiario">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="Nome">Nome:</label>
                                    <input required type="text" class="form-control" id="NomeBeneficiario" name="Nome" placeholder="Ex.: João" maxlength="50">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="CPF">CPF:</label>
                                    <input required type="text" class="form-control" id="CPFBeneficiario" name="CPF" placeholder="Ex.: 333.333.333-33" maxlength="14" oninput="formatarCPFInput(this)">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <button id="add-row" type="button" class="btn btn-sm btn-success" style="margin-top: 24px;">Incluir</button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <table id="grid" class="table table-lg">
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>CPF</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function preencherTabelaBeneficiarios(beneficiarios) {
    if (!Array.isArray(beneficiarios)) return;

    beneficiarios.forEach((beneficiario, index) => {
        AddRowGrid(beneficiario.Nome, beneficiario.CPF.NumeroCPF, index, beneficiario.Id);
    });
}

function AddRowGrid(nome, cpf, index, id = -1) {
    const $table = $('#grid');

    if (index === undefined) {
        index = $table.find('tbody tr').length;
    }

    const $newRow = $(`
        <tr>
            <td>
                <input type="hidden" name="Beneficiarios[${index}].Nome" value="${nome}">${nome}
            </td>
            <td>
                <input type="hidden" name="Beneficiarios[${index}].CPF" value="${cpf}">${formatarCPF(cpf)}
            </td>
            <td>
                <button class="atualizar-row btn btn-primary" style="margin-right: 0;">Alterar</button>
                <button class="remove-row btn btn-primary">Excluir</button>
            </td>
            <td>
                <input type="hidden" name="Beneficiarios[${index}].Id" value="${id}">
            </td>
        </tr>
    `);

    $table.find('tbody').append($newRow);
}

function reorganizarIndices() {
    $('#grid tbody tr').each((i, row) => {
        $(row).find('input').each((_, input) => {
            const $input = $(input);
            const newName = $input.attr('name').replace(/\[\d+\]/, `[${i}]`);
            $input.attr('name', newName);
        });
    });
}

function validarCPFExistente(cpf) {
    const cpfCliente = limparCPF($('#CPF').val());
    const cleanCPF = limparCPF(cpf);

    if (!cpfCliente) {
        ModalDialog("Erro", "Digite o CPF do cliente na tela principal antes de cadastrar um beneficiário!");
        return true;
    }

    if (cleanCPF === cpfCliente) {
        ModalDialog("Erro", "Um beneficiário não pode ter o mesmo CPF do cliente.");
        return true;
    }

    let cpfExistente = false;
    $('#grid tbody tr').each(function () {
        const cpfTabela = limparCPF($(this).find('input[name*="CPF"]').val());
        if (cpfTabela === cleanCPF) {
            ModalDialog("Erro", "Este CPF já foi cadastrado.");
            cpfExistente = true;
            return false;
        }
    });

    return cpfExistente;
}

