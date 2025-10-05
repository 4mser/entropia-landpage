import { useEffect } from 'react';
import gsap from 'gsap';

interface EventListenerObject {
  card: HTMLDivElement;
  handleMouseMove: (e: MouseEvent) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

const use3DEffect = (cards: HTMLDivElement[]) => {
  useEffect(() => {
    const eventListeners: EventListenerObject[] = [];

    cards.forEach((card) => {
      if (card) {
        const handleMouseMove = (e: MouseEvent) => {
          const cardRect = card.getBoundingClientRect();
          const cardWidth = cardRect.width;
          const cardHeight = cardRect.height;
          const cardCenterX = cardRect.left + cardWidth / 2;
          const cardCenterY = cardRect.top + cardHeight / 2;

          const mouseX = e.clientX - cardCenterX;
          const mouseY = e.clientY - cardCenterY;

          const rotateX = (mouseY / cardHeight) * -15;
          const rotateY = (mouseX / cardWidth) * 15;

          gsap.set(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 500,
            transformOrigin: 'center',
          });
        };

        const handleMouseEnter = () => {
          gsap.to(card, {
            ease: 'linear',
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            ease: 'linear',
          });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        eventListeners.push({
          card,
          handleMouseMove,
          handleMouseEnter,
          handleMouseLeave,
        });
      }
    });

    return () => {
      eventListeners.forEach(
        ({ card, handleMouseMove, handleMouseEnter, handleMouseLeave }) => {
          card.removeEventListener('mousemove', handleMouseMove);
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        }
      );
    };
  }, [cards]);
};

export default use3DEffect;