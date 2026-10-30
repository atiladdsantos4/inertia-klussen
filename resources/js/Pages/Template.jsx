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

const Template = ({ appName }) => {

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

  const Templ = () =>{
    let data =  [
        { "firstname": "Ray",
            "lastname": "Villalobos",
            "category": "Front End",
            "title": "Bootstrap & CSS Preprocessors",
            "image": "http://barcampdeland.org/images/speaker_rayvillalobos.jpg",
            "link": "http://iviewsource.com",
            "bio": "Ray Villalobos is a full-time author and teacher at lynda.com. He is author of the book, Exploring Multimedia for Designers. He has more than 20 years experience in developing and programming multimedia projects. Previously at Entravision Communications, he designed and developed a network of radio station and TV web sites. As a senior producer for Tribune Interactive, he was responsible for designing orlandosentinel.com and for creating immersive multimedia projects and Flash games for the site.",
            "description": "As responsive design continues to take over the web, front-end developers and designers have turned to preprocessors and layout systems that simplify their workflow. Lynda.com staff author Ray Villalobos will talk about using the Bootstrap framework from Twitter to scaffold and fast track your responsive design. He'll talk about how you can use CodeKit and LESS to put together designs in hours instead of days."
        }
    ];
    console.log(data)
    return(
       <div dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}>
       </div>
    )
  }

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

    }
  }


return (
         <>
            <main id="idmain" class="main">
                <div>teste</div>
                <Templ/>
            </main>
        </>
  )
}

export default Template
