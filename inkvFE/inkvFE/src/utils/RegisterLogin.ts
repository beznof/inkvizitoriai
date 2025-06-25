
const triggerAnimation = (element: HTMLElement, className: string) => {
  if(!element) return;

  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
}

export { triggerAnimation };