import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { 
  Phone, 
  Star, 
  Heart, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import styles from './App.module.css';

// Importação das imagens estruturais da pasta assets
import logoImg from './assets/logo.png';
import bannerImg from './assets/banner.jpg';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para o Carrossel/Modal ampliado
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Estado dinâmico para controlar o índice da imagem atual de CADA card individualmente
  const [cardIndexes, setCardIndexes] = useState({});

  const whatsappLinkBase = 'https://wa.me/5519982480111';
  const instagramLink = 'https://www.instagram.com/confeitariapedeumdocinho/';
  const facebookLink = 'https://www.facebook.com/confeitariapedeumdocinho/';
  const googleMapsLink = 'https://www.google.com/maps/place/Confeitaria+Pede+Um+Docinho+-+Bolos+-+Doces+-+Sobremesas+%C3%A0+Pronta+Entrega+-+Cafeteria+Espa%C3%A7o+Infantil-+Delivery+Bolos+e+Doces/@-22.96972,-47.002239,16z/data=!4m17!1m8!3m7!1s0x94c8cdbe58131517:0x61c2a43c75a0be24!2sAv.+Onze+de+Agosto,+1555+-+Vila+Embare,+Valinhos+-+SP,+13271-210!3b1!8m2!3d-22.9698117!4d-47.0023253!16s%2Fg%2F11fx2w51xy!3m7!1s0x94c8cdbe5a1f5e5f:0xbd1e15db441805b0!8m2!3d-22.9698117!4d-47.0023253!9m1!1b1!16s%2Fg%2F11c1v2ht2_?hl=pt-BR&entry=ttu';
  const cardapioLink = 'https://drive.google.com/file/d/1sbkNiFCO_4z8vUXuusCK3vv4GnM0Xl5T/view';
  const deliveryLink = 'https://pedeumdocinhovalinhos.menudino.com/';

  // Buscar os dados criados/editados no painel Admin direto do Supabase
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        setLoading(true);
        // Puxa as categorias criadas de forma dinâmica
        const { data, error } = await supabase
          .from('produtos')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;

        if (data) {
          setCategorias(data);
          
          // Inicializa dinamicamente a posição 0 de foto para cada categoria retornada
          const initialIndexes = {};
          data.forEach(item => {
            initialIndexes[item.id] = 0;
          });
          setCardIndexes(initialIndexes);
        }
      } catch (err) {
        console.error("Erro ao conectar ao Supabase:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  // Funções para navegar nas fotos de um card específico na página principal
  const proximaImgCard = (e, catId, totalImgs) => {
    e.stopPropagation();
    const total = totalImgs > 0 ? totalImgs : 1; 
    setCardIndexes((prev) => ({
      ...prev,
      [catId]: ((prev[catId] || 0) + 1) % total
    }));
  };

  const anteriorImgCard = (e, catId, totalImgs) => {
    e.stopPropagation();
    const total = totalImgs > 0 ? totalImgs : 1; 
    setCardIndexes((prev) => ({
      ...prev,
      [catId]: ((prev[catId] || 0) - 1 + total) % total
    }));
  };

  // Funções para o Carrossel do Modal Ampliado
  const abrirCarrosselModal = (categoria) => {
    const fotoAtualDoCard = cardIndexes[categoria.id] || 0;
    setActiveCategory(categoria);
    setCurrentImgIndex(fotoAtualDoCard);
  };

  const proximaImgModal = (e) => {
    e.stopPropagation();
    const urlsImagens = activeCategory?.image_url || [];
    const total = urlsImagens.length > 0 ? urlsImagens.length : 1;
    setCurrentImgIndex((prev) => (prev + 1) % total);
  };

  const anteriorImgModal = (e) => {
    e.stopPropagation();
    const urlsImagens = activeCategory?.image_url || [];
    const total = urlsImagens.length > 0 ? urlsImagens.length : 1;
    setCurrentImgIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <div className={styles.appContainer}>
      
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoContainer}>
            <img 
              src={logoImg} 
              alt="Logo Pede Um Docinho" 
              style={{ height: '60px', objectFit: 'contain' }}
            />
          </div>

          <div className={styles.desktopSocials}>
            <a href={instagramLink} target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg className={styles.socialIconSvg} viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            
            <a href={facebookLink} target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg className={styles.socialIconSvg} viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>

            <a href={googleMapsLink} target="_blank" rel="noreferrer" aria-label="Como Chegar">
              <svg className={styles.socialIconSvg} viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </a>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={styles.menuButton}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className={styles.mobileDropdown}>
            <a href={instagramLink} target="_blank" rel="noreferrer" className={styles.mobileLink}>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg> Instagram
            </a>
            <a href={facebookLink} target="_blank" rel="noreferrer" className={styles.mobileLink}>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg> Facebook
            </a>
            <a href={googleMapsLink} target="_blank" rel="noreferrer" className={styles.mobileLink}>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg> Como Chegar
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h2 className={styles.heroSlogan}>
            Montamos seu bolo na hora, temos sobremesas à pronta entrega e doces para sua festa.
          </h2>
          
          <div className={styles.mainBanner}>
            <img 
              src={bannerImg} 
              alt="Destaques da vitrine Pede um Docinho" 
              className={styles.bannerImage}
            />
            <div className={styles.bannerBadge}>
              <Heart className={styles.heartIcon} size={16} /> Confeitaria Gourmet Profissional
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <div className={styles.actionsWrapper}>
        <div className={styles.actionsGrid}>
          <a href={whatsappLinkBase} target="_blank" rel="noreferrer" className={`${styles.actionBtn} ${styles.whatsappBtn}`}>
            <Phone size={18} /> Pedir pelo WhatsApp
          </a>
          
          {/* Novo Botão Cardápio */}
          <a href={cardapioLink} target="_blank" rel="noreferrer" className={styles.actionBtn}>
            <Menu size={18} /> Ver Cardápio
          </a>

          {/* Novo Botão Delivery */}
          <a href={deliveryLink} target="_blank" rel="noreferrer" className={`${styles.actionBtn} ${styles.deliveryBtn}`}>
            <Star size={18} /> Delivery Online
          </a>
          
          <a href={googleMapsLink} target="_blank" rel="noreferrer" className={styles.actionBtn}>
            <Star className={styles.starIcon} size={18} /> Avaliações
          </a>
          
          <a href={instagramLink} target="_blank" rel="noreferrer" className={styles.actionBtn}>
            <svg className={styles.instagramIconSvg} viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            </svg> Instagram
          </a>

          <a href={facebookLink} target="_blank" rel="noreferrer" className={styles.actionBtn}>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg> Facebook
          </a>
        </div>
      </div>

      {/* Grid de Cards Dinâmico */}
      <section className={styles.gourmetSection}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#ff6584', fontWeight: 'bold' }}>
            Carregando nossa vitrine...
          </div>
        ) : (
          <div className={styles.gourmetGrid}>
            {categorias.map((cat) => {
              const indexAtual = cardIndexes[cat.id] || 0;
              const urlsImagens = cat.image_url || [];

              return (
                <div key={cat.id} className={styles.gourmetCard} onClick={() => abrirCarrosselModal(cat)}>
                  <div className={styles.cardImageWrapper}>
                    
                    {/* Seta esquerda sempre visível na estrutura de moldura */}
                    <button 
                      className={`${styles.cardNavBtn} ${styles.cardPrevBtn}`}
                      onClick={(e) => anteriorImgCard(e, cat.id, urlsImagens.length)}
                      aria-label="Foto anterior"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    {/* Exibe a imagem se ela existir no array do banco */}
                    {urlsImagens.length > 0 && urlsImagens[indexAtual] ? (
                      <img 
                        src={urlsImagens[indexAtual]} 
                        alt={`${cat.title} - Imagem ${indexAtual + 1}`} 
                        className={styles.cardCardImg} 
                      />
                    ) : (
                      <div style={{ 
                        height: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        backgroundColor: '#f3f4f6', 
                        color: '#9ca3af',
                        fontWeight: '500',
                        fontSize: '0.85rem',
                        letterSpacing: '0.5px'
                      }}>
                        Nenhuma imagem cadastrada
                      </div>
                    )}

                    {/* Seta direita sempre visível na estrutura de moldura */}
                    <button 
                      className={`${styles.cardNavBtn} ${styles.cardNextBtn}`}
                      onClick={(e) => proximaImgCard(e, cat.id, urlsImagens.length)}
                      aria-label="Próxima foto"
                    >
                      <ChevronRight size={20} />
                    </button>

                  </div>

                  {/* Nome do Carrossel dinâmico vindo da coluna title do banco */}
                  <div className={styles.cardProductInfo}>
                    <h3 className={styles.cardTitleStyle}>{cat.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerBanner}>
          <div className={styles.footerProfile}>
            <div className={styles.profileAvatar} style={{ background: '#fff', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src={logoImg} 
                alt="Logo Rodapé" 
                style={{ width: '80%', height: '80%', objectFit: 'contain' }}
              />
            </div>
            <div className={styles.footerText}>
              <h3>Carol Stenico</h3>
              <p>Pede Um Docinho • Confeitaria Gourmet</p>
            </div>
          </div>
          <div className={styles.footerCta}>
            <a href={whatsappLinkBase} className={styles.footerWhatsapp} target="_blank" rel="noreferrer">
              <Phone size={18} /> (19) 98248-0111
            </a>
          </div>
        </div>
        <div className={styles.copyright}>
          © 2026 Pede Um Docinho. Todos os direitos reservados.
        </div>
      </footer>

      {/* Modal / Lightbox */}
      {activeCategory && (
        <div className={styles.modalOverlay} onClick={() => setActiveCategory(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={() => setActiveCategory(null)}>
              <X size={28} />
            </button>
            
            <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={anteriorImgModal}>
              <ChevronLeft size={36} />
            </button>

            <div className={styles.modalImageContainer}>
              {activeCategory.image_url && activeCategory.image_url.length > 0 && activeCategory.image_url[currentImgIndex] ? (
                <img 
                  src={activeCategory.image_url[currentImgIndex]} 
                  alt={`Ampliada ${currentImgIndex + 1}`} 
                  className={styles.modalImage} 
                />
              ) : (
                <div style={{
                  width: '320px',
                  height: '320px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f3f4f6',
                  color: '#9ca3af',
                  borderRadius: '12px',
                  fontWeight: '500'
                }}>
                  Visualização Ampliada (Sem Foto)
                </div>
              )}
              <span className={styles.imageCounter}>
                {activeCategory.image_url?.length > 0 ? currentImgIndex + 1 : 0} / {activeCategory.image_url?.length || 0}
              </span>
            </div>

            <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={proximaImgModal}>
              <ChevronRight size={36} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}