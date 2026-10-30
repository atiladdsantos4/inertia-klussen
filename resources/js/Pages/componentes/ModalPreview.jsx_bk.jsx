import React, { useState,useEffect } from 'react'
import { CBadge, CAlert,CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CSpinner, CFormCheck,CCollapse } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faFolderOpen, faSave, faTrash, faEdit, faList, faEraser, faCopy, faEnvelope,faArrowDown,faArrowUp} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";


export const ModalPreview = (props) => {
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const { html,open,muda,dados,token } = props
  const [visible, setVisible] = useState(false)
  const [elemento, setElemento] = useState(false)
  const [loadsave, setLoadsave] = useState(false)
  const [showalert, setShowalert] = useState(false)
  const [ativo,setAtivo] = useState(false)
  const [proposta, setProposta] = useState('')
  const [email, setEmail] = useState('')
  const [dataproposta,setDataproposta] = useState(new Date())
  const [controleemail,setControleemail] = useState('')
  const [nomecliente, setNomecliente] = useState('')
  const [tipopreview, setTipopreview] = useState('')
  const [listapro, setListapro] = useState([])
  useEffect(()=>{

    let ele =  document.getElementsByClassName('btn-close')[0]
    setNomecliente(dados.nome)
    setProposta(dados.proposta)
    setEmail(dados.email)
    setControleemail(dados.controle)
    setTipopreview(dados.tipo)
    setElemento(ele)
    setDataproposta(new Date())
    setAtivo(false)
    setListapro(dados.lista)
    console.log(ele)
    if( ele !== undefined){
       ele.classList.add('btn-close-white')
    }
    //
    console.log(ele)
  },[open])

  const formatDateCampo = (date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const yyyy = date.getFullYear();

        const hh = String(date.getHours()).padStart(2, '0');
        const mi = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');

        return `${yyyy}-${m}-${d}`;
  };

  const enviaEmail = () =>{
        setLoadsave(true)
        const formData = new FormData()
        //dados cliente//
        formData.append('proposta', proposta)
        formData.append('email', email)
        formData.append('nome', nomecliente)
        formData.append('controleemail', controleemail)
        if(ativo){
           formData.append('dataproposta', formatDateCampo(dataproposta))
        }
        //tipopreview == 'previewrecibo' || tipopreview == 'previewexecucao'
        if( tipopreview == 'previewrecibo'){
            formData.append('escopo', 'recibo')
        }
        if( tipopreview == 'previewexecucao'){
            formData.append('escopo', 'execucao')
        }
        axios
        .post(`${endpoint}/email`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setLoadsave(false)
            setShowalert(true)
            setTimeout(() => {
                setShowalert(false)
            }, 2000)
        })
  }

  const ProfCheck = ({ checked, onChange }) => {
    //const [checked,setChecked] = useState(false)
    return(
      <CFormCheck
        label="tetse"
        checked={checked}
        onChange={(e)=>onChange(e.target.checked)}
      />
    )
  }

  const [checks, setChecks] = useState([
    false, false, false, false, false, false
  ]);

  const handleCheck = (index, value) => {
      setChecks(prev =>
          prev.map((item, i) => i === index ? value : item)
      );
  };

  const ListaProfisssionais = (props) =>{
    return(
        <>
        <div style={{display:'flex',gap: '5px'}}>
            <div className="mt-3" style={{marginTop:'4px',paddingLeft:'4px',paddingRight:'4px',float:'left'}}>
                <CBadge className='badge-klussen'>Anexar Profissionais ao Email</CBadge>
            </div>
            <div onClick={()=>setVisible(!visible)} style={{marginTop:'14px',float:'left',cursor:'pointer',fontWeight:'bold'}} class="circle_gray text-orange">
                 { visible ? (<FontAwesomeIcon icon={faArrowUp}/>) : (<FontAwesomeIcon icon={faArrowDown}/>)}
            </div>
        </div>
        <CCollapse visible={visible}>
             {checks.map((checked, index) => (
                  <div className="ms-2" key={index}>
                       <ProfCheck
                            checked={checked}
                            onChange={(value) => handleCheck(index, value)}
                       />
                   </div>
                ))}
            {/* <div className='ms-2'><ProfCheck/></div>
            <div className='ms-2'><ProfCheck/></div>
            <div className='ms-2'><ProfCheck/></div>
            <div className='ms-2'><ProfCheck/></div>
            <div className='ms-2'><ProfCheck/></div>
            <div className='ms-2'><ProfCheck/></div> */}
        </CCollapse>
        </>
    )
  }

  return (
    <>
      {/* <CButton color="primary" onClick={() => setVisible(!visible)}>
        Launch demo modal
      </CButton> */}
      <CModal
        id="modal-preview"
        backdrop="static"
        size="lg"
        visible={open}
        onClose={() => muda(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader style={{backgroundColor:'black',borderBottom:'5px solid #FF5F1F'}}>
          <CModalTitle id="LiveDemoExampleLabel" style={{color:'#FF5F1F'}}><FontAwesomeIcon size="lg" icon={faFolderOpen} />&nbsp;Preview Proposta</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} dangerouslySetInnerHTML={ {__html: html} } />
            { tipopreview == 'previewexecucao' ? (<ListaProfisssionais exibe={true}/>) : (<></>) }
            <div className='mt-4' style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <CAlert visible={showalert} color="success" variant="solid">
               Email Enviado com Sucesso!!!
            </CAlert>
            </div>
        </CModalBody>
        <CModalFooter>
         { tipopreview == 'previewrecibo' ? (
          <div style={{display:'flex',gap:'5px'}}>
            <div style={{marginTop:'7px'}}>
                <CFormCheck
                    type="checkbox"
                    id="invalidCheck"
                    label=""
                    feedbackInvalid="Informe se Acolhido esta Ativo"
                    checked={ativo}
                    onChange={(e)=>setAtivo(e.target.checked)}
                />
                &nbsp;
            </div>
            <div style={{marginTop:'7px'}}>Alterar data do Recibo:&nbsp;</div>
                <div>
                    <DatePicker
                        showYearDropdown
                        showMonthDropdown
                        peekNextMonth
                        dropdownMode="select"
                        locale="ptBR"
                        dateFormat="dd/MM/yyyy"
                        showIcon
                        selected={dataproposta}
                        //selected={new Date("1993/09/28")}
                        //openToDate={new Date("1993/09/28")}
                        calendarClassName="form-control"
                        onChange={(date) => setDataproposta(date)}
                    />
                </div>
           </div>) : (<></>)}
           { tipopreview == 'previewrecibo' || tipopreview == 'previewexecucao' ? (
            <CButton color="info" onClick={() => enviaEmail()}>
                Enviar Email&nbsp;<FontAwesomeIcon size="lg" icon={faEnvelope} />
                {' '}
                {loadsave? <CSpinner size="sm" /> : ''}
            </CButton>) : (<></>)}
          <CButton color="secondary" onClick={() => muda(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
