import React from 'react';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';
import Banner1 from '../assets/banner1.jpg';
import Footer from '../Components/Footer'

export default function Contact(){
    return(
        <>
        <Header/>
        <div className="control-main box-control-all">
            <section className="section-pattern section-boas-vindas">
                <div className="section-content">
                    <h1>Entre em Contato conosco!</h1>
                
                </div>
            </section>
            
            <section className='section-pattern section-localizar-residuos'>
                <div className='box-with-transparent'>
                    <div className='control'>
                        <div>
                            Locaos!
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