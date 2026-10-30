import { React,useEffect } from 'react';
import imagemfundo from '../../../../public/assets/img/telas/footer.png'
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';
//C:\Apache24\htdocs\projetos\inertia-assefrak\public\assets\img\telas\ASSEFRAKBranding.png
//C:\Apache24\htdocs\projetos\inertia-assefrak\resources\js\Pages\componentes\FooterAdmin.jsx



// The Main component receives props passed from the Laravel controller
const FooterAdmin = ({ appName }) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG

  useEffect(() => {
     document.documentElement.setAttribute('data-coreui-theme', theme_light);
  })

  return (
     <footer id="footer" style={{borderTop:'3px solid #FF5F1F',height:'300px',zIndex:'10',backgroundPosition:'center',backgroundSize:'cover',backgroundImage:'url('+imagemfundo+')'}}>
        <div class="container">
             <div class="row gy-5" style={{height:'400px'}}>
             </div>
        </div>
     </footer>
  )
}
export default FooterAdmin
