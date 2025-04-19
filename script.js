document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
          navLinks.classList.remove('active');
      });
  });
  
  // Enhanced smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          
          if (!targetSection) return; // Verifica se o elemento existe
          
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = targetPosition - headerHeight;
          
          // Rolagem suave
          window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
          });
      });
  });
  
  // Modal de imagens
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const closeBtn = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');
  
  // Função para abrir o modal
  function openImageModal(imgSrc) {
      if (modal && modalImg) {
          modalImg.src = imgSrc;
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
      }
  }
  
  // Função para fechar o modal
  function closeImageModal() {
      if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
          setTimeout(() => {
              if (modalImg) modalImg.src = '';
          }, 300);
      }
  }
  
  // Eventos para fechar o modal
  if (closeBtn) closeBtn.addEventListener('click', closeImageModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeImageModal);
  
  // Fechar modal com tecla ESC
  document.addEventListener('keydown', function(e) {
      if (e.key === "Escape" && modal && modal.classList.contains('active')) {
          closeImageModal();
      }
  });
  
  // Funcionalidade do carrossel de imagens
  const carouselItems = document.querySelectorAll('.carousel-item');
  const nextButton = document.querySelector('.carousel-control.next');
  const prevButton = document.querySelector('.carousel-control.prev');
  const indicators = document.querySelectorAll('.indicator');
  
  let currentIndex = 0;
  const totalItems = carouselItems.length;
  
  // Adicionar evento de clique para a imagem ativa
  function updateClickableImage() {
      const activeImage = document.querySelector('.carousel-item.active img');
      if (activeImage) {
          // Remover eventos antigos e adicionar novo
          activeImage.onclick = null;
          activeImage.style.cursor = 'pointer';
          activeImage.onclick = function(e) {
              e.preventDefault();
              openImageModal(this.src);
          };
          console.log('Imagem ativa configurada para abrir modal:', activeImage.src);
      }
  }
  
  // Função para mostrar um slide específico
  const showSlide = (index) => {
      // Limitar o índice
      if (index < 0) index = totalItems - 1;
      if (index >= totalItems) index = 0;
      
      // Atualizar o índice atual
      currentIndex = index;
      
      // Atualizar slides e indicadores
      carouselItems.forEach(item => item.classList.remove('active'));
      indicators.forEach(indicator => indicator.classList.remove('active'));
      
      carouselItems[currentIndex].classList.add('active');
      indicators[currentIndex].classList.add('active');
      
      // Atualizar imagem clicável após mudança de slide
      updateClickableImage();
  };
  
  // Controles do carrossel
  if (nextButton && prevButton) {
      nextButton.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          showSlide(currentIndex + 1);
      });
      
      prevButton.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          showSlide(currentIndex - 1);
      });
      
      // Funcionalidade para os indicadores
      indicators.forEach((indicator, idx) => {
          indicator.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              showSlide(idx);
          });
      });
      
      // Auto-rotação do carrossel (com verificação se está visível)
      setInterval(() => {
          const carouselSection = document.querySelector('.portfolio');
          const rect = carouselSection.getBoundingClientRect();
          const isVisible = (
              rect.top >= -rect.height &&
              rect.bottom <= window.innerHeight + rect.height
          );
          
          // Só avança o carrossel se estiver visível na tela
          if (isVisible) {
              showSlide(currentIndex + 1);
          }
      }, 5000);
  }
  
  // Configurar clique na imagem ativa inicial
  updateClickableImage();
 });