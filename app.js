/* Page composition and responsiveness; charts stay in readable Vega JSON files. */
'use strict';
const charts = {};
const specs = {};
const hostWidths = {};
const pending = {};

function responsiveSpec(original, host) {
  const spec = structuredClone(original);
  const width = Math.max(250, Math.floor(host.getBoundingClientRect().width));
  if (spec.vconcat) {
    delete spec.width;
    for (const child of spec.vconcat) child.width = Math.max(200, width - 70);
  } else {
    spec.width = width;
    if (host.id === 'c08' && width < 500) spec.height = 425;
    if (host.id === 'c04' && width < 500) spec.encoding.x.scale.domain = [-0.65, 1.65];
  }
  return spec;
}

async function render(host, spec) {
  const id = host.id;
  const width = Math.floor(host.getBoundingClientRect().width);
  hostWidths[id] = width;
  if (charts[id]) charts[id].view.finalize();
  host.dataset.state = 'loading';
  try {
    charts[id] = await vegaEmbed(host, responsiveSpec(spec, host), {
      actions: false, renderer: 'svg', tooltip: {theme: 'light'},
      config: {font: 'Source Sans 3'}
    });
    host.dataset.state = 'ready';
  } catch (error) {
    console.error('Chart failed:', id, error);
    host.dataset.state = 'error';
    host.textContent = 'This chart could not load. Please refresh, or use its data and specification links.';
    host.classList.add('chart-error');
  }
}

async function initialise() {
  await document.fonts.ready;
  const hosts = Array.from(document.querySelectorAll('.chart[data-spec]'));
  await Promise.all(hosts.map(async host => {
    const response = await fetch(host.dataset.spec);
    if (!response.ok) throw new Error(`Specification unavailable: ${host.dataset.spec}`);
    specs[host.id] = await response.json();
    await render(host, specs[host.id]);
  }));
  document.documentElement.dataset.charts = hosts.every(h => h.dataset.state === 'ready') ? 'ready' : 'error';
  const observer = new ResizeObserver(entries => {
    for (const entry of entries) {
      const host = entry.target;
      const width = Math.floor(host.getBoundingClientRect().width);
      if (Math.abs(width - hostWidths[host.id]) < 3) continue;
      clearTimeout(pending[host.id]);
      pending[host.id] = setTimeout(() => render(host, specs[host.id]), 180);
    }
  });
  hosts.forEach(host => observer.observe(host));
}

initialise().catch(error => {
  console.error(error);
  document.documentElement.dataset.charts = 'error';
  const note = document.getElementById('load-note');
  note.hidden = false;
  note.textContent = 'Some charts could not load. Refresh this page or follow the source links.';
});
