/* Link three Vega views through one public signal. Mouse, tap and keyboard agree. */
'use strict';
window.linkedStates = (() => {
  const views = new Map();
  const control = document.getElementById('state-highlight');
  const status = document.getElementById('state-status');
  let active = '', pinned = '';
  function show(state) {
    active = state;
    control.value = state;
    status.textContent = state ? `Highlighted state: ${control.selectedOptions[0].text}.` : 'All states shown.';
    for (const view of views.values()) view.signal('highlightState', state).runAsync();
  }
  // All interactive marks retain the same state abbreviation after their lookups.
  function stateOf(item) {
    const row = Array.isArray(item?.datum) ? item.datum[0] : item?.datum;
    return row?.short || '';
  }
  control.addEventListener('change', () => show(pinned = control.value));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') show(pinned = '');
  });
  return {
    connect(id, view) {
      if (!['c02', 'c03', 'c04'].includes(id)) return;
      views.set(id, view);
      view.signal('highlightState', active).runAsync();
      view.addEventListener('pointerover', (event, item) => {
        if (event.pointerType !== 'touch' && !pinned) show(stateOf(item));
      });
      view.addEventListener('pointerout', event => {
        if (event.pointerType !== 'touch' && !pinned) show('');
      });
      view.addEventListener('click', (event, item) => {
        const state = stateOf(item);
        const touch = event.pointerType === 'touch' || event.sourceCapabilities?.firesTouchEvents || matchMedia('(hover: none)').matches;
        if (touch) show(pinned = pinned === state ? '' : state);
        else { pinned = ''; show(state); }
      });
    }
  };
})();
