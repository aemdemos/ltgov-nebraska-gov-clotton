import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);

  const paragraphs = document.querySelectorAll('footer p');
  if (paragraphs.length >= 4) {
    // Create a new <div> element
    const newDiv = document.createElement('div');
    newDiv.classList.add('footer-content');

    // Insert the new <div> before the first <p>
    const parent = paragraphs[0].parentNode;
    parent.insertBefore(newDiv, paragraphs[0]);
    paragraphs[3].classList.add('footer-copyright');

    // Move the first two <p> elements into the new <div>
    newDiv.appendChild(paragraphs[0]);
    newDiv.appendChild(paragraphs[1]);
    newDiv.appendChild(paragraphs[2]);
  }
}
