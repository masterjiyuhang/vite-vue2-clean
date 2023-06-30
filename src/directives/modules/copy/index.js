import { Message } from 'jctrans-ui';

const copy = {
  bind(el, binding) {
    el.copyData = binding.value;
    el.addEventListener('click', handleClick.bind(el));
  },
  update(el, binding) {
    el.copyData = binding.value;
  },
  unbind(el) {
    el.removeEventListener('click', el.__handleClick__);
  },
};

function handleClick() {
  const text = this.copyData.toLocaleString();

  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log('Text copied to clipboard');
      Message({
        type: 'success',
        message: '复制成功',
      });
    })
    .catch((err) => {
      console.error('Error copying text: ', err);
      Message({
        type: 'error',
        message: '复制失败',
      });
    });
}

export default copy;
