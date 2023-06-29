const trackReport = {
  bind(el, binding) {
    el.reportData = binding.value;
    el.addEventListener('click', handleClick.bind(el));
  },
  update(el, binding) {
    el.reportData = binding.value;
  },
  unbind(el) {
    el.removeEventListener('click', el.__handleClick__);
  },
};

function handleClick() {
  const { eventCode, extensions, optionsType } = this.reportData;
  console.log(eventCode, extensions, optionsType);
}

export default trackReport;
