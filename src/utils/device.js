export function get100Vh() {
  return CSS.supports('height', '100dvh')
    ? '100dvh'
    : window.innerHeight + 'px';
}
