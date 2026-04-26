import {
  Directive,
  ElementRef,
  input,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true,
})
export class AnimateOnScrollDirective implements OnInit {
  delay = input<number>(0);
  @Input() direction: 'up' | 'down' | 'left' | 'right' = 'up';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2, // allow do manipulation of the dom
  ) {}

  ngOnInit() {
    const element = this.el.nativeElement;

    // direction
    const translateMap = {
      up: 'translate-y-6',
      down: '-translate-y-6',
      left: 'translate-x-6',
      right: '-translate-x-6',
    };

    this.renderer.addClass(element, 'opacity-0');
    this.renderer.addClass(element, translateMap[this.direction]);

    setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.renderer.removeClass(element, 'opacity-0');
            this.renderer.removeClass(element, translateMap[this.direction]);

            this.renderer.addClass(element, 'opacity-100');
            this.renderer.addClass(element, 'translate-x-0');
            this.renderer.addClass(element, 'translate-y-0');
            this.renderer.addClass(element, 'transition-all');
            this.renderer.addClass(element, 'duration-700');
            this.renderer.addClass(element, 'ease-out');

            observer.unobserve(element);
          }
        },
        { threshold: 0.2 },
      );

      observer.observe(element);
    }, this.delay());
  }
}
