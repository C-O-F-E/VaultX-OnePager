/**
* Website Name: VaultX
* Updated: April 2023 
* Author: SYNCNetwork.com
*/
Highcharts.chart("pie", {
  chart: {
    type: "pie",
    options3d: {
      enabled: true,
      alpha: 45
    },
    backgroundColor: "#EDEBE6"
  },
  title: {
    text: "VX Token Allocation"
  },
  subtitle: {
    text: "Breakdown of token distribution"
  },
  plotOptions: {
    pie: {
      innerSize: 100,
      depth: 65,
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "{point.name} ({point.percentage:.1f}%)",
        connectorWidth: 2
      },
      showInLegend: true,
      states: {
        hover: {
          enabled: true,
          halo: {
            size: 10,
            opacity: 0.3
          }
        }
      },
      point: {
        events: {
          legendItemClick: function () {
            this.select(null, true);
            return false;
          }
        }
      }
    }
  },
  colors: [
    "#FBB829",
    "#BF8D30",
    "#31364A",
    "#596180",
    "#7d88b3",
    "#555855",
    "#558888"
    
  ],
  series: [
    {
      name: "Token Allocation",
      data: [
        { name: "Treasury", y: 40, sliced: true, selected: true },
        ["Team", 22],
        ["Liquidity and Future Funding", 15],
        ["Ecosystem Rewards", 15],
        ["Airdrop", 3],
        ["Crowd Pooling / Etc", 3],
        ["Advisors", 2]
      ]
    }
  ],
  tooltip: {
    useHTML: true,
    headerFormat: "<h1>{point.key}</h1>",
    pointFormat: "<h4>{point.percentage:.1f} {series.name} </h4>"
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "middle",
    itemHoverStyle: {
      color: "#666"
    },
    itemStyle: {
      fontWeight: "bold",
      fontSize: "13px"
    }
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom"
          }
        }
      }
    ]
  },
  credits: {
    enabled: false
  },
  exporting: {
    enabled: true
  }
});


(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Testimonials slider
   */
  // new Swiper('.testimonials-slider', {
  //   speed: 600,
  //   loop: true,
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false
  //   },
  //   slidesPerView: 'auto',
  //   pagination: {
  //     el: '.swiper-pagination',
  //     type: 'bullets',
  //     clickable: true
  //   },
  //   breakpoints: {
  //     320: {
  //       slidesPerView: 1,
  //       spaceBetween: 20
  //     },

  //     1200: {
  //       slidesPerView: 3,
  //       spaceBetween: 20
  //     }
  //   }
  // });

  /**
   * Porfolio isotope and filter
   */
  // window.addEventListener('load', () => {
  //   let portfolioContainer = select('.portfolio-container');
  //   if (portfolioContainer) {
  //     let portfolioIsotope = new Isotope(portfolioContainer, {
  //       itemSelector: '.portfolio-item',
  //     });

  //     let portfolioFilters = select('#portfolio-flters li', true);

  //     on('click', '#portfolio-flters li', function(e) {
  //       e.preventDefault();
  //       portfolioFilters.forEach(function(el) {
  //         el.classList.remove('filter-active');
  //       });
  //       this.classList.add('filter-active');

  //       portfolioIsotope.arrange({
  //         filter: this.getAttribute('data-filter')
  //       });
  //     }, true);
  //   }

  // });

  /**
   * Initiate portfolio lightbox 
   */
  // const portfolioLightbox = GLightbox({
  //   selector: '.portfolio-lightbox'
  // });

  /**
   * Portfolio details slider
   */
  // new Swiper('.portfolio-details-slider', {
  //   speed: 400,
  //   loop: true,
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false
  //   },
  //   pagination: {
  //     el: '.swiper-pagination',
  //     type: 'bullets',
  //     clickable: true
  //   }
  // });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate Pure Counter 
   */
  // new PureCounter();

  
      // initial progress value
      let progress = 0;
      // pause time in milliseconds
      let pauseTime = 3000; 
  
      const stepButtons = document.querySelectorAll('.step-button');
      const progressBar = document.querySelector('#progress');
      const accordionBoxes = document.querySelectorAll('.accordion-box'); // assuming your accordion boxes have the class .accordion-box
  
      Array.from(stepButtons).forEach((button,index) => {
          button.addEventListener('click', () => {
              progressBar.setAttribute('value', index * 100 /(stepButtons.length - 1) );
  
              stepButtons.forEach((item, secindex)=>{
                  accordionBoxes[secindex].style.display = 'hidden'; // hide all accordion boxes
                  if(index === secindex){
                      item.classList.add('done');
                      accordionBoxes[index].style.display = 'block'; // show only the clicked accordion box
                  }
                  else{
                      // item.classList.remove('done');
                  }
              })
          })
      })

  // function to increment progress
  function incrementProgress() {
      if (progress < 100) {
          progress++;
          progressBar.value = progress;
      } 
  }

  // function to control progress and reset
  function controlProgress() {
    // stepButtons[0].click();
      let intervalId = setInterval(function() {
          // Increment progress till 1%
          if(progress < 1){
              incrementProgress();
          }
          // Pause at 1% then continue to 50%
          else if(progress === 1){
              clearInterval(intervalId);
              stepButtons[0].click();
              setTimeout(function(){
                  intervalId = setInterval(function(){
                      // Increment progress till 50%
                      if(progress < 50){
                          incrementProgress();
                      }
                      // Pause at 50% then continue to 100%
                      else if(progress === 50){
                          clearInterval(intervalId);
                          stepButtons[1].click();
                          setTimeout(function(){
                              intervalId = setInterval(function(){
                                  // Increment progress till 100%
                                  if(progress < 100){
                                      incrementProgress();
                                  }
                                  // Pause at 100% then start over
                                  else if(progress === 100){
                                      clearInterval(intervalId);
                                      stepButtons[2].click();
                                      setTimeout(function(){
                                          progress = 0;
                                          progressBar.value = progress;
                                          controlProgress();
                                      }, pauseTime); // pause for 3 seconds before starting over
                                  }
                              }, 100); // adjust time as needed
                          }, pauseTime);
                      }
                  }, 100); // adjust time as needed
              }, pauseTime);
          }
      }, 100); // adjust time as needed
  }

  window.onload = function() {
      // stepButtons[0].click();
      controlProgress();
      stepButtons[0].click();

  };


 
})()