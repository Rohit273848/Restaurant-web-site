/**
 * Rating Stars Renderer Component
 * @param {number} rating Rating score 1 to 5
 * @returns {string} SVG HTML string
 */
export function renderRatingStars(rating = 5) {
  const maxStars = 5;
  let starsHtml = '<div class="flex items-center gap-1 text-brand-gold aria-label="' + rating + ' out of 5 stars">';
  
  for (let i = 1; i <= maxStars; i++) {
    const isFilled = i <= rating;
    starsHtml += `
      <svg class="w-4 h-4 ${isFilled ? 'fill-brand-gold text-brand-gold' : 'fill-transparent text-slate-600'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    `;
  }
  
  starsHtml += '</div>';
  return starsHtml;
}
