import { React,useEffect, useState } from 'react';
import imagemfundo from '../../../../public/assets/img/telas/footer.png'
import Aos from 'aos';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';
//C:\Apache24\htdocs\projetos\inertia-assefrak\public\assets\img\telas\ASSEFRAKBranding.png
//C:\Apache24\htdocs\projetos\inertia-assefrak\resources\js\Pages\componentes\FooterAdmin.jsx



// The Main component receives props passed from the Laravel controller
const CabecalhoCadastro = (props) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const [titulo,setTitulo] = useState(props.titulo)
  const [texto,setTexto] = useState(props.texto)

  useEffect(() => {
     document.documentElement.setAttribute('data-coreui-theme', theme_light);
  })

  return (
     <div data-aos="fade-up" class="div_head page-title mb-4">
            <h1 class="mb-1">{titulo}</h1>
            <p class="text-secondary mb-0">
                {texto}
            </p>
     </div>
  )
}
export default CabecalhoCadastro
