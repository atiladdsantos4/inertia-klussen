import { React,useEffect } from 'react';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const Footer = ({ appName }) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  useEffect(() => {
     document.documentElement.setAttribute('data-coreui-theme', theme_light);
  })

  return (
     <footer id="footer" class="footer dark-background" style={{zIndex:'10'}}>

        <div class="container">
                <div class="row gy-5">

                    <div class="col-lg-4">
                    <div class="footer-content">
                        <a href="index.html" class="logo d-flex align-items-center mb-4">
                        <span class="sitename">Assefrak</span>
                        </a>
                        <p class="mb-4">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Donec velit neque auctor sit amet aliquam vel ullamcorper sit amet ligula.</p>

                        <div class="newsletter-form">
                        <h5>Receba Novidades</h5>
                        <form action="forms/newsletter.php" method="post" class="php-email-form">
                            <div class="input-group">
                            <input type="email" name="email" class="form-control" placeholder="Enter your email" required=""></input>
                            <button type="submit" class="btn-subscribe">
                                <i class="bi bi-send"></i>
                            </button>
                            </div>
                            <div class="loading">Loading</div>
                            <div class="error-message"></div>
                            <div class="sent-message">Thank you for subscribing!</div>
                        </form>
                        </div>
                    </div>
                    </div>

                    <div class="col-lg-2 col-6">
                    <div class="footer-links">
                        <h4>Instituição</h4>
                        <ul>
                        <li><a href="#"><i class="bi bi-chevron-right"></i> About</a></li>
                        <li><a href="#"><i class="bi bi-chevron-right"></i> Careers</a></li>
                        <li><a href="#"><i class="bi bi-chevron-right"></i> Press</a></li>
                        <li><a href="#"><i class="bi bi-chevron-right"></i> Blog</a></li>
                        <li><a href="#"><i class="bi bi-chevron-right"></i> Contact</a></li>
                        </ul>
                    </div>
                    </div>

                    <div class="col-lg-2 col-6">
                    <div class="footer-links">
                        <h4>Solutions</h4>
                        <ul>
                        <li><a href="#"><i class="bi bi-chevron-right"></i> Digital Strategy</a></li>
                        <li><a href="#"><i class="bi bi-chevron-right"></i> Cloud Computing</a></li>
                        <li><a href="#"><i class="bi bi-chevron-right"></i> Data Analytics</a></li>
                        <li><a href="#"><i class="bi bi-chevron-right"></i> AI Solutions</a></li>
                        <li><a href="#"><i class="bi bi-chevron-right"></i> Cybersecurity</a></li>
                        </ul>
                    </div>
                    </div>

                    <div class="col-lg-4">
                    <div class="footer-contact">
                        <h4>Fale Conoso</h4>
                        <div class="contact-item">
                        <div class="contact-icon">
                            <i class="bi bi-geo-alt"></i>
                        </div>
                        <div class="contact-info">
                            <p>Centro Espírita Kardecista de Camaçari</p>
                            <p>📍Rua da Ambrosia, 183. Próximo ao Arena 2 de julho. Bairro 2 de Julho</p>
                        </div>
                        </div>

                        <div class="contact-item">
                        <div class="contact-icon">
                            <i class="bi bi-telephone"></i>
                        </div>
                        <div class="contact-info">
                            <p>+55 (71) 98113-3024</p>
                        </div>
                        </div>

                        <div class="contact-item">
                        <div class="contact-icon">
                            <i class="bi bi-envelope"></i>
                        </div>
                        <div class="contact-info">
                            <p>contact@example.com</p>
                        </div>
                        </div>

                        <div class="social-links">
                        <a href="#"><i class="bi bi-facebook"></i></a>
                        <a href="#"><i class="bi bi-twitter-x"></i></a>
                        <a href="#"><i class="bi bi-linkedin"></i></a>
                        <a href="#"><i class="bi bi-youtube"></i></a>
                        <a href="#"><i class="bi bi-github"></i></a>
                        </div>
                    </div>
                    </div>

                </div>
        </div>

        <div class="footer-bottom" style={{position:'fixed'}}>
            <div class="container">
                <div class="row align-items-center">
                <div class="col-lg-6">
                    <div class="copyright">
                    <p>© <span>Copyright</span> <strong class="px-1 sitename"><span style={{color:'#6895C1'}}>Assefrak</span></strong> <span>Todos Direitos Reservados</span></p>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="footer-bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Cookie Policy</a>
                    </div>
                    <div class="credits">
                    Designed by <a href="https://bootstrapmade.com/">Átila Santos</a> | <a href="https://bootstrapmade.com/tools/">DevTools</a>
                    </div>
                </div>
                </div>
            </div>
        </div>

     </footer>
  )
}
export default Footer
