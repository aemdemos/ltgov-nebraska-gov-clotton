export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`ai-index-columns-${cols.length}-cols`);

  // setup image ai-index-columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('ai-index-columns-img-col');
        }
      }
    });
  });

  const links = block.querySelectorAll('.ai-index-columns-container a');
  if (links.length > 0) {
    links.forEach((link) => {
      link.classList.remove('button');
    });
  }
}
