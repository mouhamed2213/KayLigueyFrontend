import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
@Directive({
  selector: '[appAnimateOnScroll]',
})
export class AnimateOnScrollDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    // état initial (invisible)
    this.renderer.addClass(this.el.nativeElement, 'opacity-0');
    this.renderer.addClass(this.el.nativeElement, 'translate-y-6');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // animation
          this.renderer.removeClass(this.el.nativeElement, 'opacity-0');
          this.renderer.removeClass(this.el.nativeElement, 'translate-y-6');

          this.renderer.addClass(this.el.nativeElement, 'opacity-100');
          this.renderer.addClass(this.el.nativeElement, 'translate-y-0');
          this.renderer.addClass(this.el.nativeElement, 'transition-all');
          this.renderer.addClass(this.el.nativeElement, 'duration-700');
          this.renderer.addClass(this.el.nativeElement, 'ease-out');

          observer.unobserve(this.el.nativeElement);
        }
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(this.el.nativeElement);
  }
}
