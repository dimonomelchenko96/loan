import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(btns, nextmodule, prevmodule) {
        super(btns, nextmodule, prevmodule);
    }
    
    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        } 

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }
        try {
            this.hanson.style.opacity = '0';

            if(n === 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }

        } catch(e) {}

        Array.from(this.slides).forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('animated', 'fadeInUp');
        });
        this.slides[this.slideIndex - 1].style.display = 'block';
        this.slides[this.slideIndex - 1].classList.add('animated', 'fadeInUp');
    }

    showPerson () {
        setTimeout(() => {
            this.person.style.display = 'block';
        }, 3000);
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    bindTriggers () {
        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                this.plusSlides(1);
            });

            item.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            }); 
        });

        this.prevmodule.forEach(item => {
            item.addEventListener('click', () => {
                this.plusSlides(-1);
            });
        });
        this.nextmodule.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                this.plusSlides(1);
            });
        });
    }

    render() {
        if (this.container) {
            try {
                this.hanson = document.querySelector('.hanson');
            } catch(e) {}

            this.showSlides(this.slideIndex);
            this.bindTriggers();
       }
    }
}