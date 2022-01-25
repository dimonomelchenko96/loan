import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor (container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev,activeClass, animate, autoplay);
    }
    moveButtonsToEnd() {
        Array.from(this.slides).forEach((slide, i) => {
            if(slide.tagName === "BUTTON") {
                this.container.appendChild(this.slides[i]);
            }
        });
    }

    nextSlide() {
        this.container.appendChild(this.slides[0]);
        this.decorizeSlides();
        this.moveButtonsToEnd();
    }


    prevSlide() {
        let active = this.slides[0];
        this.container.insertBefore(active, this.slides[this.slides.length - 1]);
        this.decorizeSlides();
        this.moveButtonsToEnd();
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());
        this.prev.addEventListener('click', () => this.prevSlide());
    }

    decorizeSlides() {
        Array.from(this.slides).forEach(slide => {
            slide.classList.remove(this.activeClass);
            if(this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '1';
            }    
        });
        this.slides[0].classList.add(this.activeClass);
        if(this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        } 
    }

    init() {
        try{
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;
        this.bindTriggers();
        this.decorizeSlides();

        if(this.autoplay) {
            setInterval(() => {
                this.nextSlide();
            },5000);
        }
        }
        catch(e){}
    }
}