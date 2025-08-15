(function() {
  const toc = document.getElementById('toc');
  const headings = document.querySelectorAll('h2, h3, h4');
  let h2Count = 0;
  let h3Count = 0;
  let h4Count = 0;

  headings.forEach(heading => {
    if (heading.closest('#toc') || heading.hasAttribute('data-no-toc')) return;

    if (heading.tagName.toLowerCase() === 'h2') {
      h2Count++;
      h3Count = 0;
      h4Count = 0;
      heading.dataset.tocNumber = h2Count;
    } else if (heading.tagName.toLowerCase() === 'h3') {
      h3Count++;
      h4Count = 0;
      heading.dataset.tocNumber = `${h2Count}.${h3Count}`;
    } else if (heading.tagName.toLowerCase() === 'h4') {
      h4Count++;
      heading.dataset.tocNumber = `${h2Count}.${h3Count}.${h4Count}`;
    }
  });

  headings.forEach(heading => {
    if (heading.closest('#toc') || heading.hasAttribute('data-no-toc')) return;

    if (!heading.id) {
      heading.id = heading.textContent.trim().toLowerCase().replace(/\s+/g, '-');
    }

    heading.textContent = `${heading.dataset.tocNumber} ${heading.textContent}`;

    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = `${heading.dataset.tocNumber} ${heading.textContent.replace(/^\d+(\.\d+)?(\.\d+)?\s+/, '')}`;

    if (heading.tagName.toLowerCase() === 'h3') {
      link.classList.add('toc-h3');
    } else if (heading.tagName.toLowerCase() === 'h4') {
      link.classList.add('toc-h4');
    }

    toc.appendChild(link);
  });
})();
