import { React,useEffect,useState,useRef   } from 'react';
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
const Servico = (props) => {

  const { tela } = props
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  console.log(token)
  const [validated, setValidated] = useState(false)
  const [loadpage, setLoadpage] = useState(false)
  const [loadsave, setLoadsave] = useState(false)
  const [idservico, setIdservico] = useState(null)
  const [descricao, setDescricao] = useState('')
  const [cadastro, setCadastro] = useState('')
  const [saved,setSaved] = useState(false)
  const [toast, addToast] = useState()//toast
  const [param, setParam] = useState(props.param)//toast
  const toaster = useRef(null)
  const style_placeholder = {paddingBottom:'15px'}

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
                setIdservico(result_tipocliente.data.data.ser_id_ser)
                setDescricao(result_tipocliente.data.data.ser_descricao)
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

    if( erro == false && idservico == null) {
        setLoadsave(false)
        const formData = new FormData()
        formData.append('ser_descricao', descricao)
        axios
        .post(`${endpoint}/servico`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            //setSaved(!saved)
            let valor = 'ListaServico'
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
         .post(`${endpoint}/servico/${idservico}`, formData, {
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
                tela('ListaServico')
            }, 2000)
        })
    }
 }

 const handleClick = (event,valor) =>{
     event.preventDefault();
     tela(valor)
 }

 return(
        <section id="section-tipocliente" style={{marginTop:'180px'}} class="container py-4 py-md-5">
        <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
        <CabecalhoCadastro
           titulo="Tipos de Serviços"
           texto="Informe tipo de serviço"
        />

        {/* <form id="form-tipocliente" class="form-card p-3 p-md-4"> */}
        <CForm className="row g-3 needs-validation form-card p-3 p-md-4" noValidate  id="form-acolhido" onSubmit={handleSubmit} validated={validated}>

            {/* <!-- DADOS PESSOAIS --> */}
            <section class="mb-4">

                <h2 class="section-title">
                    <div style={{overflow:'auto'}}>
                        <div style={{float:'left'}} class="circle text-orange">01</div>
                        <div style={{marginTop:'4px',paddingLeft:'4px',float:'left'}}>Dados do serviço</div>
                    </div>
                </h2>

                <div class="row g-3">

                    <CCol md={12}>
                        { loadpage
                            ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                            : (<CFormInput
                                id="idserrta"
                                label="Descrição"
                                placeholder="Digite a descricao"
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
                <CButton className="btn-lista"  color="dark" type="button" onClick={(e)=>handleClick(e,'ListaServico')}>
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

export default Servico
