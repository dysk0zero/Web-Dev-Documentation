(function() {
  const toc = document.getElementById('toc');
  const headings = document.querySelectorAll('h2, h3');
  let h2Count = 0;
  let h3Count = 0;

  // --- numbering loop ---
  headings.forEach(heading => {
    if (heading.closest('#toc') || heading.hasAttribute('data-no-toc')) return;

    if (heading.tagName.toLowerCase() === 'h2') {
      h2Count++;
      if (h2Count <= 2) return; // completely skip first two H2s

      h3Count = 0;
      h4Count = 0;
      heading.dataset.tocNumber = h2Count - 2; // renumber starting at 1
    } else if (heading.tagName.toLowerCase() === 'h3') {
      if (h2Count <= 2) return; // skip any h3 before the 3rd h2
      h3Count++;
      h4Count = 0;
      heading.dataset.tocNumber = `${h2Count - 2}.${h3Count}`;
    }
  });

  // --- TOC building loop ---
  headings.forEach(heading => {
    if (heading.closest('#toc') || heading.hasAttribute('data-no-toc')) return;
    if (!heading.dataset.tocNumber) return; // skip those without numbering

    if (!heading.id) {
      heading.id = heading.textContent.trim().toLowerCase().replace(/\s+/g, '-');
    }

    heading.textContent = `${heading.dataset.tocNumber} ${heading.textContent}`;

    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = `${heading.dataset.tocNumber} ${heading.textContent.replace(/^\d+(\.\d+)?(\.\d+)?\s+/, '')}`;

    if (heading.tagName.toLowerCase() === 'h3') {
      link.classList.add('toc-h3');
    }

    toc.appendChild(link);
  });
})();
