import { React,useEffect,useState,useRef   } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton, CTable,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell,
    CTableHead,CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,CPagination,CPaginationItem,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,CRow,
  CBadge,CChipInput,CCollapse,CFormTextarea   } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson, faSave, faTrash, faEdit, faList,faArrowDown,faCopy,faArrowUp,faCircleXmark,faMagnifyingGlassPlus,faMagnifyingGlassMinus  } from '@fortawesome/free-solid-svg-icons';
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
const Profissional = (props) => {

  const { tela } = props
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  console.log(token)
  const [validated, setValidated] = useState(false)
  const [loadpage, setLoadpage] = useState(false)
  const [loadsave, setLoadsave] = useState(false)
  const [idservico, setIdservico] = useState(null)
  const [idprofissional, setIdprofissional] = useState(null)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [tipotelefone, setTipotelefone] = useState('')
  const [telefone, setTelefone] = useState('')
  const [habilidade, setHabilidade] = useState(['Agilidade','Compromisso','Responsabilidade','Ética'])
  const [descricao, setDescricao] = useState('')
  const [cadastro, setCadastro] = useState('')
  const [servico, setServico] = useState([])
  const [servicofolder, setServicofolder] = useState('')
  const [listaservico, setListaservico] = useState([])
  const [saved,setSaved] = useState(false)
  const [toast, addToast] = useState()//toast
  const [param, setParam] = useState(props.param)//toast
  const [textoia,setTextoia] = useState('')
  const [collapsetexto,setCollapsetexto] = useState(false)
  const toaster = useRef(null)
  const [loadsaveimage, setLoadsaveimage] = useState(false)
  const [folder,setFolder] =  useState(null)//toast
  const [imagefolder,setImagefolder] =  useState(null)//toast
  const style_imagem_plus = {width:'110%',zIndex:'20'}
  const style_imagem_minus = {width:'30%',zIndex:'20'}
  const [tamimagem,setTamimagem] = useState(style_imagem_minus)
  const [iconimagem,setIconimagem] = useState(faMagnifyingGlassPlus)
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
                    axios.get(`${endpoint}/profissional/${param}`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                    axios.get(`${endpoint}/servico?listagem=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                ]

                const responses = await Promise.all(requests);
                let result_pro = responses[0]
                let result_ser = responses[1]
                let array_ser = result_ser.data.data
                //array_ser.unshift({ser_id_ser:'',ser_descricao:'Selecione o Tipo de Servico'})
                setListaservico(array_ser)
                setIdprofissional(result_pro.data.data.pro_id_pro)
                setNome(result_pro.data.data.pro_nome)
                setEmail(result_pro.data.data.pro_email)
                setTipotelefone(result_pro.data.data.pro_tipo_telefone)
                setTelefone(result_pro.data.data.pro_telefone)
                setServico(result_pro.data.data.pro_habilidades)
                setServicofolder(result_pro.data.data.pro_servico)
                setFolder(result_pro.data.data.pro_imagem)
                //setListaservico()
                //setIdservico(result_servico.data.data.ser_id_ser)
                //setDescricao(result_servico.data.data.ser_descricao)
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
                    axios.get(`${endpoint}/servico?listagem=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                ]

                const responses = await Promise.all(requests);
                let result_servico = responses[0]
                let array_ser = result_servico.data.data
                //array_ser.unshift({ser_id_ser:'',ser_descricao:'Selecione o Tipo de Servico'})
                setListaservico(array_ser)
                // setIdservico(result_servico.data.data.ser_id_ser)
                // setDescricao(result_servico.data.data.ser_descricao)
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

    if( erro == false && idprofissional == null) {
        setLoadsave(false)
        const formData = new FormData()
        //pro_id_pro,pro_nome,pro_email,pro_tipo_telefone,pro_telefone,pro_habilidades,pro_imagem,pro_created_at,pro_updated_at,pro_deleted_at
        formData.append('pro_nome', nome)
        formData.append('pro_email', email)
        formData.append('pro_tipo_telefone', tipotelefone)
        formData.append('pro_telefone', telefone)
        formData.append('pro_habilidades', servico)
        axios
        .post(`${endpoint}/profissional`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            //setSaved(!saved)
            let valor = 'ListaProfissionais'
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
        formData.append('pro_nome', nome)
        formData.append('pro_email', email)
        formData.append('pro_tipo_telefone', tipotelefone)
        formData.append('pro_telefone', telefone)
        formData.append('pro_habilidades', servico)
        formData.append('_method', 'put')
        axios
         .post(`${endpoint}/profissional/${idprofissional}`, formData, {
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
                tela('ListaProfissionais')
            }, 2000)
        })
    }
 }

 const ImagemFolder = () =>{
         return (
              <CRow className='mt-3'>
                <CCol md={8}>
                   <CFormLabel htmlFor="exampleFormControlInput1">Imagem do Colaborador</CFormLabel><br/>
                   <CInputGroup className="mb-3">
                        <CFormInput
                            type="file"
                            id="inputGroupFile02"
                            onChange={(e)=>onImageChange(e)}
                        />
                        {
                          idprofissional != null ?
                          (<CInputGroupText as="label" style={{cursor:'pointer'}} htmlFor="inputGroupFile02" onClick={(e)=>SalvarImagem(e)}>
                              Upload&nbsp;{loadsaveimage? <CSpinner size="sm" /> : ''}
                          </CInputGroupText>)
                          :(<></>)
                        }
                    </CInputGroup>
                    <div className="text-start" style={{display:'flex',gap:'5px',paddingBottom:'1px'}}>
                       <FontAwesomeIcon size="lg" style={{color:'red',cursor:'pointer'}} icon={faCircleXmark} onClick={(e)=>onRemoveAnexo(e)}/>
                       {folder && <p>Arquivo Selecionado: <CBadge color="primary">{folder}</CBadge></p>}
                    </div>
                </CCol>
                { folder != null ?
                (<CCol md={4} className='mt-3 mb-3'>
                   <div className="containerimg  d-flex justify-content-center align-items-center">
                       <img style={tamimagem} data-aos="zoom-in" src={imagem + folder}/>
                   </div>
                   <div style={{position:'relative',top:'-105px',display:'flex',justifyContent:'center',alignItems:'center',zIndex:'21'}}>
                      <FontAwesomeIcon size="lg" style={{color:'blue',cursor:'pointer'}} icon={iconimagem} onClick={(e)=>expande(e)}/>
                   </div>
                </CCol>)
                :('')}
              </CRow>
         )
  }

  const expande = (event) =>{
      if(iconimagem === faMagnifyingGlassPlus){
         setTamimagem(style_imagem_plus)
         setIconimagem(faMagnifyingGlassMinus)
      } else {
        setTamimagem(style_imagem_minus)
        setIconimagem(faMagnifyingGlassPlus)
      }
   }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
        setFolder(event.target.files[0].name)
        setImagefolder(event.target.files[0])
    }
  }

  const onRemoveAnexo = (event,id) => {
     setFolder(null)
     setImagefolder(null)
  }

 const handleClick = (event,valor) =>{
     event.preventDefault();
     tela(valor)
 }

 const SalvarImagem = (event) =>{
         setLoadsaveimage(true)
         event.preventDefault()
         event.stopPropagation()
         const formData = new FormData()
         formData.append('file', imagefolder)
         formData.append('has_image', true)
         formData.append('pro_id_pro', idprofissional)
         if(imagefolder == null){
                 addToast(CompToast('Nenhuma Imagem foi Selecionada', 'danger')) //--> usa toast
                 setTimeout(() => {
                     document.getElementById('idtoast').classList.remove('show')
                     document.getElementById('idtoast').remove()
                     setLoadsaveimage(false)
                 }, 2000)
                 return
         }
         formData.append('_method', 'put')
         axios.post(`${endpoint}/profissional/${idprofissional}`, formData, {
             headers: {
             Accept: 'application/json',
             'Content-Type': 'multipart/form-data',
             Authorization: 'Bearer ' + token,//dentro do env//
             },
         })
         .then((result) => {
             setLoadsaveimage(false)
             //setImagesaved(true)
             addToast(CompToast('Imagem Atualizada com sucesso !!!', 'success')) //--> usa toast
             //setIdeventoitem(result.data.enventoitemid)
             setTimeout(() => {
                 document.getElementById('idtoast').classList.remove('show')
                 document.getElementById('idtoast').remove()
                 //setEstimg(!estimg)
             }, 2000)
             //setListacidade(result.data.data)
         });

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

 const CompTipoTelefone = () =>{
     return(
        <>
          <option value="">Selecione o Tipo</option>
          <option value="C">Celular</option>
          <option value="F">Fixo</option>
       </>
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

const ChipCompetencia = (props) =>{
   const [value, setValue] = useState(props.valor);

    function Muda(valor){
      setValue(valor)
      setHabilidade(valor)
      console.log(habilidade)
    }

    return(
        <CChipInput
            className="chip-input"
            value={value}
            onChange={(value)=>Muda(value)}
             chipClassName={(() => {
                const variants = [
                'chip-primary', // índice 0: Feature
                'chip-danger',  // índice 1: Blocking
                'chip-success', // índice 2: Approved
                'chip-warning', // índice 2: Approved
                'chip-secondary', // índice 2: Approved
                'chip-info',
                'chip-light', // índice 2: Approved
                'chip-dark'
                ];

                let index = 0;

                return () => {
                   const className = variants[index % variants.length];
                   index++;
                   return className;
                };
            })()}
            placeholder="Type and press Enter"
       />
    )
}

const MultipleSelect = () => {
  const [selected, setSelected] = useState([]);

  return (
    <CFormSelect
      id="idServico"
      label="Serviços"
      multiple
      value={selected}
      onChange={(event) => {
        const values = Array.from(
          event.target.selectedOptions,
          (option) => option.value
        );

        setSelected(values);
        console.log('Selecionados:', values);
      }}
      options={[
        { label: 'Feature', value: 'feature' },
        { label: 'Blocking', value: 'blocking' },
        { label: 'Approved', value: 'approved' },
      ]}
    //   size="lg"
    />
  );
};

const CompSer = (props) =>{
    console.log(props.valor)
    const [selected, setSelected] = useState(props.valor);

    function muda(event){
       setSelected(
         Array.from(
            event.target.selectedOptions,
            (option) => option.value
          )
       );
       setServico(
         Array.from(
            event.target.selectedOptions,
            (option) => option.value
          )
       )
    }

    return(
     <CFormSelect
    id="idServico"
    className="form-select-multiple"
    label="Serviços"
    multiple
    value={selected}
    onChange={(event) => muda(event)}
    required
  >
    <CompServico />
  </CFormSelect>)
 }
const GeraTexto = () =>{
    // let tam  =  listaser.filter((item)=>item.exclui == false)
    // if(tam.length == 0){
    //     addToast(CompToast('É necessário ter itens de serviço na Proposta!!!', 'danger')) //--> usa toast
    //     setTimeout(() => {
    //              document.getElementById('idtoast').classList.remove('show')
    //              document.getElementById('idtoast').remove()
    //     }, 2000)
    //     return
    // }

    let
        textofixo = 'Identidade visual:'+'\n'
        textofixo +='Laranja #FF5F1F, preto #171717, branco e cinza.'+'\n'
        textofixo +='\n'
        textofixo +='Idioma:'+'\n'
        textofixo +='Conteúdo comercial em holandês.'+'\n'
        textofixo +='\n'
        textofixo +='Estrutura:'+'\n'
        textofixo +='Manter seu header e footer existentes e gerar apenas a linha central <tr> quando solicitado.'
        textofixo +='\n'
        textofixo +='Dados Profissional:'+'\n'
        textofixo +='Sobre:'+habilidade+'\n'
        textofixo +='Habilidades:'+servicofolder+'\n'
        textofixo +='Nome: '+nome+'\n'
        textofixo +='\n'
        textofixo +='Lema da Empresa:'+'\n'
        textofixo +='“Nosso trabalho é construído com colaboração, respeito e compromisso com os resultados.”'
        textofixo +='\n'
        textofixo +='Produzir o conteúdo em holandês, com linguagem profissional e fácil interpretação.'+'\n'
        textofixo +='Manter no rodapé o contato de Luiz Roberto: WhatsApp +31 6 14567186.'+'\n'
        textofixo +='Priorizar boa legibilidade em smartphones e compartilhamento pelo WhatsApp.'+'\n'
        textofixo +='Não alterar o padrão visual aprovado sem solicitação expressa.'+'\n'
        textofixo +='Dimensões finais: 800 × 1200 pixels.'
        textofixo +='Formato: PNG. Manter a proporção vertical de 2:3.'
        textofixo +='Ajustar figuras de acordo as habilidades.'+'\n'
        textofixo +='Anexarei a fotografia do profissional e suas informações.'+'\n'
        textofixo +='Quando possível, também anexarei o folder de referência para reproduzir melhor o layout.'
    setTextoia(textofixo)
    setCollapsetexto(true)
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

 return(
        <section  data-aos="zoom-in" id="section-tipocliente" style={{marginTop:'180px'}} class="container py-4 py-md-5">
        <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
        <CabecalhoCadastro
           titulo="Cadastro de Profissionais"
           texto="Informe o Profissional"
        />

        {/* <form id="form-tipocliente" class="form-card p-3 p-md-4"> */}
        <CForm className="row g-3 needs-validation form-card p-3 p-md-4" noValidate  id="form-acolhido" onSubmit={handleSubmit} validated={validated}>

            {/* <!-- DADOS PESSOAIS --> */}
            <section class="mb-4">

                <h2 class="section-title">
                    <div style={{overflow:'auto'}}>
                        <div style={{float:'left'}} class="circle text-orange">01</div>
                        <div style={{marginTop:'4px',paddingLeft:'4px',float:'left'}}>Dados do profissional</div>
                    </div>
                </h2>

                <div class="row g-3">

                    <CCol md={6}>
                        { loadpage
                            ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                            : (<CFormInput
                                id="idnome"
                                label="Nome do Profissional"
                                placeholder="Digite a nome"
                                aria-label="Example text with button addon"
                                aria-describedby="button-addon1"
                                defaultValue={nome}
                                feedbackInvalid="O Nome do Profissional precisa ser preenchido"
                                required
                                onChange={(e)=>setNome(e.target.value)}
                        />)}
                    </CCol>
                    <CCol md={6}>
                        { loadpage
                            ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                            : (<CFormInput
                                id="idemai"
                                label="Email"
                                placeholder="Digite  Email"
                                aria-label="Example text with button addon"
                                aria-describedby="button-addon1"
                                defaultValue={email}
                                feedbackInvalid="O Email precisa ser preenchida"
                                required
                                onChange={(e)=>setEmail(e.target.value)}
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
                            </CFormSelect>
                           )}
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
                        // <CFormSelect
                        //     id="idServico"
                        //     label="Serviço"
                        //     value={servico}
                        //     feedbackInvalid="O Serviço deve ser informado"
                        //     onChange={(e)=>setServico(e.target.value)}
                        //     multiple
                        //     required
                        // >
                        // <CompServico/>
                        // </CFormSelect>
                        // <MultipleSelect/>
                        <CompSer valor={servico}/>

                       )}
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
                        <div style={{float:'left'}} class="circle text-orange">03</div>
                        <div style={{marginTop:'4px',paddingLeft:'4px',float:'left'}}>Folder Profissional</div>
                    </div>
                </h2>

                <div class="row g-3">
                    <CCol md={12}>
                        <ImagemFolder/>
                    </CCol>
                </div>
            </section>
            <section class="mb-4">

                <h2 class="section-title">
                    <div style={{overflow:'auto'}}>
                        <div style={{float:'left'}} class="circle text-orange">03</div>
                        <div style={{marginTop:'4px',paddingLeft:'4px',float:'left'}}>Dados do Folder</div>
                    </div>
                </h2>

                <div class="row g-3">
                    <CCol md={12}>
                        { loadpage
                        ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                        : (
                           <>
                           <CFormLabel htmlFor="exampleForm">Habilidades</CFormLabel>
                           <ChipCompetencia valor={habilidade}/>
                           </>
                          )}
                    </CCol>
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
                <CButton className="btn-lista"  color="dark" type="button" onClick={(e)=>handleClick(e,'ListaProfissionais')}>
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

export default Profissional
