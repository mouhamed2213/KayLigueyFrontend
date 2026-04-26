import {
  Directive,
  ElementRef,
  inject,
  input,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective implements OnInit {
  end = input(100);
  duration = input(1500); // ms
  suffix = input(''); // ex: %, +

  private el = inject(ElementRef);
  ngOnInit() {
    const element = this.el.nativeElement;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.animate();
        observer.unobserve(element);
      }
    });

    observer.observe(element);
  }

  animate() {
    const start = 0;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / this.duration(), 1);

      const value = Math.floor(progress * this.end());

      this.el.nativeElement.textContent = this.format(value) + this.suffix();
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  format(value: number): string {
    if (value >= 1000) {
      return Math.floor(value / 1000) + 'k';
    }
    return value.toString();
  }
}
