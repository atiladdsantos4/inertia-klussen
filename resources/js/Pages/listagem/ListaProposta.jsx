import { React,useEffect,useState,useRef   } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton, CTable,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell,
    CTableHead,CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,CPagination,CPaginationItem,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,CTooltip,CBadge} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson, faSave, faTrash, faEdit, faList, faFile, faPlus } from '@fortawesome/free-solid-svg-icons';
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
const ListaProposta = (props) => {

  const { tela, altera, largura, itemservico }  = props
  const token  = import.meta.env.VITE_APP_TOKEN
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const [listapro,setListapro] = useState([])
  const [listafiltro,setListafiltro] = useState([])
  const [est,setEst] = useState(false)
  const [numnpagination,setNumpagination] = useState(null)
  const [paginaatual,setPaginaatual] = useState(null)
  const [ultimapagina,setUltimapagina] = useState(null)
  const [registroini,setRegistroini] = useState(0)
  const [registrofim,setRegistrofim] = useState(0)
  const [qtderegistros,setQtderegistros] = useState(0)
  const [qtderegistrospagina,setQtderegistrospagina] = useState(10)
  const [pesquisar,setPesquisar] = useState(null)
  const [sizebt,setSizebt] = useState(null)
  const [load,setLoad] = useState(false)

  useEffect(() => {
     let largura = window.screen.width;
     if(largura < 400){
        setSizebt('sm')
     } else {
        setSizebt('')
     }
  }, [largura])


  useEffect(()=>{
     setLoad(false)
     axios
       .get(`${endpoint}/proposta?listagem=S`,{
           headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
           },
       })
       .then((result) => {
           altera(null)
           console.log(result)
           setListapro(result.data.data)
           setListafiltro(result.data.data)
           let tam = result.data.data.length
           setQtderegistros(tam)
           let res = tam / qtderegistrospagina
           let resposta = res.toString().split('.');
           if( parseInt(resposta[1]) === 0 || resposta[1] === undefined){
                setNumpagination(res)
           } else {
                res = parseInt(resposta[0]) + 1
                let numpag = res.toFixed(0)
                setNumpagination(numpag)
           }
           setUltimapagina(res)
           setPaginaatual(1)
           if( tam > 0){
               setRegistroini(1)
               setRegistrofim(qtderegistrospagina)
           }
           setLoad(true)
       })
  },[qtderegistrospagina])

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

  //--> Exibe os dados da Tabela
    const CorpoTabela = (props) =>{
        let classe = null
        let cont = 0
        let tam = props.lista.length
        if( tam == 0){
           return(
              <CTableRow color={classe}>
                  <CTableDataCell colspan="4" style={{textAlign:'center'}}>Não há Registros para Listagem</CTableDataCell>
              </CTableRow>
          )
        }
        return(
           props.lista.map((item,index)=>{
              cont++
              classe = index % 2 == 0 ? 'primary' : 'secondary'
              if(cont > qtderegistrospagina){
                 return
              } else {
                 return(
                  <CTableRow color={classe}>
                      <CTableDataCell>#</CTableDataCell>
                      <CTableDataCell>{item.prc_id_prc}</CTableDataCell>
                      <CTableDataCell>{item.prc_cliente.cli_nome}</CTableDataCell>
                      <CTableDataCell>{item.prc_data_proposta}</CTableDataCell>
                      <CTableDataCell>{item.prc_data_validade}</CTableDataCell>
                      <CTableDataCell>{item.prc_valor_final}</CTableDataCell>
                      <CTableDataCell>{item.prc_ativa == 1 ? (<CBadge color="primary">Ativa</CBadge>) : (<CBadge textColor="white" color="danger">Cancelada</CBadge>)}</CTableDataCell>
                      <CTableDataCell>{ item.prc_aceita == 1 ? (<CBadge color="success">Confirmada</CBadge>) : (<CBadge textColor="dark" color="warning">Agurdando Aceite</CBadge>)}</CTableDataCell>
                      <CTableDataCell>{item.prc_email.coe_email_proposta == 1 ? (<CBadge color="success">Enviado</CBadge>) : (<CBadge textColor="dark" color="info">Sem Envio</CBadge>)}</CTableDataCell>
                      <CTableDataCell>{item.prc_email.coe_email_recibo == 1 ? (<CBadge color="success">Enviado</CBadge>) : (<CBadge textColor="dark" color="info">Sem Envio</CBadge>)}</CTableDataCell>
                      <CTableDataCell>{item.prc_data_aceite}</CTableDataCell>
                      <CTableDataCell>{item.prc_created_at}</CTableDataCell>
                      <CTableDataCell style={{textAlign:'right'}}><ItensAcao id={item.prc_id_prc}/></CTableDataCell>
                      {/* <CTableDataCell style={{textAlign:'center'}}></CTableDataCell> */}
                      </CTableRow>
                 )
              }
           })
        )
    }


    const pesquisarGrid = (event) => {
       let valor =  event.target.value
       if( valor.trim() != ''){
          let lista = listafiltro.filter(
              (item)=>item.ser_descricao.toLowerCase().includes(valor.toLowerCase())
          )
          console.log(lista)
          setListapro(lista.slice(0,qtderegistrospagina))
       } else {
          setListapro(listafiltro.slice(0,qtderegistrospagina))
       }
    }


    //--> Exibe o componente de paginação
    const PaginationExibe = (props) => {
       return(
          // <div style={{fontSize:'14px',paddingLeft:'3px',paddingRight:'3px',backgroundColor:'#722E56',color:'white',display:'flex',borderRadius:'5px 5px 5px 5px'}}>
          <div className='exibepagination'>
              <div>Pagina:&nbsp;{props.pagina}&nbsp;</div>
              <div>Regitros:&nbsp;{registroini+'...'+registrofim+' num Total de '+qtderegistros}</div>
         </div>
       )
    }

    const PreviousPage =(event)=>{
      let page = paginaatual
      console.log('paginaatual:'+paginaatual)
      console.log('ultimapagina:'+ultimapagina)
      if(paginaatual < ultimapagina){
         page = page + 1
         console.log('ultimapagina-entrei')
         clickPagination(event,page)
      }
    }

    const PriousPage =(event)=>{
      let page = paginaatual
      console.log('paginaatual:'+paginaatual)
      console.log('ultimapagina:'+ultimapagina)
      if(paginaatual > 1){
         page = page - 1
         console.log('ultimapagina-entrei')
         clickPagination(event,page)
      }
    }

    //--> Efetuar a pesquisa pelo click
    const clickPagination = (event,idx) =>{
      //  0,5,5,10
      setPaginaatual(idx)
      let ref = idx == 1 ? 0 : idx
      let inicio = ref == 0 ? ref : (ref * qtderegistrospagina) - qtderegistrospagina
      let fim = idx * qtderegistrospagina
      let lista = null
      lista = listafiltro.slice(inicio,fim)
      setRegistroini(inicio+1)
      if(fim > qtderegistros){
         setRegistrofim(qtderegistros)
      } else {
         setRegistrofim(fim)
      }
      setListapro(lista)
    }

    const Pagination = (props) => {
      let elemento = []

      for(let i = 1; i <= props.pages; i++ ){
        if( i == paginaatual){
           elemento.push(<CPaginationItem active={true} className='cpointer cl_pagination' onClick={(e)=>clickPagination(e,i)}>{i}</CPaginationItem>)
        } else {
           elemento.push(<CPaginationItem active={false} className='cpointer cl_pagination' onClick={(e)=>clickPagination(e,i)}>{i}</CPaginationItem>)
        }
      }

      return (
          <CPagination aria-label="Page navigation example">
              <CPaginationItem className='cpointer' aria-label="Previous" onClick={(e)=>PriousPage(e)}>
                  <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>
              { elemento }
              <CPaginationItem className='cpointer' aria-label="Next" onClick={(e)=>PreviousPage(e)}>
                  <span aria-hidden="true">&raquo;</span>
              </CPaginationItem>
          </CPagination>
      )
    }

    //--> Display dos Ícones no grid
    const ItensAcao = (props) => {
      return(
         <>
         <div style={{display:'flex',flexDirection:'row',gap:'5px',justifyContent:'flex-end'}}>
            <div className='circle_red'>
               <FontAwesomeIcon style={{color:'red',cursor:'pointer'}} icon={faTrash}/>
            </div>
            <CTooltip content="Editar Registro" placement="top">
            <div className='circle_blue'>
                <FontAwesomeIcon onClick={(e)=>EditaRegistro(e,props.id)} style={{color:'white',cursor:'pointer'}} icon={faEdit}/>
            </div>
            </CTooltip>
            <CTooltip content="Adicionar Itens ao serviço" placement="top">
              <div className='circle_green'>
                 <FontAwesomeIcon onClick={(e)=>addItemServico(e,props.id)} style={{color:'white',cursor:'pointer'}} icon={faPlus}/>
              </div>
            </CTooltip>
         </div>
         </>
      )
    }

    const EditaRegistro = (event,valor) =>{
        altera(valor)
        tela('GeraProposta')
    }

    const addItemServico = (event,valor) =>{
        itemservico(valor)
        tela('ServicoItem')
    }

    const QtdeRegistrosPagina = () =>{
            return(
                <CFormSelect
                    value={qtderegistrospagina}
                    onChange={(e)=>setQtderegistrospagina(e.target.value)}
                    >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                </CFormSelect>
            )
    }

    return(
        <section id="section-servico" style={{marginTop:'180px'}} class="container py-4 py-md-5">

        <CabecalhoCadastro
           titulo="Listagem de Propostas"
           texto="Pesquisar Propostas"
        />

        <div className="mb-4" style={{display:'flex',justifyContent:'flex-end'}}>
            <CButton size={sizebt} className="btn-brand" color="primary" onClick={(e)=>tela('GeraProposta')}>Nova Proposta&nbsp;<FontAwesomeIcon size="lg" icon={faFile} /></CButton>
        </div>
                            <div style={{display:'flex'}}>
                                <div style={{flex:'1'}}>
                                    <CInputGroup size={sizebt} style={{maxWidth:'400px'}} className="mb-2 mt-2">
                                        <CInputGroupText style={props.estilo} className="clinputtext">Pesquisar</CInputGroupText>
                                        <CFormInput placeholder={'Digite um valor'} value={pesquisar} onChange={(e)=>pesquisarGrid(e)}/>
                                    </CInputGroup>
                                </div>
                                <div style={{justifySelf:'end',alignSelf:'end'}}>
                                    <CInputGroup size={sizebt} style={{maxWidth:'200px'}} className="mb-2 mt-2">
                                        <CInputGroupText style={props.estilo} className="clinputtext">Registros</CInputGroupText>
                                        <QtdeRegistrosPagina/>
                                    </CInputGroup>
                                </div>
                            </div>
                            <CTable className='tabela'>
                                <CTableHead style={{fontSize:'11px !important'}}>
                                    <CTableRow>
                                        <CTableHeaderCell className='clthinputtext'style={{borderRadius:'5px 0px 0px 0px',fontSize:'11px !important'}} scope="col">#</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">NºProposta</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Cliente</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Data</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Validade</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Valor</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Status</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Situação</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Email Proposta</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Email Recibo</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Data Aceite</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {load
                                    ? (<CorpoTabela lista={listapro} estado={est}/>)
                                    : (<CTableRow><CTableDataCell colspan="13" style={{textAlign:'center'}}><CSpinner className="spinner-orange" color="info"></CSpinner></CTableDataCell></CTableRow>)}
                                </CTableBody>
                            </CTable>
                            <div>
                                <div style={{display:'flex',justifyContent:'flex-start'}}>
                                    <PaginationExibe pagina={paginaatual}/>
                                </div>
                                <div style={{display:'flex',justifyContent:'flex-end',top:'-5px'}}>
                                    <Pagination pages={numnpagination}/>
                                </div>
                            </div>
    </section>
    )
}

export default ListaProposta
