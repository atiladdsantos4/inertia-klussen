import { React,useEffect,useState,useRef   } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton, CTable,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell,
    CTableHead,CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,CPagination,CPaginationItem,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,
  CBadge,
  CFormTextarea,
  CRow} from '@coreui/react'
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
const Agenda = (props) => {

  const { tela } = props
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  console.log(token)
  const [validated, setValidated] = useState(false)
  const [loadpage, setLoadpage] = useState(false)
  const [loadsave, setLoadsave] = useState(false)
  const [idagenda, setIdagenda] = useState(null)
  const [descricao, setDescricao] = useState('')
  const [cadastro, setCadastro] = useState('')
  const [profissional, setProfissional] = useState('')
  const [proposta, setProposta] = useState(null)
  const [dadosproposta, setDadosproposta] = useState({})
  const [listaproposta, setListaproposta] = useState([])
  const [listaprofissional, setListaprofissional] = useState([])
  const [saved,setSaved] = useState(false)
  const [toast, addToast] = useState()//toast
  const [param, setParam] = useState(props.param)//toast
  const toaster = useRef(null)
  const style_placeholder = {paddingBottom:'15px'}

  //dados prosposta
  const [cli, setCli] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataproposta, setDataproposta] = useState('');
  const [datavalidade, setDatavalidade] = useState('');
  const [listaservico, setListaservico] = useState([]);

  useEffect(()=>{
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
    });
    let data = formatDate(new Date());
    setCadastro(data)
    if( props.param != null){
        const fetchData = async () =>{
           try {
                setLoadpage(true)
                const requests = [
                    axios.get(`${endpoint}/servico/${param}`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                ]

                const responses = await Promise.all(requests);
                let result_tipocliente = responses[0]
                setIdagenda(result_tipocliente.data.data.ser_id_ser)
                setDescricao(result_tipocliente.data.data.ser_descricao)
                setLoadpage(false)
            }
            catch (error) {
                console.error("One of the requests failed", error);
            }
        }
        fetchData()
    } else {
        const fetchData = async () =>{
           try {
                setLoadpage(true)
                const requests = [
                    axios.get(`${endpoint}/profissional?listagem=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                    axios.get(`${endpoint}/proposta?listagem=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                ]

                const responses = await Promise.all(requests);
                let result_profissional = responses[0]
                let result_proposta = responses[1]
                let arr_pro = result_profissional.data.data
                arr_pro.unshift({pro_id_pro:'',pro_nome:'Selecione o Profissional'})
                setListaprofissional(arr_pro)
                let arr_prc = result_proposta.data.data
                //arr_prc.unshift({prc_id_prc:'',prc_cliente.cli_nome:'Selecione a Proposta'})
                setListaproposta(arr_prc)
                setLoadpage(false)
            }
            catch (error) {
                console.error("One of the requests failed", error);
            }
        }
        fetchData()
    }
  },[])

  const formatDate = (date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const yyyy = date.getFullYear();

        const hh = String(date.getHours()).padStart(2, '0');
        const mi = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');

        return `${d}/${m}/${yyyy} ${hh}:${mi}:${ss}`;
  };

  const formatDateBanco = (date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const yyyy = date.getFullYear();

        const hh = String(date.getHours()).padStart(2, '0');
        const mi = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');

        return `${yyyy}-${m}/${d} ${hh}:${mi}:${ss}`;
  };

  //--> Exibe o Toast
  const CompToast = (texto, color, autohide) => {
    return (
      <CToast
        style={{borderRadius:'5px',color:'white'}}
        id="idtoast"
        autohide={autohide}
        visible={false}
        color={color}
        delay="3000"
        className="text-white align-items-center"
      >
        <div className="d-flex">
          <CToastBody style={{color:'white'}}>{texto}</CToastBody>
          <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
    )
  }

  const handleSubmit = (event) => {
        console.log('submit')
        const form = event.currentTarget
        let erro = false
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
            erro = true
        }
        event.preventDefault()
        setValidated(true)
        if(erro == false){
           handleSave(erro)
           // let valor = CriaJsonItens()
           // console.log(valor)
        }
  }

  const  handleSave = (erro) =>{

    if( erro == false && idagenda == null) {
        setLoadsave(false)
        const formData = new FormData()
        formData.append('ser_descricao', descricao)
        axios
        .post(`${endpoint}/agenda`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            //setSaved(!saved)
            let valor = 'ListaAgenda'
            setLoadsave(false)
            addToast(CompToast('Dados Gravados com sucesso !!!', 'success')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                tela(valor)
            }, 2000)
        })
    } else {
        setLoadsave(false)
        const formData = new FormData()
        formData.append('ser_descricao', descricao)
        formData.append('_method', 'put')
        axios
         .post(`${endpoint}/agenda/${idagenda}`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setLoadsave(true)
            addToast(CompToast('Dados Atualizados com sucesso !!!', 'success')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                tela('ListaAgenda')
            }, 2000)
        })
    }
 }

 const handleClick = (event,valor) =>{
     event.preventDefault();
     tela(valor)
 }

 const CompProposta = () =>{
    return(
        listaproposta.map((item,index)=>{
          return(
              <option key={index} value={item.prc_id_prc}>{'Proposta Nº '+item.prc_id_prc+' - '+item.prc_cliente.cli_nome}</option>
          )
        })
    )
 }

 const CompProfissional = () =>{
    return(
        listaprofissional.map((item,index)=>{
            return(
                <option key={index} value={item.pro_id_pro}>{item.pro_nome}</option>
            )
        })
    )
 }

 useEffect(()=>{
    if(proposta != null){
        let dados = listaproposta.filter((item)=>item.prc_id_prc == proposta)[0];
        setDadosproposta(dados)
        setCli(dados.prc_cliente.cli_id_cli)
        setNome(dados.prc_cliente.cli_nome)
        setEmail(dados.prc_cliente.cli_email)
        setTelefone(dados.prc_cliente.cli_telefone)
        setDataproposta(dados.prc_data_proposta)
        setDatavalidade(dados.prc_data_validade)
        setListaservico(dados.prc_itens.meta)
        console.log(dados.prc_itens.meta)
    }
 },[proposta])

 const DadosProposta = (props) =>{
    return(
      <div class="row g-3">
            <CCol md={6}>
                { loadpage
                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                : (
                    <CFormInput
                        id="cli"
                        label="ID Cliente"
                        value={cli}
                        onChange={(e)=>setCli(e.target.value)}
                        required
                    />)}
            </CCol>

            <CCol md={6}>
                { loadpage
                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                : (
                    <CFormInput
                        id="nome"
                        label="Nome do Cliente"
                        value={nome}
                        onChange={(e)=>setNome(e.target.value)}
                        required
                    />)}
            </CCol>

            <CCol md={6}>
                { loadpage
                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                : (
                    <CFormInput
                        id="email"
                        label="E-mail"
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />)}
            </CCol>

            <CCol md={6}>
                { loadpage
                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                : (
                    <CFormInput
                        id="telefone"
                        label="Telefone"
                        value={telefone}
                        onChange={(e)=>setTelefone(e.target.value)}
                        required
                    />)}
            </CCol>

            <CCol md={6}>
                { loadpage
                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                : (
                    <CFormInput
                        id="dataproposta"
                        label="Data da Proposta"
                        value={dataproposta}
                        onChange={(e)=>setDataproposta(e.target.value)}
                        required
                    />)}
            </CCol>

            <CCol md={6}>
                { loadpage
                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                : (
                    <CFormInput
                        id="datavalidade"
                        label="Data de Validade"
                        value={datavalidade}
                        onChange={(e)=>setDatavalidade(e.target.value)}
                        required
                    />)}
            </CCol>
            <CRow className='mt-3'>
               <CCol md={12}>
                   <div className="d-flex justify-content-center align-items-center">
                    <CTable className='tabela'>
                        <CTableHead style={{fontSize:'11px !important'}}>
                            <CTableRow>
                                <CTableHeaderCell className='clthinputtext'style={{borderRadius:'5px 0px 0px 0px',fontSize:'11px !important'}} scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Seq</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Serviço</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Valor Unit(€)</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Qtde</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Valor Final</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        { listaservico.length > 0 ?(
                            <CTableBody>
                                {
                                listaservico.map((item,index)=>{
                                    return(
                                     <CTableRow>
                                        <CTableDataCell>{index+1}</CTableDataCell>
                                        <CTableDataCell>{item.servicoitem}</CTableDataCell>
                                        <CTableDataCell>{item.servico}</CTableDataCell>
                                        <CTableDataCell>{item.valor}</CTableDataCell>
                                        <CTableDataCell>{item.qtde}</CTableDataCell>
                                        <CTableDataCell>{item.valortotal}</CTableDataCell>
                                        <CTableDataCell>{item.servico}</CTableDataCell>
                                     </CTableRow>
                                   )
                                })
                            }
                            </CTableBody>) : (<></>)
                        }
                        {/* <CTableBody>
                            {load
                            ? (<CorpoTabela lista={listapro} estado={est}/>)
                            : (<CTableRow><CTableDataCell colspan="9" style={{textAlign:'center'}}><CSpinner className="spinner-orange" color="info"></CSpinner></CTableDataCell></CTableRow>)}
                        </CTableBody> */}
                    </CTable>
                    </div>
               </CCol>
            </CRow>

      </div>
    )
 }

 return(
        <section id="section-tipocliente" style={{marginTop:'180px'}} class="container py-4 py-md-5">
        <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
        <CabecalhoCadastro
           titulo="Agendas"
           texto="Informe o Agendamento"
        />

        {/* <form id="form-tipocliente" class="form-card p-3 p-md-4"> */}
        <CForm className="row g-3 needs-validation form-card p-3 p-md-4" noValidate  id="form-acolhido" onSubmit={handleSubmit} validated={validated}>

            {/* <!-- DADOS PESSOAIS --> */}
            <section class="mb-4">

                <h2 class="section-title">
                    <div style={{overflow:'auto'}}>
                        <div style={{float:'left'}} class="circle text-orange">01</div>
                        <div style={{marginTop:'4px',paddingLeft:'4px',float:'left'}}>Dados do Agendamento</div>
                    </div>
                </h2>

                <div class="row g-3">

                    <CCol md={6}>
                        { loadpage
                        ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                        : (
                            <CFormSelect
                                id="idProposta"
                                label="Proposta"
                                value={proposta}
                                feedbackInvalid="A Proposta deve ser informada"
                                onChange={(e)=>setProposta(e.target.value)}
                                required
                            >
                            <CompProposta/>
                            </CFormSelect>)}
                    </CCol>
                    <CCol md={6}>
                        { loadpage
                        ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                        : (
                            <CFormSelect
                                id="idProfissional"
                                label="Profissional"
                                value={profissional}
                                feedbackInvalid="A Profissional deve ser informada"
                                onChange={(e)=>setProfissional(e.target.value)}
                                required
                            >
                            <CompProfissional/>
                            </CFormSelect>)}
                    </CCol>
                    <CCol md={12}>
                        { loadpage
                            ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                            : (<CFormTextarea
                                id="idserrta"
                                label="Descrição do serviço"
                                placeholder="Digite a descriçõo"
                                rows={3}
                                aria-label="Example text with button addon"
                                aria-describedby="button-addon1"
                                defaultValue={descricao}
                                feedbackInvalid="A Descrição precisa ser preenchida"
                                required
                                onChange={(e)=>setDescricao(e.target.value)}
                        />)}
                    </CCol>
                    <CCol md={12}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormInput
                                    type="text"
                                    id="IdCadastro"
                                    label="Cadastro"
                                    defaultValue={cadastro}
                                    feedbackInvalid="Please provide a valid zip."
                                    readOnly
                                    required
                                />)}
                    </CCol>
                </div>
            </section>
            <section class="mb-4">

                <h2 class="section-title">
                    <div style={{overflow:'auto'}}>
                        <div style={{float:'left'}} class="circle text-orange">02</div>
                        <div style={{marginTop:'4px',paddingLeft:'4px',float:'left'}}>Dados da Proposta</div>
                    </div>
                </h2>
                <DadosProposta id={proposta}/>
            </section>

            {/* <!-- AÇÕES --> */}
            <CCol xs={12}>

            </CCol>
            <div class="form-actions d-flex flex-column
                        flex-sm-row justify-content-end gap-2">

                <CButton className="btn-brand" color="primary" type="submit">
                    Salvar&nbsp;<FontAwesomeIcon size="lg" icon={faSave} />
                    {' '}
                    {loadsave? <CSpinner size="sm" /> : ''}
                </CButton>
                    {' '}
                <CButton className="btn-lista"  color="dark" type="button" onClick={(e)=>handleClick(e,'ListaAgenda')}>
                        Listar&nbsp;<FontAwesomeIcon size="lg" icon={faList} />
                </CButton>
            </div>

            <p class="small text-secondary mt-3 mb-0">
                * Campos obrigatórios.
            </p>

        </CForm>
    </section>
    )
}

export default Agenda
