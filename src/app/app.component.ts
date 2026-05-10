import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NgFor } from '@angular/common';

/** Edit these values — they power the whole landing page. */
const AGENCY = {
  name: 'Via Nicolas',
  tagline: 'Where your next chapter begins',
  region: 'Lebanon',
  addressLine: 'Akkar Halba — Via Nicolas',
  mapUrl:
    'https://www.google.com/maps/place/34%C2%B032\'26.8%22N+36%C2%B004\'38.8%22E/@34.5406513,36.077375,19.75z/data=!4m4!3m3!8m2!3d34.5407829!4d36.077446?hl=en&entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D',
  /** Shown to visitors — replace with your real number */
  phoneDisplay: '+961 3359636',
  /** Digits with country code for tel: — no spaces */
  phoneTel: '+96100000000',
  email: 'info@vianicolas.com',
  /** WhatsApp international format without + — replace digits */
  whatsappDigits: '96100000000',
  instagramUrl: 'https://www.instagram.com/rony.nicolas3/',
  facebookUrl: 'https://facebook.com/rony.nicolas3/',
  opening: {
    weekday: 'Friday',
    dateLong: 'June 6, 2026',
    timeLocal: '7:00 PM',
    timezoneNote: 'Lebanon time',
  },
  services: [
    {
      title: 'Flights & ticketing',
      desc: 'Competitive fares and flexible routing worldwide, with support before and during your trip.',
      icon: '✈',
    },
    {
      title: 'Packages & tours',
      desc: 'Curated getaways—culture, beach, adventure—planned so you enjoy more and worry less.',
      icon: '🗺',
    },
    {
      title: 'Visas & paperwork',
      desc: 'Guidance on requirements, timelines, and documents so borders feel less daunting.',
      icon: '📋',
    },
    {
      title: 'Corporate travel',
      desc: 'Reliable bookings for teams and events; one point of contact for policies and changes.',
      icon: '🤝',
    },
  ],
} as const;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  readonly agency = AGENCY;

  /** Grand opening: June 6, 2026 at 6:00 PM Asia/Beirut */
  launchDate = new Date('2026-06-06T19:00:00+03:00');
  timeLeft: Record<'days' | 'hours' | 'minutes' | 'seconds', number> = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  private intervalId: ReturnType<typeof setInterval> | undefined;

  constructor(private ngZone: NgZone) {}

  get whatsappUrl(): string {
    const n = this.agency.whatsappDigits.replace(/\D/g, '');
    return n ? `https://wa.me/${n}` : '#contact';
  }

  ngOnInit(): void {
    this.updateCountdown();
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.ngZone.run(() => this.updateCountdown());
      }, 1000);
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateCountdown(): void {
    const distance = this.launchDate.getTime() - Date.now();
    if (distance > 0) {
      this.timeLeft = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    } else {
      this.timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }
}
