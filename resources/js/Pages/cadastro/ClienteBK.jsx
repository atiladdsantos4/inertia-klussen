import { React,useEffect } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton, CTable,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell,
    CTableHead,CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,CPagination,CPaginationItem,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,
  CBadge} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson, faSave, faTrash, faEdit, faList } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput,IMaskMixin } from 'react-imask';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import AOS from 'aos';
import CabecalhoCadastro from '../componentes/CabecalhoCadastro';

// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const Cadastro = (props) => {

    return(
        <section id="section-cliente" style={{marginTop:'180px'}} class="container py-4 py-md-5">

        <CabecalhoCadastro
           titulo="Cadastro de clientes"
           texto="Registre os dados do cliente e os detalhes do serviço."
        />

        <form id="form-cliente" class="form-card p-3 p-md-4">

            {/* <!-- DADOS PESSOAIS --> */}
            <section class="mb-4">

                <h2 class="section-title">
                    <div style={{overflow:'auto'}}>
                        <div style={{float:'left'}} class="circle text-orange">01</div>
                        <div style={{marginTop:'4px',paddingLeft:'4px',float:'left'}}>Dados do cliente</div>
                    </div>
                </h2>

                <div class="row g-3">

                    <div class="col-12 col-md-6">
                        <label for="nome" class="form-label">
                            Nome completo *
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="nome"
                            name="nome"
                            placeholder="Digite o nome completo"
                            autocomplete="name"
                            required/>
                    </div>

                    <div class="col-12 col-md-6">
                        <label for="email" class="form-label">
                            E-mail *
                        </label>
                        <input
                            type="email"
                            class="form-control"
                            id="email"
                            name="email"
                            placeholder="nome@email.nl"
                            autocomplete="email"
                            required/>
                    </div>

                    <div class="col-12 col-md-6">
                        <label for="telefone" class="form-label">
                            Telefone
                        </label>
                        <input
                            type="tel"
                            class="form-control"
                            id="telefone"
                            name="telefone"
                            placeholder="+31 ..."
                            autocomplete="tel"/>
                    </div>

                    <div class="col-12 col-md-6">
                        <label for="tipoCliente" class="form-label">
                            Tipo de cliente *
                        </label>
                        <select
                            class="form-select"
                            id="tipoCliente"
                            name="tipoCliente"
                            required>
                            <option value="">Selecione...</option>
                            <option value="particular">Particular</option>
                            <option value="empresa">Empresa</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>

                </div>
            </section>

            {/* <!-- SERVIÇO --> */}
            <section class="mb-4">
                <h2 class="section-title">
                   <div style={{overflow:'auto'}}>
                        <div style={{float:'left'}} class="circle text-orange">02</div>
                        <div style={{marginTop:'4px',paddingLeft:'4px',float:'left'}}>Detalhes do serviço</div>
                    </div>
                </h2>

                <div class="row g-3">

                    <div class="col-12 col-md-6">
                        <label for="servico" class="form-label">
                            Serviço solicitado *
                        </label>
                        <select
                            class="form-select"
                            id="servico"
                            name="servico"
                            required>
                            <option value="">Selecione o serviço...</option>
                            <option value="reforma">Reformas</option>
                            <option value="pintura">Pintura</option>
                            <option value="montagem">Montagem</option>
                            <option value="manutencao">Manutenção</option>
                            <option value="outro">Outros serviços</option>
                        </select>
                    </div>

                    <div class="col-12 col-md-6">
                        <label for="endereco" class="form-label">
                            Endereço do serviço
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="endereco"
                            name="endereco"
                            placeholder="Rua, número e cidade"
                            autocomplete="street-address"/>
                    </div>

                    <div class="col-12">
                        <label class="form-label d-block">
                            Tipo de atendimento *
                        </label>

                        <div class="d-flex flex-wrap gap-4">
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name="atendimento"
                                    id="residencial"
                                    value="residencial"
                                    required />
                                <label class="form-check-label"
                                       for="residencial">
                                    Residencial
                                </label>
                            </div>

                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name="atendimento"
                                    id="comercial"
                                    value="comercial"/>
                                <label class="form-check-label"
                                       for="comercial">
                                    Comercial
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="col-12">
                        <label for="descricao" class="form-label">
                            Descrição do serviço
                        </label>
                        <textarea
                            class="form-control"
                            id="descricao"
                            name="descricao"
                            rows="4"
                            placeholder="Descreva o serviço solicitado..."></textarea>
                    </div>

                </div>
            </section>

            {/* <!-- AUTORIZAÇÃO --> */}
            <section class="mb-4">
                <h2 class="section-title">
                    <div style={{overflow:'auto'}}>
                        <div style={{float:'left'}} class="circle text-orange">03</div>
                        <div style={{marginTop:'4px',paddingLeft:'4px',float:'left'}}>Confirmação</div>
                    </div>
                </h2>

                <div class="form-check">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="autorizaContato"
                        name="autorizaContato"
                        value="sim"/>
                    <label class="form-check-label"
                           for="autorizaContato">
                        Autorizo o contato sobre este cadastro.
                    </label>
                </div>
            </section>

            {/* <!-- AÇÕES --> */}
            <div class="form-actions d-flex flex-column
                        flex-sm-row justify-content-end gap-2">

                <button
                    type="submit"
                    class="btn btn-brand px-4 py-2">
                    Save
                </button>

                <a
                    href="listagem.html"
                    class="btn btn-list px-4 py-2">
                    List
                </a>

            </div>

            <p class="small text-secondary mt-3 mb-0">
                * Campos obrigatórios.
            </p>

        </form>
    </section>
    )
}

export default Cadastro
