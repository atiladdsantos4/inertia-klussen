import { React,useEffect,useState,useRef, useInsertionEffect  } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton, CTable,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell,
    CTableHead,CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,CPagination,CPaginationItem,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,
  CDropdown, CDropdownHeader, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider,CBadge,
  CFormText, CFormTextarea,  CRow, CCollapse, CListGroup, CListGroupItem} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson, faSave, faTrash, faEdit, faList, faEraser, faCopy, faEnvelope,faArrowDown,faArrowUp, faFileInvoice, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput,IMaskMixin } from 'react-imask';
import DatePicker, { registerLocale,setDefaultLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import { nl } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import AOS from 'aos';
import CabecalhoCadastro from '../componentes/CabecalhoCadastro';
import { addDays } from 'date-fns'
import { ModalPreview } from '../componentes/ModalPreview';


// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';
/*
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { nl } from "date-fns/locale";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("nl", nl);
setDefaultLocale("nl");
*/



// The Main component receives props passed from the Laravel controller
const Proposta = (props) => {
    const { tela } = props
    const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
    const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
    const token  = import.meta.env.VITE_APP_TOKEN
    const [validated, setValidated] = useState(false)
    const [loadpage, setLoadpage] = useState(false)
    const [loadsave, setLoadsave] = useState(false)
    const [loademail, setLoademail] = useState(false)
    const [loadpreview, setLoadpreview] = useState(false)
    const [loadrecibo, setLoadrecibo] = useState(false)
    const [estlista,setEstlista] = useState(false)
    const [collapsetexto,setCollapsetexto] = useState(false)
    const [collapseia,setCollapseia] = useState(false)
    const [startDate, setStartDate] = useState();
    const [idproposta, setIdproposta] = useState(null)
    const [idcontroleemail, setIdcontroleemail] = useState(null)
    const [statusemailproposta, setStatusemailproposta] = useState(null)
    const [dataenvioproposta, setDataenvioproposta] = useState('')
    const [statusemailrecibo, setStatusemailrecibo] = useState(null)
    const [dataenviorecibo, setDataenviorecibo] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [tipotelefone, setTipotelefone] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cliente, setCliente] = useState('')
    const [nomecliente, setNomecliente] = useState('')
    const [dataproposta, setDataproposta] = useState(new Date())
    const [datavalidade, setDatavalidade] = useState('')
    const [dataaceite, setDataaceite] = useState('')
    const [valor, setValor] = useState('')
    const [desconto, setDesconto] = useState('')
    const [valorfinal, setValorfinal] = useState('')
    const [diasvalidade, setDiasvalidade] = useState(0)
    const [iaconteudo, setIaconteudo] = useState('')
    //prc_id_prc,prc_id_cli,prc_data_proposta,prc_qtde_validade,prc_ia_conteudo,prc_valor,prc_desconto,prc_valor_final,prc_created_at,prc_updated_at,prc_deleted_at
    const [cidade, setCidade] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState(null)
    const [zipcode, setZipcode] = useState('')
    const [infadcional, setInfadcional] = useState('')
    const [listacliente, setListacliente] = useState([])
    const [listacidade, setListacidade] = useState([])
    const [listafiltrocidade, setListafiltrocidade] = useState([])
    const [listaser, setListaser] = useState([])
    const [listaservico, setListaservico] = useState([])
    const [listaservicoitem, setListaservicoitem] = useState([])
    const [listamedida, setListamedida] = useState([])
    const [listaclasse, setListaclasse] = useState([])
    const [tipocliente, setTipocliente] = useState('')
    const [ativo,setAtivo] = useState(true)
    const [aceite,setAceite] = useState(false)
    const [cadastro, setCadastro] = useState('')
    const [saved,setSaved] = useState(false)
    const [toast, addToast] = useState()//toast
    const [param, setParam] = useState(props.param)//toast
    const [paramservico, setParamservico] = useState(props.servicovalor)//toast
    const [itematualtexto,setItematualtexto] = useState('')
    const [mostramenu,setMostramenu] = useState(false)
    const [semnumero,setSemnumero] = useState(false)
    const [temitem,setTemitem] = useState(false)
    const [openmodal,setOpenmodal] = useState(false)
    const [valortotal,setValortotal] = useState(0)
    const [textoia,setTextoia] = useState('')
    const [respostatextoia,setRespostatextoia] = useState('')
    const [previewhtml,setPreviewhtml] = useState('')
    const [tipopreview,setTipoPreview] = useState('')



    const toaster = useRef(null)
    const style_placeholder = {paddingBottom:'15px'}

    useEffect(()=>{
       let data = formatDate(new Date());
       setCadastro(data)
       if( props.param != null){
           const fetchData = async () =>{
               try{
                  setLoadpage(true)
                   const requests = [
                        axios.get(`${endpoint}/cliente?listagem=S`, {
                                headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token,//dentro do env//
                                },
                        }),
                        axios.get(`${endpoint}/servicoitem?listagem=S`, {
                                headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token,//dentro do env//
                                },
                        }),
                        axios.get(`${endpoint}/proposta/${param}`, {
                                headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token,//dentro do env//
                                },
                        }),
                        axios.get(`${endpoint}/medidas?listagem=S`, {
                                headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token,//dentro do env//
                                },
                        }),
                   ]
                   const responses = await Promise.all(requests);
                   let result_cliente = responses[0]
                   let result_servico = responses[1]
                   let result_proposta = responses[2]
                   let result_medida = responses[3]
                   let array_cli = result_cliente.data.data
                   array_cli.unshift({cli_id_cli:'',cli_nome:'Selecione o Cliente'})
                   setListacliente(array_cli)
                   let array_seritem = result_servico.data.data
                   array_seritem.unshift({sei_id_sei:'',sei_descricao:'Selecione o Cliente',sei_id_ser:''})
                   setListaservicoitem(array_seritem)
                   let vet = []
                   let obj = null
                   let existe = null
                   vet.push({ser_id_ser:'',ser_descricao:'Selecione a Descricao'})
                   result_servico.data.data.map((item,index)=>{
                     existe = vet.filter((it)=>it.ser_id_ser == item.sei_id_ser)
                     console.log('tam:'+existe.length)
                     if( existe.length == 0 ){
                        obj={
                          ser_id_ser:item.sei_id_ser,
                          ser_descricao:item.sei_servico
                        }
                        vet.push(obj)
                     }
                   })
                   setListaservico(vet)
                   setListamedida(result_medida.data.data)
                   setIdproposta(result_proposta.data.data.prc_id_prc)
                   setCliente(result_proposta.data.data.prc_id_cli)
                   setDataproposta(new Date(result_proposta.data.data.prc_data_proposta_format))
                   setDatavalidade(new Date(result_proposta.data.data.prc_data_validade_format))
                   setDiasvalidade(result_proposta.data.data.prc_qtde_validade)
                   setRespostatextoia(result_proposta.data.data.prc_ia_conteudo)
                   setIdcontroleemail(result_proposta.data.data.prc_email.coe_id_coe)
                   let ck = result_proposta.data.data.prc_email.coe_email_proposta == 1 ? true : false
                   setDataenvioproposta(result_proposta.data.data.prc_email.coe_data_proposta)
                   setStatusemailproposta(ck)
                   ck = result_proposta.data.data.prc_email.coe_email_recibo == 1 ? true : false
                   setDataenviorecibo(result_proposta.data.data.prc_email.coe_data_recibo)
                   setStatusemailrecibo(ck)
                   ck = result_proposta.data.data.prc_ativa == 1 ? true : false
                   setAtivo(ck)
                   let cka = result_proposta.data.data.prc_aceita == 1 ? true : false
                   setAceite(cka)
                   let vetitens = []
                   console.log(result_proposta.data.data.prc_itens)
                   if(result_proposta.data.data.prc_itens != null){
                     let string = JSON.parse(result_proposta.data.data.prc_itens)
                     string["meta"].map((item,index)=>{
                       vetitens.push(item)
                     })
                     console.log(vetitens)
                     setListaser(vetitens)
                     //setFolder(string["meta"][0].imagem)
                   }
                   let dados = result_cliente.data.data.filter((item)=> item.cli_id_cli == result_proposta.data.data.prc_id_cli)
                   setEmail(dados[0].cli_email)
                   setNomecliente(dados[0].cli_nome)
                   setLoadpage(false)
               } catch (error) {
                  console.error("One of the requests failed", error);
               }
           }
           fetchData()

       } else {
           const fetchData = async () =>{
            try {
                   setLoadpage(true)
                   const requests = [
                            axios.get(`${endpoint}/cliente?listagem=S`, {
                                headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token,//dentro do env//
                                },
                            }),
                            axios.get(`${endpoint}/servicoitem?listagem=S`, {
                                headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token,//dentro do env//
                                },
                            }),
                   ]

                   const responses = await Promise.all(requests);
                   let result_cliente = responses[0]
                   let result_servico = responses[1]
                   let array_cli = result_cliente.data.data
                   array_cli.unshift({cli_id_cli:'',cli_nome:'Selecione o Cliente'})
                   setListacliente(array_cli)
                   let array_seritem = result_servico.data.data
                   array_seritem.unshift({sei_id_sei:'',sei_descricao:'Selecione o Cliente',sei_id_ser:''})
                   setListaservicoitem(array_seritem)
                   let vet = []
                   let obj = null
                   let existe = null
                   vet.push({ser_id_ser:'',ser_descricao:'Selecione a Descricao'})
                   result_servico.data.data.map((item,index)=>{
                     existe = vet.filter((it)=>it.ser_id_ser == item.sei_id_ser)
                     console.log('tam:'+existe.length)
                     if( existe.length == 0 ){
                        obj={
                          ser_id_ser:item.sei_id_ser,
                          ser_descricao:item.sei_servico
                        }
                        vet.push(obj)
                     }
                   })
                   setListaservico(vet)
                   setLoadpage(false)

            } catch (error) {
                console.error("One of the requests failed", error);
            }
        }
        fetchData()
       }
    },[])

 const CheckListProposta = (props) => {
    //ativa:ativo,aceita:aceita,proposta:statusemailproposta,recibo:statusemailrecibo
    console.log('dadods:'+props.dados.ativa)
    return (
            <CListGroup>
            <CListGroupItem active>Observações Proposta</CListGroupItem>
            <CListGroupItem>Aceite do Cliente:&nbsp;{props.dados.aceita ? <CBadge color="success">Sim</CBadge> : <CBadge color="danger">Não</CBadge>}</CListGroupItem>
            <CListGroupItem>Envio de Email da Proposta:&nbsp;{props.dados.proposta ? (<><CBadge color="success">Sim</CBadge>&nbsp;&nbsp;<BadgeData data={dataenvioproposta}/></>) : <CBadge color="danger">Não</CBadge>}</CListGroupItem>
            <CListGroupItem>Envio de Email do Recibo:&nbsp;{props.dados.recibo ? (<><CBadge color="success">Sim</CBadge>&nbsp;&nbsp;<BadgeData data={dataenviorecibo}/></>) : <CBadge color="danger">Não</CBadge>}</CListGroupItem>
            <CListGroupItem>Proposta Ativa:&nbsp;{props.dados.ativa ? <CBadge color="success">Sim</CBadge> : <CBadge color="danger">Não</CBadge>}</CListGroupItem>
            </CListGroup>
    )
  }

 const BadgeData = (props) => {
   const customVars = {
    '--cui-badge-color': '#721919',
    '--cui-badge-padding-x': '1rem',
   }
  return (
    <CButton size="sm" color="primary">
      em: <CBadge color="white" textColor="danger">{props.data}</CBadge>
    </CButton>
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

    const formatDateCampo = (date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const yyyy = date.getFullYear();

        const hh = String(date.getHours()).padStart(2, '0');
        const mi = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');

        return `${d}/${m}/${yyyy}`;
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

    const formatDateSemHora = (date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const yyyy = date.getFullYear();

        const hh = String(date.getHours()).padStart(2, '0');
        const mi = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');

        return `${yyyy}-${m}-${d}`;
    };

    const CompCliente = () =>{
        return(
            listacliente.map((item,index)=>{
                return(
                  <option key={index} value={item.cli_id_cli}>{item.cli_nome}</option>
                )
            })
        )
    }

    const CompServico = () =>{
        return(
            listaservico.map((item,index)=>{
                return(
                  <option key={index} value={item.ser_id_ser}>{item.ser_descricao}</option>
                )
            })
        )
    }

   const handleSubmit = (event) => {
         //event.preventDefault()
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
         }
 }

   const  handleSave = (erro) =>{
     if( erro == false && idproposta == null) {
         setLoadsave(true)
         const formData = new FormData()
         //dados cliente//
         //prc_id_prc,prc_id_cli,prc_data_proposta,prc_qtde_validade,prc_data_validade,prc_ia_conteudo,prc_valor,prc_desconto,
         //prc_valor_final,prc_ativa,prc_itens,prc_created_at,prc_updated_at,prc_deleted_at

         formData.append('prc_id_cli', cliente)
         formData.append('prc_data_proposta', formatDateSemHora(dataproposta))
         formData.append('prc_qtde_validade', diasvalidade)
         formData.append('prc_data_validade', formatDateSemHora(datavalidade))
         formData.append('prc_ia_conteudo', respostatextoia)
         formData.append('prc_valor', valortotal)
         formData.append('prc_desconto', 0)
         formData.append('prc_valor_final',valortotal)
         formData.append('prc_ativa', '1')
         let ckaceite =  aceite ? 1 : 0
         formData.append('prc_aceita', ckaceite)
         let dados = MontaJsonItens()
         formData.append('prc_itens', dados)
         axios
         .post(`${endpoint}/proposta`, formData, {
             headers: {
             Accept: 'application/json',
             'Content-Type': 'multipart/form-data',
             Authorization: 'Bearer ' + token,//dentro do env//
             },
         })
         .then((result) => {
             //setSaved(!saved)
             let valor = 'ListaProposta'
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
         formData.append('prc_id_cli', cliente)
         formData.append('prc_data_proposta', formatDateSemHora(dataproposta))
         formData.append('prc_qtde_validade', diasvalidade)
         formData.append('prc_data_validade', formatDateSemHora(datavalidade))
         formData.append('prc_ia_conteudo', respostatextoia)
         formData.append('prc_valor', valortotal)
         formData.append('prc_desconto', 0)
         formData.append('prc_valor_final',valortotal)
         let ckativo =  ativo ? 1 : 0
         formData.append('prc_ativa', ckativo)
         let ckaceite =  aceite ? 1 : 0
         formData.append('prc_aceita', ckaceite)
         let dados = MontaJsonItens()
         formData.append('prc_itens', dados)
         formData.append('_method', 'put')
         axios
          .post(`${endpoint}/proposta/${idproposta}`, formData, {
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
                 tela('ListaProposta')
             }, 2000)
         })
     }
  }


    const mudaProposta = (valor) =>{
        setDiasvalidade(valor)
        let data = addDays(dataproposta,parseInt(valor))
        let dataref = new Date(dataproposta)
        setDatavalidade(data)
        console.log('valor:'+valor)
        console.log('data:'+data)
        console.log('dataref:'+dataref)
        //setDataproposta
    }

    useEffect(()=>{
       let data = addDays(dataproposta,parseInt(diasvalidade))
       setDatavalidade(data)
    },[dataproposta,diasvalidade])

    useEffect(()=>{
        let tem  = listaser.filter((item)=>item.exclui == false)
        if(tem.length > 0){
            setTemitem(true)
            const initialValue = 0;
            const sumWithInitial = listaser.filter((item)=>item.exclui == false).reduce(
            (accumulator, currentValue) => accumulator + currentValue.valortotal,
            initialValue,
            );
            console.log(sumWithInitial)
            let valor = parseFloat(sumWithInitial).toFixed(2)
            setValortotal(valor)
        } else {
            setValor(0)
           setTemitem(false)
        }
    },[listaser])

    const NovoServico = (event) =>{
    console.log(listaser)
    let tam =  listaser.length
    let obj = null
    if(tam == 0){
      obj={
         id:1,
         idseritem:'',
         servico:'',
         servicoitem:'',
         qtde:'',
         valor:'',
         valortotal:'',
         exclui:false,
         exibe:true,
         load:false,
         loadexclui:false,
         saved:false
      }
    } else {
      let idx  = getLastIndex(listaser)
      obj={
         id:idx,
         idseritem:'',
         servico:'',
         servicoitem:'',
         qtde:'',
         valor:'',
         valortotal:'',
         exclui:false,
         exibe:true,
         load:false,
         loadexclui:false,
         saved:false
      }
    }
    setListaser(prevItems => [...prevItems, obj]);
    console.log(listaser)
 }

 const getLastIndex = (lista) =>{
     let maxvalor = 0;
     lista.map((item,index)=>{
       if(item.id >= maxvalor){
          maxvalor = item.id
       }
     })
     let indice = maxvalor + 1
     return indice
  }

  const alteraServico = (event,param,id,valor) =>{
    if(param == 'servico'){
       setListaser(prevItems =>
            prevItems.map(item =>
            item.id === id ? { ...item, idseritem: valor } : item
            )
       )
    }
    if(param == 'servicoitem'){
       let idx = event.nativeEvent.target.selectedIndex;
       let serv = event.nativeEvent.target[idx].text
       setListaser(prevItems =>
            prevItems.map(item =>
            item.id === id ? { ...item, servicoitem: valor, servico:serv } : item
            )
       )
    }
    if(param == 'qtde'){
       setListaser(prevItems =>
            prevItems.map(item =>
            item.id === id ? { ...item, qtde: valor,valortotal:valor*item.valor } : item
            )
       )
    }
    if(param == 'valor'){
       setListaser(prevItems =>
            prevItems.map(item =>
            item.id === id ? { ...item, valor: valor,valortotal:item.qtde*valor } : item
            )
       )
    }
  }

  const RemoveItem = (event,id)=>{
     setListaser(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, exclui: true } : item
        )
     )
     setEstlista(!estlista)
  }
  /*
  setListaimagens(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, imageload: true } : item
        )
    )
  */
  const CompServicoItem = (props) =>{
    let lista = listaservicoitem.filter((item,index)=>item.sei_id_ser == props.id)
    return(
        lista.map((item,index)=>{
            if(index == 0 ){
              return(
                <>
                <option value="">{'Selecione o tipo de Serviço'}</option>
                <option value={item.sei_id_sei}>{item.sei_descricao+' - '+item.sei_unidade}</option>
                </>
              )
            } else {
              return(
                <option value={item.sei_id_sei}>{item.sei_descricao+' - '+item.sei_unidade}</option>
              )
            }
        })
    )
  }

  const ValorInput = (props) => {
        const [value, setValue] = useState(props.valor)
        function calcula(val){
            setValor(val)
            //(e)=>alteraServico(e,'qtde',item.id,e.target.value)
            // let valatual = val
            // let total = parseFloat(valatual) - (parseFloat(val) * parseFloat(maxdesconto) / 100)
            // setValordesconto(total)
        }
        return (
            <>
            <CFormLabel htmlFor="exampleFormControlInput1">Preço Real(€)</CFormLabel><br/>
            <IMaskInput
                className="form-control"
                mask={Number} // Define o tipo da máscara como numérico
                scale={2} // Quantidade de casas decimais
                signed={false} // Se permite números negativos
                //thousandsSeparator="." // Separador de milhar
                padFractionalZeros={true} // Se deve preencher com zeros (ex: 1.2 -> 1.20)
                normalizeZeros={true} // Remove zeros desnecessários à esquerda
                radix="." // Separador decimal (ex: vírgula para PT-BR)
                mapToRadix={['.']} // Mapeia o ponto do teclado numérico para a vírgula
                min={0} // Valor mínimo aceito
                max={999.99} // Valor máximo aceito

                // Captura o valor aceito (pode ser unmasked ou typed)
                onAccept={(value, mask) => {
                   setValue(value)
                }}
                onBlur = {(e)=>alteraServico(e,'valor',props.id,e.target.value)}
                defaultValue={value}
                placeholder="0,00"
                required
            />
            </>
        );
    };

    const ValorTotal = (props) => {
        const [value, setValue] = useState(props.valor)
        function calcula(val){
            console.log(val)
            //setValor(val)
            //(e)=>alteraServico(e,'qtde',item.id,e.target.value)
            // let valatual = val
            // let total = parseFloat(valatual) - (parseFloat(val) * parseFloat(maxdesconto) / 100)
            // setValordesconto(total)
        }
        return (
            <>
            <CFormLabel htmlFor="exampleFormControlInput1">Preço Real(€)</CFormLabel><br/>
            <IMaskInput
                className="form-control"
                mask={Number} // Define o tipo da máscara como numérico
                scale={2} // Quantidade de casas decimais
                signed={false} // Se permite números negativos
                //thousandsSeparator="." // Separador de milhar
                padFractionalZeros={true} // Se deve preencher com zeros (ex: 1.2 -> 1.20)
                normalizeZeros={true} // Remove zeros desnecessários à esquerda
                radix="." // Separador decimal (ex: vírgula para PT-BR)
                mapToRadix={['.']} // Mapeia o ponto do teclado numérico para a vírgula
                min={0} // Valor mínimo aceito
                max={999.99} // Valor máximo aceito

                // Captura o valor aceito (pode ser unmasked ou typed)
                onAccept={(value, mask) => {
                   setValue(value)
                }}
                //onBlur = {(e)=>alteraServico(e,'valortotal',props.id,e.target.value)}
                defaultValue={value}
                placeholder="0,00"
                required
            />
            </>
        );
  };


  const CompListaServico = () =>{
    return(
       listaser.filter((item)=>item.exclui == false).map((item,index)=>{
          return(
             <CRow>
                <CCol md={2}>
                     <CFormSelect
                            id={'idServico'+index}
                                label="Serviço"
                                value={item.idseritem}
                                feedbackInvalid="O Cliente deve ser informado"
                                onChange={(e)=>alteraServico(e,'servico',item.id,e.target.value)}
                                required
                            >
                            <CompServico/>
                       </CFormSelect>
                </CCol>
                <CCol md={4}>
                     <CFormSelect
                            id="idCliente"
                                label="Descrição Servico"
                                value={item.servicoitem}
                                feedbackInvalid="O Cliente deve ser informado"
                                onChange={(e)=>alteraServico(e,'servicoitem',item.id,e.target.value)}
                                required
                            >
                            <CompServicoItem id={item.idseritem}/>
                       </CFormSelect>
                </CCol>
                <CCol md={1}>
                     <CFormInput
                        type="number"
                        min="0"
                        id="IdDiasValidade"
                        label="Qtde"
                        value={item.qtde}
                        onChange={(e)=>alteraServico(e,'qtde',item.id,e.target.value)}
                        feedbackInvalid="O Tempo de Validade deve ser informado"
                        required
                    />
                </CCol>
                <CCol md={2}>
                    <ValorInput id={item.id} valor={item.valor}/>
                </CCol>
                <CCol md={2}>
                    <ValorTotal id={item.id} valor={item.valortotal}/>
                </CCol>
                <CCol style={{marginTop:'36px'}}>
                    <div  onClick={(e)=>RemoveItem(e,item.id)} style={{float:'left',color:'red',cursor:'pointer'}} class="circle_red text-orange">
                       <FontAwesomeIcon size="sm" icon={faTrash}/>
                    </div>
                </CCol>
             </CRow>
          )
       })
    )
  }

  const GeraTexto = () =>{

    let tam  =  listaser.filter((item)=>item.exclui == false)
    if(tam.length == 0){
        addToast(CompToast('É necessário ter itens de serviço na Proposta!!!', 'danger')) //--> usa toast
        setTimeout(() => {
                 document.getElementById('idtoast').classList.remove('show')
                 document.getElementById('idtoast').remove()
        }, 2000)
        return
    }

    /*
    Antes de gerar ou modificar qualquer layout HTML, consulte o documento salvo na Library do ChatGPT:
    Documento de referência: Referencia_montagem_de_layouts.md
    Modelo HTML: template_layout_orcamento.html
    */
    let textofixo = 'Antes de gerar ou modificar qualquer layout HTML, consulte o documento salvo na Library do ChatGPT:'+'\n'
        textofixo += 'Documento de referência: Referencia_montagem_de_layouts.md'+'\n'
        textofixo += 'Modelo HTML: template_layout_orcamento.html'+'\n'
        textofixo += 'Identidade visual:'+'\n'
        textofixo +='Laranja #FF5F1F, preto #171717, branco e cinza.'+'\n'
        textofixo +='\n'
        textofixo +='Código HTML:'+'\n'
        textofixo +='Compatível com PHPMailer e Gmail, tabelas simples e CSS inline.'+'\n'
        textofixo +='\n'
        textofixo +='Idioma:'+'\n'
        textofixo +='Conteúdo comercial em holandês.'+'\n'
        textofixo +='\n'
        textofixo +='Estrutura:'+'\n'
        textofixo +='Manter seu header e footer existentes e gerar apenas a linha central <tr> quando solicitado.'
        textofixo +='\n'
        textofixo +='Dados Proposta:'+'\n'
        textofixo +='Cliente: '+nomecliente+'\n'
        textofixo +='Data da proposta: '+formatDateCampo(dataproposta)+'\n'
        textofixo +='Data de validade até: '+formatDateCampo(datavalidade)+'\n'
        textofixo +='\n'
        textofixo +='Itens:'+'\n'
        listaser.filter((item)=>item.exclui == false).map((item,index)=>{
            textofixo +='\n'
            textofixo +='Servico: ' + item.servico +' Qdte: '+ item.qtde +' Valor Unitário :'+ item.valor+' Valor Total :'+ item.valortotal
        })
        textofixo +='\n'
        textofixo +='Obs: O Campo totalizador geral não deve aceitar quebra de texto interno'+'\n'
        textofixo +='A cor do cabeçalho das colunas e o do total geral deve ser #FF5F1F'+'\n'
        textofixo +='Usar o formato monetário holandês/europeu, como € 865,00.'+'\n'
        textofixo +='A background do rodape totalizador deve ser preto #171717 e fonte na cor #FF5F1F'+'\n'
        textofixo +='Traduzir as medidas para holandes levando em considerção a tabela de conversão abaixo:'+'\n'
        listamedida.map((item,index)=>{
           textofixo +='Medida: ' + item.unm_sigla +' - Sigla: '+ item.unm_descricao +'\n'
        })
        textofixo +='Gere o código HTML completo da parte solicitada, pronto para ser incorporado à aplicação PHP/PHPMailer.'+'\n'
    setTextoia(textofixo)
    setCollapsetexto(true)
  }

  const mudaCliente = (event) =>{
     setCliente(event.target.value)
     let idx = event.nativeEvent.target.selectedIndex;
     let texto = event.nativeEvent.target[idx].text
     setNomecliente(texto)
     let dados = listacliente.filter((item)=> item.cli_id_cli == event.target.value)
     setEmail(dados[0].cli_email)
     console.log(dados)
  }

  const MontaJsonItens = () =>{
    let arrayitens = []
    let objfinal = null
    arrayitens = []

    listaser.filter((item)=>item.exclui == false).map((item,index)=>{
      arrayitens.push(item)
    })

    //arrayitens.push(dados)
    objfinal = {
        "meta":arrayitens
    }
    return JSON.stringify(objfinal)
  }

  const handleClick = (event,valor) =>{
     event.preventDefault();
     tela(valor)
  }

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

  async function writeClipboardText() {
    var text = document.getElementById('idcopiaproposta').value;
    if (navigator.clipboard && window.isSecureContext) {
        var copyText = document.getElementById('idvalor');
        // Standard modern Clipboard API
        await navigator.clipboard.writeText(text);
    } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = text;
        // Prevent scrolling to bottom
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          addToast(CompToast('Texto Copiado Com sucesso!!!', 'info')) //--> usa toast
          setTimeout(() => {
                 document.getElementById('idtoast').classList.remove('show')
                 document.getElementById('idtoast').remove()
          }, 2000)
        //   setShowAlert(true)
        //   document.execCommand('copy');
        //   setTimeout(() => {
        //      setShowAlert(false)
        //   }, 2000);
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    }
  }

  async function writeClipboardIA() {
    var text = document.getElementById('idcopiaia').value;
    if (navigator.clipboard && window.isSecureContext) {
        var copyText = document.getElementById('idvalor');
        // Standard modern Clipboard API
        await navigator.clipboard.writeText(text);
    } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = text;
        // Prevent scrolling to bottom
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          addToast(CompToast('Texto Copiado Com sucesso!!!', 'info')) //--> usa toast
          setTimeout(() => {
                 document.getElementById('idtoast').classList.remove('show')
                 document.getElementById('idtoast').remove()
          }, 2000)
        //   setShowAlert(true)
        //   document.execCommand('copy');
        //   setTimeout(() => {
        //      setShowAlert(false)
        //   }, 2000);
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    }
  }

  const enviaEmail = () =>{
        setLoademail(true)
        const formData = new FormData()
        //dados cliente//
        formData.append('proposta', idproposta)
        formData.append('email', email)
        formData.append('nome', nomecliente)
        formData.append('controleemail', idcontroleemail)
        formData.append('escopo', 'proposta')
        axios
        .post(`${endpoint}/email`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setLoademail(false)
            addToast(CompToast('Email Enviado com sucesso !!!', 'success')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                //tela('ListaClientes')
            }, 2000)
        })
  }

  const Preview = (valor,func) =>{
        let inter = null
        if(valor == 'preview'){
           inter = 'preview'
           setTipoPreview('preview')
        }
        if(valor == 'recibo'){
           inter = 'previewrecibo'
           setTipoPreview('previewrecibo')
        }
        func(true)
        axios.get(`${endpoint}/proposta?${inter}=S&proposta=${idproposta}`, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            func(false)
            setPreviewhtml(result.data.data)
            addToast(CompToast('Preview  Carregado com sucesso !!!', 'success')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                setOpenmodal(true)
            }, 2000)
        })
  }

    return(
       <section id="section-cliente" style={{marginTop:'180px'}} class="container py-4 py-md-5">
        <ModalPreview
           token={token}
           open={openmodal}
           html={previewhtml}
           muda={setOpenmodal}
           dados={{proposta:idproposta,email:email,nome:nomecliente,controle:idcontroleemail,tipo:tipopreview}}
        />
        <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
        <CabecalhoCadastro
           titulo="Geração de Proposta"
           texto="Relização de Propostas para Clientes"
        />
        <CForm className="row g-3 needs-validation form-card p-3 p-md-4" noValidate  id="form-cliente" onSubmit={handleSubmit} validated={validated}>
            <section class="mb-1">
                    <h2 class="section-title">
                        <div style={{overflow:'auto'}}>
                            <div style={{float:'left'}} class="circle text-orange">01</div>
                            <div style={{marginTop:'4px',paddingLeft:'4px',float:'left'}}>Definir o Cliente</div>
                        </div>
                    </h2>
                    <div class="row g-3">
                         <CCol md={6}>
                            { loadpage
                            ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                            : (
                                <CFormSelect
                                    id="idCliente"
                                    label="Nome do Cliente"
                                    value={cliente}
                                    feedbackInvalid="O Cliente deve ser informado"
                                    onChange={(e)=>mudaCliente(e)}
                                    required
                                >
                                <CompCliente/>
                                </CFormSelect>)}
                        </CCol>
                        <CCol md={6}>
                            { loadpage
                            ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                            : (
                                 <CFormInput
                                type="text"
                                id="IdEmail"
                                label="Dias de Validade"
                                value={email}
                                //onChange={(e)=>setEmail(e.target.value)}
                                feedbackInvalid="O Tempo de Validade deve ser informado"
                                readOnly
                                required
                            />)}
                        </CCol>
                        <CCol md={3}>
                            { loadpage
                            ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                            : (
                            <>
                            <CFormLabel htmlFor="exampleFormControlInput1">Data da Proposta</CFormLabel><br/>
                            <DatePicker
                                showYearDropdown
                                showMonthDropdown
                                peekNextMonth
                                dropdownMode="select"
                                locale="nl"
                                dateFormat="dd/MM/yyyy HH:mm"
                                showIcon
                                selected={dataproposta}
                                //selected={new Date("1993/09/28")}
                                //openToDate={new Date("1993/09/28")}
                                calendarClassName="form-control"
                                onChange={(date) => setDataproposta(date)}
                            />
                            { validated && startDate == null ?
                                (<div style={{color:'red',fontSize:'14px'}} id="data-addon1">A Data da Proposta deve ser prenchida </div>)
                                : (<></>)}

                            </>
                            )}
                        </CCol>
                        <CCol md={2}>
                            { loadpage
                            ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                            : (
                            <CFormInput
                                type="number"
                                min="0"
                                id="IdDiasValidade"
                                label="Dias de Validade"
                                value={diasvalidade}
                                onChange={(e)=>setDiasvalidade(e.target.value)}
                                feedbackInvalid="O Tempo de Validade deve ser informado"
                                required
                            />)}
                        </CCol>
                        <CCol md={3}>
                            { loadpage
                            ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                            : (
                            <>
                            <CFormLabel htmlFor="exampleFormControlInput1">Data de Validade</CFormLabel><br/>
                            <DatePicker
                                showYearDropdown
                                showMonthDropdown
                                peekNextMonth
                                dropdownMode="select"
                                locale="ptBR"
                                dateFormat="dd/MM/yyyy"
                                showIcon
                                selected={datavalidade}
                                //selected={new Date("1993/09/28")}
                                //openToDate={new Date("1993/09/28")}
                                calendarClassName="form-control"
                                onChange={(date) => setDatavalidade(date)}
                                readOnly
                            />
                            { validated && startDate == null ?
                                (<div style={{color:'red',fontSize:'14px'}} id="data-addon1">A Data da Proposta deve ser prenchida </div>)
                                : (<></>)}

                            </>
                            )}
                        </CCol>
                        <CCol md={4} xs={4} style={{maxWidth:'400px',marginLeft:'6px'}}>
                            { loadpage
                            ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={4} size="lg"/></div>)
                            : (
                            <>
                            <div style={{display:'flex',gap:'5px'}}>
                            <div style={{flex:'1'}}>
                                <CFormLabel htmlFor="exampleFormControlInput1">Status</CFormLabel><br/>
                                <CFormCheck
                                    type="checkbox"
                                    id="invalidCheck"
                                    label="Proposta Ativa"
                                    feedbackInvalid="Informe se Acolhido esta Ativo"
                                    checked={ativo}
                                    onChange={(e)=>setAtivo(e.target.checked)}
                                />
                                <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                            </div>
                            <div style={{flex:'1',marginTop:'30px',marginLeft:'5px'}}>{ ativo ? <CBadge color="success">Ativa</CBadge> : <CBadge color="danger">Suspensa</CBadge>}</div>
                            </div>
                            </>)}
                        </CCol>
                        <CCol md={4} xs={12} style={{marginLeft:'6px'}}>
                            { loadpage
                            ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={4} size="lg"/></div>)
                            : (
                            <>
                            <div style={{display:'flex',gap:'5px'}}>
                            <div style={{flex:'1'}}>
                                <CFormLabel htmlFor="exampleFormControlInput1">Status</CFormLabel><br/>
                                <CFormCheck
                                    type="checkbox"
                                    id="invalidCheck"
                                    label="Situação da Proposta"
                                    feedbackInvalid="Informe se Acolhido esta Ativo"
                                    checked={aceite}
                                    onChange={(e)=>setAceite(e.target.checked)}
                                    readOnly
                                />
                                <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                            </div>
                            <div style={{flex:'1',marginTop:'30px',marginLeft:'5px'}}>{ aceite ? <CBadge color="success">Proposta Aceita</CBadge> : <CBadge color="danger">Aguardando Aceite do Cliente</CBadge>}</div>
                            </div>
                            </>)}
                        </CCol>
                        <CCol md={4} xs={12} style={{maxWidth:'400px',marginLeft:'6px'}}>
                            { aceite ? <CFormInput
                                    type="texto"
                                    min="0"
                                    id="dDataAceite"
                                    label="Data do Aceite"
                                    value={formatDateCampo(new Date())}
                                    feedbackInvalid="O Tempo de Validade deve ser informado"
                                    required
                            /> : <></>}
                        </CCol>
                        <CCol md={4} xs={12}>
                            { loadpage
                            ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                            : (<CheckListProposta dados={{ativa:ativo,aceita:aceite,proposta:statusemailproposta,recibo:statusemailrecibo}}/>)}
                        </CCol>
                    </div>
            </section>
            <section class="mb-1">
                   <h2 class="section-title">
                        <div style={{overflow:'auto'}}>
                            <div style={{float:'left'}} class="circle text-orange">02</div>
                            <div style={{marginTop:'4px',paddingLeft:'4px',paddingRight:'4px',float:'left'}}>Itens do Serviço</div>
                            <div onClick={(e)=>NovoServico(e)}style={{marginTop:'2px',float:'left',cursor:'pointer',fontWeight:'bold'}} class="circle text-orange">+</div>
                        </div>
                   </h2>
                   <div class="row g-3">
                      <CompListaServico est={estlista}/>
                      {
                         temitem ?
                         (
                           <>
                           <CRow className='mt-3'>
                           <CCol md='9'></CCol>
                           <CCol md='2'>
                                <CFormInput
                                        type="text"
                                        min="0"
                                        id="IdTotal"
                                        label="Total(€)"
                                        className="form-control"
                                        value={valortotal}
                                        //onChange={(e)=>setDiasvalidade(e.target.value)}
                                        feedbackInvalid="O Tempo de Validade deve ser informado"
                                        required
                                />
                           </CCol>
                           </CRow>
                           </>
                         ) : <></>
                       }
                   </div>
            </section>
            <section class="mb-1">
                   <h2 class="section-title">
                        <div style={{display:'flex',gap: '5px'}}>
                            <div style={{float:'left'}} class="circle text-orange">03</div>
                            <div style={{marginTop:'4px',paddingLeft:'4px',paddingRight:'4px',float:'left'}}>Envio de Texto Para O ChatGPT</div>
                            <div onClick={()=>GeraTexto()} style={{marginTop:'0px',float:'left',cursor:'pointer',fontWeight:'bold'}} class="circle text-orange">+</div>
                            <div onClick={()=>setCollapsetexto(!collapsetexto)} style={{marginTop:'0px',float:'left',cursor:'pointer',fontWeight:'bold'}} class="circle_gray text-orange">
                                { collapsetexto ? <FontAwesomeIcon size="sm" icon={faArrowUp} /> : <FontAwesomeIcon size="sm" icon={faArrowDown} />}
                            </div>
                        </div>
                   </h2>
                   <CCollapse className="mt-2" visible={collapsetexto}>
                   <div class="row g-3">
                       <CRow>
                          <CCol md='12'>
                             <CFormTextarea
                                id="idcopiaproposta"
                                rows={15}
                                value={textoia}
                             />
                           </CCol>

                        </CRow>
                        <CRow className='mt-2'>
                           <CCol md={10}>
                           </CCol>
                           <CCol style={{display:'flex',justifyContent:'flex-end'}} md={2}>
                              &nbsp;<CButton onClick={(e)=>writeClipboardText(e)} color="primary">Copiar Texto&nbsp;<FontAwesomeIcon size="lg" icon={faCopy} /></CButton>
                           </CCol>
                       </CRow>
                    </div>
                    </CCollapse>
            </section>
            <section class="mb-1">
                   <h2 class="section-title">
                        <div style={{overflow:'auto'}}>
                            <div style={{float:'left'}} class="circle text-orange">04</div>
                            <div style={{marginTop:'4px',paddingLeft:'4px',paddingRight:'4px',float:'left'}}>Colar Conteúdo gerado pelo ChatGPT</div>
                            <div onClick={()=>setCollapseia(!collapseia)} style={{marginTop:'0px',float:'left',cursor:'pointer',fontWeight:'bold'}} class="circle_gray text-orange">
                                { collapseia ? <FontAwesomeIcon size="sm" icon={faArrowUp} /> : <FontAwesomeIcon size="sm" icon={faArrowDown} />}
                            </div>
                            {/* <div onClick={()=>GeraTexto()} style={{marginTop:'0px',float:'left',cursor:'pointer',fontWeight:'bold'}} class="text-orange">&nbsp;<CButton color="primary">Copiar Texto&nbsp;<FontAwesomeIcon size="lg" icon={faCopy} /></CButton></div> */}
                        </div>
                   </h2>
                   <CCollapse className="mt-2" visible={collapseia}>
                   <div class="row g-3">
                       <CRow>
                          <CCol md='12'>
                             <CFormTextarea
                                id="idcopiaia"
                                rows={10}
                                value={respostatextoia}
                                onChange={(e)=>setRespostatextoia(e.target.value)}
                                feedbackInvalid="O Texto gerado pelo ChatGPT deve ser informado"
                                required
                             />
                           </CCol>
                        </CRow>
                        <CRow className='mt-2'>
                           <CCol md={8}>
                           </CCol>
                           <CCol style={{display:'flex',justifyContent:'flex-end'}} md={4}>
                              &nbsp;<CButton onClick={()=>setRespostatextoia('')} color="danger">Limpar&nbsp;<FontAwesomeIcon size="lg" icon={faEraser} /></CButton>
                              &nbsp;<CButton onClick={(e)=>writeClipboardIA(e)} color="primary">Copiar Texto&nbsp;<FontAwesomeIcon size="lg" icon={faCopy} /></CButton>
                           </CCol>
                       </CRow>
                    </div>
                  </CCollapse>
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
                <CButton className="btn-lista"  color="dark" type="button" onClick={(e)=>handleClick(e,'ListaProposta')}>
                        Listar&nbsp;<FontAwesomeIcon size="lg" icon={faList} />
                </CButton>

                {
                 idproposta != null ?
                (<>
                {' '}
                <CButton className="btn-lista"  color="info" type="button" onClick={(e)=>enviaEmail(e)}>
                     Enviar Email Proposta&nbsp;<FontAwesomeIcon size="lg" icon={faEnvelope} />
                     {' '}
                     {loademail? <CSpinner size="sm" /> : ''}
                </CButton>
                {' '}
                <CButton className="btn-lista"  color="warning" type="button" onClick={()=>Preview('preview',setLoadpreview)}>
                    Preview Proposta &nbsp;<FontAwesomeIcon size="lg" icon={faMagnifyingGlass} />
                    {' '}
                    {loadpreview? <CSpinner size="sm" /> : ''}
                </CButton>
                {' '}
                <CButton className="btn-lista"  color="secondary" type="button" onClick={()=>Preview('recibo',setLoadrecibo)}>
                    Recibo&nbsp;<FontAwesomeIcon size="lg" icon={faFileInvoice} />
                    {' '}
                    {loadrecibo? <CSpinner size="sm" /> : ''}
                </CButton>
                </>
                )
                :(<></>)}

            </div>

            <p class="small text-secondary mt-3 mb-0">
                * Campos obrigatórios.
            </p>
        </CForm>
        <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
       </section>
    )
}

export default Proposta
