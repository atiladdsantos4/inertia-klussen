import { React, useEffect, useState, Suspense,lazy } from 'react';
import HeaderAdmin from './componentes/HeaderAdmin';
import FooterAdmin from './componentes/FooterAdmin';
import Cliente from './cadastro/Cliente';
import TipoCliente from './cadastro/TipoCliente';
import ListaTipoCliente from './listagem/ListaTipoCliente';
import Servico from './cadastro/Servico';
import ListaServico from './listagem/ListaServico';
import ListaItemServico from './listagem/ListaItemServico';
import ServicoItem from './cadastro/ServicoItem';
import ListaClientes from './listagem/ListaClientes';
import Proposta from './cadastro/Proposta';
import ListaProposta from './listagem/ListaProposta';
import ListaMedidas from './listagem/ListaMedidas';
import Medidas from './cadastro/Medidas';
import Profissional from './cadastro/Profissional';
import ListaProfissional from './listagem/ListaProfissional';
import Agenda from './cadastro/Agenda';

const Admin = ({ appName }) => {

  const [view,setView] = useState(null)
  const [telaatual,setTelaatual] = useState('ListaProposta');
  const [param,setParam] = useState(null);
  const [paramestado,setParamestado] = useState(null);
  const [paramacolhido,setParamacolhido] = useState(null);
  const [paramtratamento,setParamtratamento] = useState(null);
  const [paramservico,setParamservico] = useState(null);
  const [novo,setNovo] = useState(false);
  const [largura,setLargura] = useState(null);


  useEffect(() => {

       function handleResize() {
        // Set window width/height to state
            setLargura(window.innerWidth);
            console.log('larguraadmin:'+window.innerWidth)
       }
       // Add event listener
       window.addEventListener("resize", handleResize);
       //let largura = window.screen.width;
       handleResize();
       return () => window.removeEventListener("resize", handleResize);
       //setLargura(largura)
       //console.log('larguraadmin:'+largura)
  },[])

   const scrollToId = (id) => {
       const element = document.getElementById(id);
       if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
       }
  };

  const AtualizaTela = () =>{
    setNovo(!novo)
  }

  const ExibeLayout = (props) => {
    console.log(props)
    let dados = null
    let id = null
    scrollToId('idmain')
    switch( props.tela) {

      case "Cliente":
        return(<Cliente tela={setTelaatual} param={param} estadovalor={paramestado} altera={setParam} setacolhido={setParamacolhido}/>)
       break

      case "TipoCliente":
        return(<TipoCliente tela={setTelaatual} param={param} estadovalor={paramestado} altera={setParam} setacolhido={setParamacolhido}/>)
       break

      case "ListaTipoCliente":
        return(<ListaTipoCliente tela={setTelaatual} altera={setParam} largura={largura}/>)
       break

      case "Servico":
        return(<Servico tela={setTelaatual} param={param} estadovalor={paramestado} altera={setParam} setacolhido={setParamacolhido}/>)
       break

      case "ListaServico":
        return(<ListaServico tela={setTelaatual} altera={setParam} largura={largura} itemservico={setParamservico}/>)
       break

      case "ListaItemServico":
        return(<ListaItemServico tela={setTelaatual} altera={setParam} largura={largura}/>)
       break

      case "ServicoItem":
        return(<ServicoItem tela={setTelaatual} param={param} servicovalor={paramservico} altera={setParam} setacolhido={setParamacolhido}/>)
       break

     case "ListaClientes":
        return(<ListaClientes tela={setTelaatual} altera={setParam} largura={largura} itemservico={setParamservico}/>)
       break

     case "GeraProposta":
        return(<Proposta tela={setTelaatual} param={param} estadovalor={paramestado} altera={setParam} setacolhido={setParamacolhido}/>)
       break

     case "ListaProposta":
        return(<ListaProposta tela={setTelaatual} altera={setParam} largura={largura} itemservico={setParamservico}/>)
       break

     case "ListaMedidas":
        return(<ListaMedidas tela={setTelaatual} altera={setParam} largura={largura} itemservico={setParamservico}/>)
       break

     case "Medidas":
        return(<Medidas tela={setTelaatual} param={param} estadovalor={paramestado} altera={setParam} setacolhido={setParamacolhido}/>)
       break

     case "Profissional":
       return(<Profissional tela={setTelaatual} param={param} estadovalor={paramestado} altera={setParam} setacolhido={setParamacolhido}/>)
       break

     case "ListaProfissionais":
       return(<ListaProfissional tela={setTelaatual} altera={setParam} largura={largura} itemservico={setParamservico}/>)
       break

    case "Agenda":
       return(<Agenda tela={setTelaatual} param={param} estadovalor={paramestado} altera={setParam} setacolhido={setParamacolhido}/>)
       break

    }
  }


return (
           <>
            <HeaderAdmin tela={setTelaatual} alteraficha={setParamacolhido} alteraservico={setParamservico} altera={setParam} mudatela={AtualizaTela}/>
            <main id="idmain" class="main">
                {/* <!-- Hero Section --> */}
                <Suspense fallback={<div>Loading dashboard view...</div>}>
                   <ExibeLayout muda={novo} tela={telaatual}/>
                </Suspense>
                {/* <Acolhido/> */}
            </main>
           <FooterAdmin/>
        </>
  )
}

export default Admin
