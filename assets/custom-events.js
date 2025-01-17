document.querySelectorAll('a[href="#quiz-scroll"]').forEach(e=> {
    e.addEventListener('click', function(el) {
        el.preventDefault();
        const targetElement = document.querySelector('.k-quiz');
        targetElement?.scrollIntoView({
            behavior: 'smooth'
        });
    })
})

var main = function () {

    return {
        resellerCTA: ()=> {
            if (document.querySelector('.resellers-data') == null) return;
            
            const countriesData = JSON.parse(document.querySelector('.resellers-data').textContent)
            const resellerLink = document.querySelector('.header__icon--reseller')
            const flagWrapper = resellerLink.querySelector('.flag-img')
            const headerIcons = document.querySelector('.header__icons')
            const shopBtn = document.querySelector('.shop-btn')

            if( countriesData.countries.length == 0 ) return;

            
            fetch('https://ip2c.org/s')
            .then(response => response.text())
            .then(ip2c => {
              var country_code = ip2c.split(';')[1];
              const activeCountry = countriesData.countries.filter(item => item.country_iso === country_code);

              if (activeCountry.length == 0) return;
                shopBtn?.classList.add('animated')
                const flagImg = activeCountry[0].flag_image
                const countryName = activeCountry[0].country_name
                const page = activeCountry[0].reseller_page

                if (flagImg != null || flagImg != '' ) {
                    const flagEl = document.createElement('img');
                    flagEl.src = flagImg;
                    flagEl.width = 50;
                    flagEl.height = 50;

                    flagWrapper.append(flagEl)
                }
                if (page != null || page != '' ) {
                    const resLink = document.createElement('a');
                    resLink.href = page;
                    resLink.classList.add('link','accent-link','reseller-link')

                    resLink.textContent = countryName;
                    headerIcons.insertAdjacentElement('afterend', resLink);
                    resellerLink.href = page;
                }
                resellerLink.classList.remove('disabled')
            })
            .catch(error => console.error(error));
        },
        amznOr: ()=> {
            const orSep = document.querySelector('.or-separator')
            if (orSep == null) return;

            const loadedBws = setInterval( function() {

                if (document.querySelector('.bwp-widget-loaded') != null ) {
                    orSep.classList.add('empty-or')
                    clearInterval(loadedBws);
                }
            },100)
        },
        popoverBtns: ()=> {
            document.querySelectorAll('.popover-button').forEach(e => {
                e.addEventListener('click', function() {
                    var id = e.dataset.id;
                    var parent = e.closest('.button--popover-wrap');
            
                    if (parent.classList.contains('active')) {
                        parent.classList.remove('active');
                    } else {
                        document.querySelectorAll('.button--popover-wrap.active').forEach(activeParent => {
                            activeParent.classList.remove('active');
                        });
                        parent.classList.add('active');
                    }
                });
            });
        }
    };
}()

main.popoverBtns()
main.amznOr()
main.resellerCTA()