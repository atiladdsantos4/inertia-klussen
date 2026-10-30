import { React,useEffect,useState,useRef  } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton, CTable,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell,
    CTableHead,CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,CPagination,CPaginationItem,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,
  CDropdown, CDropdownHeader, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider,CBadge,
  CFormText,
  CFormTextarea} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson, faSave, faTrash, faEdit, faList,faEraser  } from '@fortawesome/free-solid-svg-icons';
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
    const { tela } = props
    const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
    const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
    const token  = import.meta.env.VITE_APP_TOKEN
    const [validated, setValidated] = useState(false)
    const [loadpage, setLoadpage] = useState(false)
    const [loadsave, setLoadsave] = useState(false)
    const [idcliente, setIdcliente] = useState(null)
    const [idclienteend, setIdclienteend] = useState(null)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [tipotelefone, setTipotelefone] = useState('')
    const [telefone, setTelefone] = useState('')
    const [pais, setPais] = useState('')
    const [cidade, setCidade] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState(null)
    const [zipcode, setZipcode] = useState('')
    const [infadcional, setInfadcional] = useState('')
    const [listatipocliente, setListatipocliente] = useState([])
    const [listacidade, setListacidade] = useState([])
    const [listafiltrocidade, setListafiltrocidade] = useState([])
    const [listaadmin, setListaadmin] = useState([])
    const [listapais, setListapais] = useState([])
    const [listaclasse, setListaclasse] = useState([])
    const [tipocliente, setTipocliente] = useState('')
    const [ativo,setAtivo] = useState(true)
    const [cadastro, setCadastro] = useState('')
    const [saved,setSaved] = useState(false)
    const [toast, addToast] = useState()//toast
    const [param, setParam] = useState(props.param)//toast
    const [paramservico, setParamservico] = useState(props.servicovalor)//toast
    const [itematualtexto,setItematualtexto] = useState('')
    const [mostramenu,setMostramenu] = useState(false)
    const [semnumero,setSemnumero] = useState(false)

    const toaster = useRef(null)
    const style_placeholder = {paddingBottom:'15px'}

    useEffect(()=>{
    let data = formatDate(new Date());
    setCadastro(data)
    if( props.param != null){
        const fetchData = async () =>{
           try {
                setLoadpage(true)
                const requests = [
                    axios.get(`${endpoint}/tipocliente?listagem=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                    axios.get(`${endpoint}/pais?listagem=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                    axios.get(`${endpoint}/cidade?listagem=S&cad_cli=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                    axios.get(`${endpoint}/admin?listagem=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                    axios.get(`${endpoint}/cliente/${param}`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    })
                ]

                const responses = await Promise.all(requests);
                let result_tipocliente = responses[0]
                let result_pais = responses[1]
                let result_cidade = responses[2]
                let result_admin = responses[3]
                let result_cliente = responses[4]
                let array_tipo = result_tipocliente.data.data
                //tic_id_tic,tic_descricao
                array_tipo.unshift({tic_id_tic:'',tic_descricao:'Selecione o Tipo de Cliente'})
                setListatipocliente(array_tipo)
                let array_pais = result_pais.data.data
                array_pais.unshift({pai_id_pai:'',pai_descricao:'Selecione o País',pai_iso:''})
                setListapais(array_pais)
                setLoadpage(false)
                let vet_filtro = []
                let existe = []
                let obj = null
                let cont = 1
                result_admin.data.data.map((item,index)=>{
                   existe = vet_filtro.filter((it)=>it.nome == item.adm_descricao)
                   obj = {
                      classe:'badge'+cont,
                      nome:item.adm_descricao
                   }
                   if(existe.length == 0){
                      cont++
                      vet_filtro.push(obj)
                   }
                })
                setListaclasse(vet_filtro)
                setListacidade(result_cidade.data.data)
                setListafiltrocidade(result_cidade.data.data)
                setIdcliente(result_cliente.data.data.cli_id_cli)
                setNome(result_cliente.data.data.cli_nome)
                setEmail(result_cliente.data.data.cli_email)
                setTipotelefone(result_cliente.data.data.cli_tipo_telefone)
                setTelefone(result_cliente.data.data.cli_telefone)
                setTipocliente(result_cliente.data.data.cli_id_tic)
                let ck = result_cliente.data.data.cli_ativo == 1 ? true : false
                setAtivo(ck)
                setIdclienteend(result_cliente.data.data.cli_endereco.cle_id_cle)
                setPais(result_cliente.data.data.cli_endereco.cle_id_pai)
                setCidade(result_cliente.data.data.cli_endereco.cle_id_cid)
                setItematualtexto(result_cliente.data.data.cli_endereco.cidade.cid_descricao+' - '+result_cliente.data.data.cli_endereco.cidade.admin.adm_descricao)
                setEndereco(result_cliente.data.data.cli_endereco.cle_endereco)
                ck = result_cliente.data.data.cli_endereco.cle_tem_numero == 'N' ? true : false
                setSemnumero(ck)
                setZipcode(result_cliente.data.data.cli_endereco.cle_zipcode)
                setInfadcional(result_cliente.data.data.cli_endereco.cle_adicional)
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
                    axios.get(`${endpoint}/tipocliente?listagem=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                    axios.get(`${endpoint}/pais?listagem=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                    axios.get(`${endpoint}/cidade?listagem=S&cad_cli=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                    axios.get(`${endpoint}/admin?listagem=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    })
                ]

                const responses = await Promise.all(requests);
                let result_tipocliente = responses[0]
                let result_pais = responses[1]
                let result_cidade = responses[2]
                let result_admin = responses[3]
                let array_tipo = result_tipocliente.data.data
                //tic_id_tic,tic_descricao
                array_tipo.unshift({tic_id_tic:'',tic_descricao:'Selecione o Tipo de Cliente'})
                setListatipocliente(array_tipo)
                let array_pais = result_pais.data.data
                array_pais.unshift({pai_id_pai:'',pai_descricao:'Selecione o País',pai_iso:''})
                setListapais(array_pais)
                setLoadpage(false)
                let vet_filtro = []
                let existe = []
                let obj = null
                let cont = 1
                result_admin.data.data.map((item,index)=>{
                   existe = vet_filtro.filter((it)=>it.nome == item.adm_descricao)
                   obj = {
                      classe:'badge'+cont,
                      nome:item.adm_descricao
                   }
                   if(existe.length == 0){
                      cont++
                      vet_filtro.push(obj)
                   }
                })
                setListaclasse(vet_filtro)
                setListacidade(result_cidade.data.data)
                setListafiltrocidade(result_cidade.data.data)
                /*
                let vet_filtro = []
                let existe = []
                let obj = null
                let cont = 1
                result_precolivro.data.data.map((item,index)=>{
                   existe = vet_filtro.filter((it)=>it.nome == item.prl_livro.autor.aut_nome)
                   obj = {
                      classe:'badge'+cont,
                      nome:item.prl_livro.autor.aut_nome
                   }
                   if(existe.length == 0){
                      cont++
                      vet_filtro.push(obj)
                   }
                })
                setListaclasse(vet_filtro)
                */
            }
            catch (error) {
                console.error("One of the requests failed", error);
            }
        }
        fetchData()
    }
    },[])

    const CompTipoTelefone = () =>{
       return(
          <>
          <option value="">Selecione o Tipo</option>
          <option value="C">Celular</option>
          <option value="F">Fixo</option>
          </>
       )
    }

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

    const mudaTipoTelefone = (event,valor) =>{
        setTipotelefone(valor)
        let tel = ''
        setTelefone(tel)
    }

    const FixoInput = (props) => {
      const [value, setValue] = useState(props.telefone)
        return (
            <IMaskInput
                className="form-control"
                mask='+31 00 000 0000' // Define o tipo da máscara como numérico
                signed={false} // Se permite números negativos
                // Captura o valor aceito (pode ser unmasked ou typed)
                onAccept={(value, mask) => {
                   setValue(value);
                }}
                //onBlur = {(e)=>handleBlur(e,'desconto')}
                onBlur = {()=>setTelefone(value)}
                defaultValue={value}
                placeholder="+31 00 000 0000"
                required
            />
        );
  }

  const CelularInput = (props) => {
      const [value, setValue] = useState(props.telefone)
        return (
            <IMaskInput
                className="form-control"
                mask='+31 0 0000 0000' // Define o tipo da máscara como numérico
                signed={false} // Se permite números negativos
                // Captura o valor aceito (pode ser unmasked ou typed)
                onAccept={(value, mask) => {
                   setValue(value);
                }}
                //onBlur = {(e)=>handleBlur(e,'desconto')}
                onBlur = {()=>setTelefone(value)}
                defaultValue={value}
                placeholder="+31 0 0000 0000"
                required
            />
        );
  }

  const ZipCodeInput = (props) => {
      const [value, setValue] = useState(props.cep)
        return (
            <>
            <CFormLabel htmlFor="exampleForm">ZipCode</CFormLabel>
            <IMaskInput
                className="form-control"
                mask='0000 aa' // Define o tipo da máscara como numérico
                signed={false} // Se permite números negativos
                // Captura o valor aceito (pode ser unmasked ou typed)
                onAccept={(value, mask) => {
                   setValue(value);
                }}
                //onBlur = {(e)=>handleBlur(e,'desconto')}
                onBlur = {()=>setZipcode(value)}
                defaultValue={value}
                placeholder="0000 **"
                required
            />
            <CFormFeedback invalid>{'Digite o ZipCode do Cliente'}</CFormFeedback>
            </>
        );
  }

  const CompTelefone = () =>{
    return(
        <>
        <CFormLabel htmlFor="exampleForm">Telefone</CFormLabel>
        { tipotelefone == 'F' ? <FixoInput telefone={telefone}/> : <CelularInput telefone={telefone}/>}
        <CFormFeedback invalid>{'Digite o Telefone do Cliente'}</CFormFeedback>
        </>
    )
  }

  const CompTipoCliente = () =>{
    return(
        listatipocliente.map((item,index)=>{
        return(
            <option key={index} value={item.tic_id_tic}>{item.tic_descricao}</option>
            )
        })
    )
  }

  const CompPais = () =>{
    return(
        listapais.map((item,index)=>{
            if(item.pai_iso == ''){
                return(
                   <option key={index} value={item.pai_id_pai}>{item.pai_descricao}</option>
                )
            } else {
                return(
                   <option key={index} value={item.pai_id_pai}>{item.pai_descricao+' - '+item.pai_iso}</option>
                )
            }
        })
    )
  }

  const CompCidade = () =>{
    return(
        listacidade.map((item,index)=>{
        return(
            <option key={index} value={item.cid_id_cid}>{item.cid_descricao}</option>
            )
        })
    )
  }

  const pesquisarCidade = (val) => {
     console.log('valor'+val)
     //setPesquisa(event.target.value)
     setItematualtexto(val)
     setMostramenu(true)
     //MostraDrop()
     let valor =  val
     if( valor.trim() != ''){
        let lista = listafiltrocidade.filter(
            (item)=>item.cid_descricao.toLowerCase().includes(valor.toLowerCase()) ||
                    item.cid_admin.toLowerCase().includes(valor.toLowerCase())
        )
        setListacidade(lista)
     } else {
        setListacidade(listafiltrocidade)
     }
}


 const SelectCidades = () =>{
       const [valor,setValor] = useState('')
       let classedrop  = mostramenu ? 'dropdown-menu show dropdown-class showdropdown' : 'dropdown-class'
       let array =['badge1','badge2','badge3','badge4','badge5','badge6','badge7','badge8','badge9','badge10']
       let classe = ''
       let idxclasse = -1
       let existe = []
       let cl = null
       return(
           <><CFormLabel htmlFor="exampleFormControlInput1">Listagem de Cidades</CFormLabel><br/>
           <CInputGroup className="mb-3">
               <CInputGroupText style={{height:'38px'}} className="clinputtext has-validation">Cidades</CInputGroupText>
               <CDropdown autoClose="inside" variant="btn-group">
                   <CDropdownToggle id="iddrop" size="sm" style={{maxHeight:'37px',borderRadius:'0px 0px 0px 0px'}} color={'secondary'}>Escolher</CDropdownToggle>
                   <CDropdownMenu id="iddropM" className={classedrop}>
                   {
                       //   <option value="">{''}</option>
                       listacidade.map((item,index)=>{
                            existe = listaclasse.filter((it)=>it.nome == item.cid_admin)
                            if(existe.length == 0 ){
                               cl ={display:'inline'}
                            } else {
                               cl =  existe[0].classe
                            }
                            if( item.cid_admin != classe){
                               classe = item.cid_admin
                               idxclasse++
                               if( idxclasse > 11){
                                  idxclasse=0
                               }
                            }
                            return(
                              <>
                              <CDropdownItem id={'drop'+index} style={{fontSize:'13px'}} href="#" onClick={(e)=>AlteraEscolha(e,item.cid_id_cid,item.cid_descricao+' - '+item.cid_admin)}>
                                 {item.cid_descricao}&nbsp;<CBadge className={cl} color="success">{item.cid_admin}</CBadge>
                              </CDropdownItem>
                              </>
                           )
                       })
                   }

                   </CDropdownMenu>
               </CDropdown>
               &nbsp;<div className='mt-2'><FontAwesomeIcon onClick={()=>LimparFiltro()}style={{top:'2px',color:'red',cursor:'pointer'}} size="lg" icon={faEraser} /></div>
           </CInputGroup>
           </>
       )
 }

 const FechaMenu = () =>{
   let obj =  document.getElementById('iddrop');
   let objM =  document.getElementById('iddropM');
   return
   if( objM.classList.contains('show')){
     objM.classList.remove('show')
     return
   }
 }

 const AlteraEscolha = (event,id,titulo) =>{
    if(titulo.indexOf('ecione') >= 0){
        setItematualtexto('')
        return
    }
    setMostramenu(false)
    setItematualtexto(titulo)
    setCidade(id)
 }

 const LimparFiltro = () =>{
    setItematualtexto('')
    setMostramenu(false)
    setListacidade(listafiltrocidade)
    //pesquisarCidade('')
 }

 const CompNumero = () =>{
    const [valor,setValor] = useState()
    function muda(valor){
       setNumero(valor)
    }
    return(
       <CFormInput
            type="text"
            id="IdNumero"
            label=""
            value={valor}
            onBlur={()=>muda(valor)}
            onChange={(e)=>setValor(e.target.value)}
            feedbackInvalid="Informe o Número."
            required
      />
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
 
     if( erro == false && idcliente == null) {
         setLoadsave(true)
         const formData = new FormData()
         //dados cliente//
         formData.append('cli_nome', nome)
         formData.append('cli_email', email)
         formData.append('cli_tipo_telefone', tipotelefone)
         formData.append('cli_telefone', telefone)
         formData.append('cli_id_tic', tipocliente)
         let ckativo =  ativo ? 1 : 0 
         formData.append('cli_ativo', ckativo)
         //dados endereco//
         formData.append('cle_id_pai', pais)
         formData.append('cle_id_cid', cidade)
         formData.append('cle_endereco', endereco)
         ckativo =  semnumero ? 'N' : 'S'  
         formData.append('cle_tem_numero', ckativo)
         if(semnumero){
           formData.append('cli_numero', null) 
         } else {
           formData.append('cli_numero', numero)  
         }
         formData.append('cle_zipcode', zipcode)  
         formData.append('cle_adicional', infadcional)  
         axios
         .post(`${endpoint}/cliente`, formData, {
             headers: {
             Accept: 'application/json',
             'Content-Type': 'multipart/form-data',
             Authorization: 'Bearer ' + token,//dentro do env//
             },
         })
         .then((result) => {
             //setSaved(!saved)
             let valor = 'ListaClientes'
             setLoadsave(false)
             addToast(CompToast('Dados Gravados com sucesso !!!', 'success')) //--> usa toast
             setTimeout(() => {
                 document.getElementById('idtoast').classList.remove('show')
                 document.getElementById('idtoast').remove()
                 tela(valor)
             }, 2000)
         })
     } else {
         setLoadsave(true)
         const formData = new FormData()
         //dados cliente//
         formData.append('cli_nome', nome)
         formData.append('cli_email', email)
         formData.append('cli_tipo_telefone', tipotelefone)
         formData.append('cli_telefone', telefone)
         formData.append('cli_id_tic', tipocliente)
         let ckativo =  ativo ? 1 : 0 
         formData.append('cli_ativo', ckativo)
         //dados endereco//
         formData.append('cle_id_cle', idclienteend)
         formData.append('cle_id_cli', idcliente)
         formData.append('cle_id_pai', pais)
         formData.append('cle_id_cid', cidade)
         formData.append('cle_endereco', endereco)
         ckativo =  semnumero ? 'N' : 'S'  
         formData.append('cle_tem_numero', ckativo)
         if(semnumero){
           formData.append('cli_numero', null) 
         } else {
           formData.append('cli_numero', numero)  
         }
         formData.append('cle_zipcode', zipcode)  
         formData.append('cle_adicional', infadcional)  
         formData.append('_method', 'put')
         axios
          .post(`${endpoint}/cliente/${idcliente}`, formData, {
             headers: {
             Accept: 'application/json',
             'Content-Type': 'multipart/form-data',
             Authorization: 'Bearer ' + token,//dentro do env//
             },
         })
         .then((result) => {
             setLoadsave(false)
             addToast(CompToast('Dados Atualizados com sucesso !!!', 'success')) //--> usa toast
             setTimeout(() => {
                 document.getElementById('idtoast').classList.remove('show')
                 document.getElementById('idtoast').remove()
                 tela('ListaClientes')
             }, 2000)
         })
     }
  }

  const handleClick = (event,valor) =>{
     event.preventDefault();
     tela(valor)
  }

    return(
        <section id="section-cliente" style={{marginTop:'180px'}} class="container py-4 py-md-5">
        <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />    
        <CabecalhoCadastro
           titulo="Cadastro de clientes"
           texto="Registre os dados do cliente e os detalhes do serviço."
        />

        {/* <form id="form-cliente" class="form-card p-3 p-md-4"> */}
        <CForm className="row g-3 needs-validation form-card p-3 p-md-4" noValidate  id="form-cliente" onSubmit={handleSubmit} validated={validated}>

            {/* <!-- DADOS PESSOAIS --> */}
            <section class="mb-2">

                <h2 class="section-title">
                    <div style={{overflow:'auto'}}>
                        <div style={{float:'left'}} class="circle text-orange">01</div>
                        <div style={{marginTop:'4px',paddingLeft:'4px',float:'left'}}>Dados do cliente</div>
                    </div>
                </h2>

                <div class="row g-3">
                    <CCol md={6}>
                        { loadpage
                        ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                        : (
                        <CFormInput
                            type="text"
                            id="IdNome"
                            label="Nome Completo"
                            value={nome}
                            onChange={(e)=>setNome(e.target.value)}
                            feedbackInvalid="O Nome deve ser Informado."
                            required
                        />)}
                    </CCol>
                    <CCol md={6}>
                        { loadpage
                        ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                        : (
                        <CFormInput
                            type="text"
                            id="IdEmail"
                            label="Email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            feedbackInvalid="O Email deve ser Informado."
                            required
                        />)}
                    </CCol>
                    <CCol md={4}>
                        { loadpage
                        ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                        : (
                            <CFormSelect
                                id="idTelefone"
                                label="Tipo de Telefone"
                                value={tipotelefone}
                                feedbackInvalid="O Tipo de Telefone deve ser informado"
                                onChange={(e)=>mudaTipoTelefone(e,e.target.value)}
                                required
                            >
                            <CompTipoTelefone/>
                            </CFormSelect>)}
                    </CCol>
                    <CCol md={4}>
                        { loadpage
                        ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                        : (
                        <CompTelefone/>
                        )}
                    </CCol>
                    <CCol md={4}>
                        { loadpage
                        ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                        : (
                            <CFormSelect
                                id="idTipoCliente"
                                label="Tipo de Cliente"
                                value={tipotelefone}
                                feedbackInvalid="O Tipo de Cliente deve ser informado"
                                value={tipocliente}
                                onChange={(e)=>setTipocliente(e.target.value)}
                                required
                            >
                            <CompTipoCliente/>
                            </CFormSelect>)}
                    </CCol>
                    <CCol md={4} xs={4} className="ms-2" style={{border:'1px solid #6895C1',borderRadius:'5px'}}>
                        { loadpage
                        ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={4} size="lg"/></div>)
                        : (
                        <>
                        <div style={{display:'flex',gap:'5px'}}>
                        <div style={{flex:'1'}}>
                            <CFormLabel htmlFor="exampleFormControlInput1">Status Cliente</CFormLabel><br/>
                            <CFormCheck
                                type="checkbox"
                                id="invalidCheck"
                                label="Situação"
                                feedbackInvalid="Informe se Acolhido esta Ativo"
                                checked={ativo}
                                onChange={(e)=>setAtivo(e.target.checked)}
                            />
                            <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                        </div>
                        <div style={{marginTop:'28px',marginLeft:'5px'}}>{ ativo ? <CBadge textColor="white" color="success">Cliente Ativo</CBadge> : <CBadge textColor="white" color="danger">Cliente Inativado</CBadge>}</div>
                        </div>
                        </>)}
                    </CCol>
                </div>
            </section>

            {/* <!-- ENDEREÇO --> */}
            <section class="mb-4">
                <h2 class="section-title">
                   <div style={{overflow:'auto'}}>
                        <div style={{float:'left'}} class="circle text-orange">02</div>
                        <div style={{marginTop:'4px',paddingLeft:'4px',float:'left'}}>Detalhes do Endereço</div>
                    </div>
                </h2>

                <div class="row g-3">

                    <CCol md={4}>
                        { loadpage
                        ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                        : (
                            <CFormSelect
                                id="idPais"
                                label="País"
                                value={pais}
                                feedbackInvalid="O País deve ser informado"
                                value={pais}
                                onChange={(e)=>setPais(e.target.value)}
                                required
                            >
                            <CompPais/>
                            </CFormSelect>)}
                    </CCol>
                    <CCol md={3}>
                        { loadpage
                        ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                        : (<SelectCidades/>)}
                    </CCol>
                    <CCol md={5} style={{left:'-10px'}}>
                        { loadpage
                        ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                        : (<CFormInput
                                style={{height:'38px'}}
                                label="Digite a Pesquisa"
                                onChange={(e)=>pesquisarCidade(e.target.value)}
                                value={itematualtexto}
                                placeholder='Item selecionado'
                                feedbackInvalid="A Ciadade deve ser informada"
                                required
                            />)}
                    </CCol>
                    <CCol md={8}>
                        { loadpage
                        ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                        : (
                        <CFormInput
                            type="text"
                            id="IdEndereco"
                            label="Endereço"
                            value={endereco}
                            onChange={(e)=>setEndereco(e.target.value)}
                            feedbackInvalid="O Endereço deve ser Informado."
                            required
                        />)}
                    </CCol>
                    <CCol md={4} xs={4} style={{maxWidth:'400px',marginLeft:'6px'}}>
                        { loadpage
                        ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={4} size="lg"/></div>)
                        : (
                        <>
                        <div style={{display:'flex',gap:'5px'}}>
                        <div style={{flex:'1'}}>
                            <CFormLabel htmlFor="exampleFormControlInput1">Número</CFormLabel><br/>
                            <CFormCheck
                                type="checkbox"
                                id="invalidCheck"
                                label="Sem Numero"
                                feedbackInvalid="Informe se Acolhido esta Ativo"
                                checked={semnumero}
                                onChange={(e)=>setSemnumero(e.target.checked)}
                            />
                            <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                        </div>
                        <div style={{flex:'1',marginTop:'28px',marginLeft:'5px'}}>{ semnumero ? <></> : <CompNumero/>}</div>
                        </div>
                        </>)}
                    </CCol>
                    <CCol md={4}>
                        { loadpage
                        ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                        : (
                        <ZipCodeInput cep={zipcode}/>
                        )}
                    </CCol>
                    <CCol md={8}>
                        { loadpage
                        ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                        : (
                        <CFormTextarea
                            type="text"
                            id="IdAdicional"
                            label="Informações Adicionais"
                            rows={2}
                            value={infadcional}
                            onChange={(e)=>setInfadcional(e.target.value)}
                            feedbackInvalid="O Endereço deve ser Informado."
                        />)}
                    </CCol>
                </div>
            </section>

            {/* <!-- AÇÕES --> */}
            <div class="form-actions d-flex flex-column
                        flex-sm-row justify-content-end gap-2">

                {/* <button
                    type="submit"
                    class="btn btn-brand px-4 py-2">
                    Save
                </button> */}
                <CButton className="btn-brand" color="primary" type="submit">
                    Salvar&nbsp;<FontAwesomeIcon size="lg" icon={faSave} />
                    {' '}
                    {loadsave? <CSpinner size="sm" /> : ''}
                </CButton>
                {' '}
                <CButton className="btn-lista"  color="dark" type="button" onClick={(e)=>handleClick(e,'ListaClientes')}>
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

export default Cadastro
