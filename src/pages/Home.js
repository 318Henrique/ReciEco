import React from 'react';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';
import Banner1 from '../assets/banner1.jpg';
import Footer from '../Components/Footer'

export default function Home(){
    return(
        <>
        <Header/>
        <div className="control-main box-control-all">
            <section className="section-pattern section-boas-vindas">
                <div className="section-content">
                    <h1>Seja bem-vindo à ReciEco</h1>
                    <h3>Recicle hoje, para que exista um amanhã sustentável!</h3>
                </div>
            </section>
            <section className="section-pattern section-two">
                <img src={Banner1} alt=''/>
            </section>
            <section className="section-pattern section-beneficios">
                <div className="section-content-beneficios">
                    <div className='title-section-beneficios'>Benefícios</div>
                    <div className="box-control-beneficios">
                        <div className="box-individual">
                            <div className='title-box-individual'>Agilidade</div>
                            <div className="separator-title-content"></div>
                            <div className='content-box-individual'>
                                Venda ou compre seus resíduos com as pessoas certas e no lugar certo, de uma maneira simples!
                            </div>
                        </div>
                        <div className="box-individual">
                            <div className='title-box-individual'>Oportunidades</div>
                            <div className="separator-title-content"></div>
                            <div className='content-box-individual'>
                                Com os diversos tipos de pessoas e empresas, podemos gerar mais empregos!
                            </div>
                        </div>
                        <div className="box-individual">
                            <div className='title-box-individual'>Alcance</div>
                            <div className="separator-title-content"></div>
                            <div className='content-box-individual'>
                                Encontre ou distribua resíduos em todo o terrítorio nacional para todo público. 
                            </div>
                        </div>
                    </div>
                    <Link to='/cadastro' className='link-pattern-home'>Cadastrar-se</Link>
                </div>
            </section>
            <section className='section-pattern section-localizar-residuos'>
                <div className='box-with-transparent'>
                    <div className='control'>
                        <div>
                            Localize ou distribua resíduos!
                        </div>
                        <Link to='/localizar' className='link-pattern-home'>Localizar resíduos</Link>
                    </div>
                </div>
            </section>
        </div>
        <Footer/>
        </>
    )
}